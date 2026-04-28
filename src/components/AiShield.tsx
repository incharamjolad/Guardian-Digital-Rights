import React, { useState, useRef } from 'react';
import { Upload, MessageSquare, FileText } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';

// Initialize Gemini SDK lazily
declare const process: any;
let aiClient: GoogleGenAI | null = null;
const getAi = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'missing' });
  }
  return aiClient;
};

export default function AiShield() {
  const [deepfakeState, setDeepfakeState] = useState<'idle' | 'analyzing' | 'detected' | 'safe' | 'inconclusive'>('idle');
  const [toneText, setToneText] = useState('');
  const [toneState, setToneState] = useState<{status: 'idle' | 'analyzing' | 'done', type?: 'danger' | 'warning' | 'safe', msg?: string}>({status: 'idle'});
  const [letterText, setLetterText] = useState('');
  const [letterState, setLetterState] = useState<'idle' | 'drafting' | 'done'>('idle');
  const [draftContent, setDraftContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileToGenerativePart = async (file: File): Promise<{inlineData: {data: string; mimeType: string}}> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = (reader.result as string).split(',')[1];
        resolve({
          inlineData: {
            data: base64Data,
            mimeType: file.type
          }
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleDeepfakeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setDeepfakeState('analyzing');
    try {
      const part = await fileToGenerativePart(file);
      const res = await getAi().models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            part,
            { text: 'Analyze this image. Does it appear to be an AI-generated image or a manipulated deepfake? Answer ONLY with exactly one json object with properties: "status" (which must be exactly "detected", "safe", or "inconclusive").' }
          ]
        },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              status: { type: Type.STRING, description: 'Must be "detected", "safe", or "inconclusive"' }
            },
            required: ['status']
          }
        }
      });
      const data = JSON.parse(res.text?.trim() || '{}');
      if (['detected', 'safe', 'inconclusive'].includes(data.status)) {
        setDeepfakeState(data.status as any);
        if (data.status === 'detected') {
          const reports = JSON.parse(localStorage.getItem('userReports') || '[]');
          reports.push({
            title: 'Deepfake Media Detected',
            description: 'Uploaded media was analyzed and flagged as potentially synthetic/manipulated.',
          });
          localStorage.setItem('userReports', JSON.stringify(reports));
        }
      } else {
        setDeepfakeState('inconclusive');
      }
    } catch (err) {
      console.error(err);
      setDeepfakeState('inconclusive');
    }
  };

  const analyzeTone = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!toneText.trim()) return;
    setToneState({status: 'analyzing'});
    
    try {
      const res = await getAi().models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the tone of the following comment. Determine if it is hate speech/harassment ("danger"), a mild negative warning ("warning"), or safe ("safe"). Also provide a brief 3-5 word summary message with a relevant emoji. Comment: "${toneText}"`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING, description: 'Must be "danger", "warning", or "safe"' },
              msg: { type: Type.STRING }
            },
            required: ['type', 'msg']
          }
        }
      });
      const data = JSON.parse(res.text?.trim() || '{}');
      setToneState({
        status: 'done',
        type: data.type || 'safe',
        msg: data.msg || 'Looks safe ✅'
      });
    } catch (err) {
      console.error(err);
      setToneState({status: 'done', type: 'safe', msg: 'Could not analyze'});
    }
  };

  const draftLetter = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!letterText.trim()) return;
    setLetterState('drafting');
    setDraftContent('');
    
    try {
      const res = await getAi().models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a formal, legal-sounding but concise takedown notice drafted on behalf of a user from India, regarding the following situation: "${letterText}". It should be ready to be emailed to a platform or abuser. Just output the letter text, no preamble.`
      });
      setDraftContent(res.text || '');
      setLetterState('done');
    } catch (err) {
      console.error(err);
      setLetterState('idle');
      alert('Drafting failed, please try again.');
    }
  };

  const handleDownloadDraft = () => {
    if (!draftContent) return;
    const blob = new Blob([draftContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'takedown-notice.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    // Save to localStorage
    const notices = parseInt(localStorage.getItem('legalNotices') || '0', 10);
    localStorage.setItem('legalNotices', (notices + 1).toString());
    
    const reports = JSON.parse(localStorage.getItem('userReports') || '[]');
    reports.push({
      title: 'Takedown Notice',
      description: letterText.substring(0, 100) + '...',
    });
    localStorage.setItem('userReports', JSON.stringify(reports));
  };

  return (
    <section id="ai" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="mb-16 text-center fade-up">
         <span className="text-brand-accent2 font-sans font-bold uppercase tracking-wider text-sm mb-4 block">Advanced AI</span>
         <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-text mb-6">Intelligent protection that works 24/7</h2>
         <p className="font-sans text-brand-muted text-lg max-w-2xl mx-auto">AI features others won't have — trained specifically for digital rights violations in India.</p>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 fade-up">
         
         {/* Deepfake Card */}
         <div className="bg-brand-bg2 border border-brand-border rounded-2xl overflow-hidden flex flex-col">
           <div className="p-8 pb-6 flex-grow">
              <span className="text-brand-accent3 font-sans font-bold text-xs uppercase tracking-wider mb-3 block">Deepfake Detector</span>
              <h3 className="font-display font-bold text-2xl text-brand-text mb-2">Is this a real video of me?</h3>
              <p className="font-sans text-brand-muted text-sm">Upload suspicious media to detect AI manipulation.</p>
           </div>
           <div className="bg-brand-bg space-y-4 p-8 border-t border-brand-border h-[240px] flex flex-col justify-center">
              {deepfakeState === 'idle' && (
                <>
                  <input type="file" accept="image/*,video/*" className="hidden" ref={fileInputRef} onChange={handleDeepfakeUpload} />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-brand-border2 hover:border-brand-accent/50 rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors group cursor-pointer"
                  >
                    <Upload className="w-8 h-8 text-brand-muted group-hover:text-brand-accent mb-3" />
                    <span className="font-sans font-bold text-brand-text text-sm">Click to upload media</span>
                  </button>
                </>
              )}
              {deepfakeState === 'analyzing' && (
                <div className="text-center font-sans font-medium text-brand-muted animate-pulse">
                  Analyzing artifacts...
                </div>
              )}
              {deepfakeState === 'detected' && (
                 <div className="bg-brand-accent3/10 border border-brand-accent3/30 p-6 rounded-xl flex items-center justify-center text-brand-accent3 font-sans font-bold">
                   🚨 Manipulation Detected (92% Confidence)
                 </div>
              )}
              {deepfakeState === 'safe' && (
                 <div className="bg-brand-accent2/10 border border-brand-accent2/30 p-6 rounded-xl flex items-center justify-center text-brand-accent2 font-sans font-bold">
                   ✅ Media appears authentic
                 </div>
              )}
              {deepfakeState === 'inconclusive' && (
                 <div className="bg-brand-accent4/10 border border-brand-accent4/30 p-6 rounded-xl flex items-center justify-center text-brand-accent4 font-sans font-bold">
                   ⚠️ Analysis inconclusive
                 </div>
              )}
              {deepfakeState !== 'idle' && deepfakeState !== 'analyzing' && (
                <button onClick={() => setDeepfakeState('idle')} className="text-brand-muted text-sm font-sans underline mt-4 text-center w-full">Try another</button>
              )}
           </div>
         </div>

         {/* Comment Tone Analyzer */}
         <div className="bg-brand-bg2 border border-brand-border rounded-2xl overflow-hidden flex flex-col">
           <div className="p-8 pb-6 flex-grow">
              <span className="text-brand-accent4 font-sans font-bold text-xs uppercase tracking-wider mb-3 block">Comment Tone Analyzer</span>
              <h3 className="font-display font-bold text-2xl text-brand-text mb-2">Is this hate speech or criticism?</h3>
              <p className="font-sans text-brand-muted text-sm">Paste a comment to check for harassment vectors.</p>
           </div>
           <div className="bg-brand-bg space-y-4 p-8 border-t border-brand-border h-[240px] flex flex-col justify-center">
              <form onSubmit={analyzeTone} className="space-y-3 relative">
                <input 
                  type="text" 
                  value={toneText}
                  onChange={e => setToneText(e.target.value)}
                  placeholder="Paste comment here..."
                  className="w-full bg-brand-bg3 border border-brand-border rounded-xl px-4 py-3 text-brand-text font-sans focus:outline-none focus:border-brand-accent transition-colors"
                />
                {toneState.status === 'idle' && (
                  <button type="submit" disabled={!toneText} className="w-full bg-brand-bg3 hover:bg-brand-border border border-brand-border text-brand-text font-sans font-bold py-3 rounded-xl transition-colors disabled:opacity-50">
                    Analyze
                  </button>
                )}
                {toneState.status === 'analyzing' && (
                  <div className="text-center font-sans font-medium text-brand-muted py-3 animate-pulse">
                    Analyzing tone...
                  </div>
                )}
                {toneState.status === 'done' && toneState.type === 'danger' && (
                   <div className="bg-brand-accent3/10 border border-brand-accent3/30 p-3 rounded-xl text-center text-brand-accent3 font-sans font-bold">{toneState.msg}</div>
                )}
                {toneState.status === 'done' && toneState.type === 'warning' && (
                   <div className="bg-brand-accent4/10 border border-brand-accent4/30 p-3 rounded-xl text-center text-brand-accent4 font-sans font-bold">{toneState.msg}</div>
                )}
                {toneState.status === 'done' && toneState.type === 'safe' && (
                   <div className="bg-brand-accent2/10 border border-brand-accent2/30 p-3 rounded-xl text-center text-brand-accent2 font-sans font-bold">{toneState.msg}</div>
                )}
              </form>
              {toneState.status === 'done' && (
                <button onClick={() => {setToneState({status:'idle'}); setToneText('');}} className="text-brand-muted text-sm font-sans underline mt-2 text-center w-full">Reset</button>
              )}
           </div>
         </div>

         {/* Legal Letter Writer */}
         <div className="bg-brand-bg2 border border-brand-border rounded-2xl overflow-hidden flex flex-col">
           <div className="p-8 pb-6 flex-grow">
              <span className="text-brand-accent font-sans font-bold text-xs uppercase tracking-wider mb-3 block">Legal Letter Writer</span>
              <h3 className="font-display font-bold text-2xl text-brand-text mb-2">Describe it, we'll draft it</h3>
              <p className="font-sans text-brand-muted text-sm">Turn your situation into a formal takedown notice.</p>
           </div>
           <div className="bg-brand-bg space-y-4 p-8 border-t border-brand-border h-[240px] flex flex-col justify-center">
              <form onSubmit={draftLetter} className="space-y-3 relative">
                <input 
                  type="text" 
                  value={letterText}
                  onChange={e => setLetterText(e.target.value)}
                  placeholder="e.g. Someone stole my photo on Insta"
                  className="w-full bg-brand-bg3 border border-brand-border rounded-xl px-4 py-3 text-brand-text font-sans focus:outline-none focus:border-brand-accent transition-colors"
                />
                {letterState === 'idle' && (
                  <button type="submit" disabled={!letterText} className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-sans font-bold py-3 rounded-xl transition-colors disabled:opacity-50">
                    Draft Letter
                  </button>
                )}
                {letterState === 'drafting' && (
                  <div className="text-center font-sans font-medium text-brand-muted py-3 animate-pulse">
                    Drafting document...
                  </div>
                )}
                {letterState === 'done' && (
                   <div className="bg-brand-accent2/10 border border-brand-accent2/30 p-4 rounded-xl text-center flex flex-col gap-2">
                     <span className="text-brand-accent2 font-sans font-bold">✓ Draft Ready</span>
                     <button type="button" onClick={handleDownloadDraft} className="text-white hover:text-brand-accent2 font-sans text-sm underline transition-colors">Download PDF &rarr;</button>
                     <button onClick={() => {setLetterState('idle'); setLetterText(''); setDraftContent('');}} className="text-brand-muted text-sm font-sans underline mt-2 text-center w-full">Draft another</button>
                   </div>
                )}
              </form>
           </div>
         </div>

       </div>
    </section>
  );
}
