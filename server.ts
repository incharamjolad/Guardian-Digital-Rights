import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

// --- INITIALIZE EXPRESS ---
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
const MONGODB_URI = process.env.MONGODB_URI;
let dbConnected = false;

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  })
    .then(() => {
      console.log('MongoDB connected');
      dbConnected = true;
    })
    .catch(err => {
      console.error('MongoDB connection error:', err.message);
      dbConnected = false;
    });
} else {
  console.warn('⚠️ MONGODB_URI not found in environment variables. Database endpoints will return 503.');
}

// --- MONGOOSE SCHEMAS & MODELS ---
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

const reportSchema = new mongoose.Schema({
  caseId: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  platform: { type: String, required: true },
  evidenceFile: { type: String },
  isAnonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // optional if anonymous
});

// Avoid "OverwriteModelError" if recompiling
const User = mongoose.models.User || mongoose.model('User', userSchema);
const Report = mongoose.models.Report || mongoose.model('Report', reportSchema);

// --- MULTER SETUP FOR FILE UPLOADS ---
const uploadDir = path.join('/tmp', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });
app.use('/uploads', express.static(uploadDir));

// --- MIDDLEWARES ---
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

const authenticate = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized. Token missing.' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

const requireAdmin = (req: any, res: any, next: any) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden. Admin access required.' });
  }
  next();
};

const checkDb = (req: any, res: any, next: any) => {
  if (!dbConnected) {
    return res.status(503).json({ error: 'Database not connected. Please set MONGODB_URI and restart the server.' });
  }
  next();
};

// --- ROUTES ---

// In-memory posts for the Community Forum (to work even without DB)
const forumPosts = [
  { id: 1, author: "Aarav S.", text: "Received a fake legal notice claiming copyright. Applied AI Shield, proved it was forged!", upvotes: 42 },
  { id: 2, author: "Priya K.", text: "Instagram account hacked. Used the legal template to send a formal request. It worked!", upvotes: 28 }
];

app.get('/api/community', (req, res) => {
  res.json(forumPosts);
});

// AUTH ROUTES
app.post('/api/auth/register', checkDb, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role: role || 'user' });
    await newUser.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', checkDb, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, role: user.role, name: user.name, email: user.email });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/reset-password', checkDb, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    console.log(`Sending password reset link to ${email}`);
    res.json({ message: 'Password reset link sent' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/users/me', checkDb, authenticate, async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users', checkDb, authenticate, requireAdmin, async (req: any, res: any) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// REPORT ROUTES
app.post('/api/report', checkDb, upload.single('evidence'), async (req: any, res: any) => {
  try {
    const { type, description, platform, isAnonymous } = req.body;
    let userId = null;
    
    // Attempt to extract userId from token if provided, but don't strictly enforce if anonymous
    const authHeader = req.headers.authorization;
    if (authHeader && isAnonymous !== 'true') {
      try {
        const decoded: any = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
        userId = decoded.id;
      } catch (e) { /* user might be unauthenticated */ }
    }

    const caseId = 'GRD-' + Math.random().toString(36).substr(2, 5).toUpperCase();

    const report = new Report({
      caseId,
      type,
      description,
      platform,
      isAnonymous: isAnonymous === 'true',
      evidenceFile: req.file ? `/uploads/${req.file.filename}` : null,
      userId
    });

    await report.save();
    res.status(201).json({ message: 'Report submitted successfully', caseId });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/reports', checkDb, authenticate, requireAdmin, async (req: any, res: any) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// AI SHIELD MOCK ENDPOINTS
app.post('/api/ai/deepfake', upload.single('file'), (req: any, res: any) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  
  // Basic heuristic mock logic
  const ext = path.extname(req.file.originalname).toLowerCase();
  let status = 'inconclusive';
  let confidence = Math.floor(Math.random() * 40) + 10;

  if (['.jpg', '.jpeg', '.png', '.mp4'].includes(ext)) {
    // Fake deepfake logic
    const random = Math.random();
    if (random > 0.6) {
      status = 'detected';
      confidence = Math.floor(Math.random() * 20) + 80; // 80-100%
    } else {
      status = 'safe';
      confidence = Math.floor(Math.random() * 20) + 80;
    }
  }

  // Cleanup uploaded file after check
  fs.unlink(req.file.path, () => {});

  res.json({
    result: status,
    confidence: `${confidence}%`,
    message: status === 'detected' ? 'Warning: High probability of manipulation found in metadata.' : 'No clear signs of manipulation detected.'
  });
});

app.post('/api/ai/analyze-comment', (req: any, res: any) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  const hateKeywords = ['kill', 'die', 'murder', 'hate you'];
  const toxicKeywords = ['stupid', 'idiot', 'ugly', 'dumb'];

  const lowerText = text.toLowerCase();
  let category = 'Safe';
  let message = 'Comment appears normal.';

  if (hateKeywords.some(k => lowerText.includes(k))) {
    category = 'Hate speech (danger)';
    message = 'Contains severe threats or hate speech. Proceed with legal action or block.';
  } else if (toxicKeywords.some(k => lowerText.includes(k))) {
    category = 'Toxic (warning)';
    message = 'Contains inflammatory language. Consider moderation.';
  }

  res.json({ category, message });
});

app.post('/api/ai/generate-letter', (req: any, res: any) => {
  const { name, platform, issue } = req.body;
  if (!name || !platform || !issue) return res.status(400).json({ error: 'Missing requested fields' });

  const letterText = `[LEGAL COMPLAINT DRAFT]

TO: Legal Department, ${platform}
FROM: ${name}
DATE: ${new Date().toLocaleDateString()}

SUBJECT: IMMEDIATE ACTION REQUIRED - VIOLATION OF DIGITAL RIGHTS

To Whom It May Concern,

I am writing to formally report an issue regarding my digital rights on your platform.
Nature of issue: ${issue}

I expect swift remediation to ensure full compliance with the Information Technology Act. If this issue is not resolved within the legally mandated time frame, I reserve the right to escalate this to the grievance appellate committee or take legal action.

Sincerely,
${name}
`;

  res.json({ content: letterText });
});

// --- CLIENT SERVER LOGIC (Vite Middleware) ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
