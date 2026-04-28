import React, { useState } from 'react';

export default function Report() {
  const [isAnon, setIsAnon] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle');
  const [type, setType] = useState('');
  const [desc, setDesc] = useState('');

  const [platform, setPlatform] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !desc) return;
    
    // Save to localStorage
    const reports = JSON.parse(localStorage.getItem('userReports') || '[]');
    reports.push({
      title: type,
      description: desc.substring(0, 100) + (desc.length > 100 ? '...' : ''),
    });
    localStorage.setItem('userReports', JSON.stringify(reports));

    setStatus('submitted');
  };

  return (
    <section id="report" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-16 text-center fade-up">
         <span className="text-brand-accent3 font-sans font-bold uppercase tracking-wider text-sm mb-4 block">Take Action</span>
         <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-text mb-6">Report a Violation</h2>
         <p className="font-sans text-brand-muted text-lg max-w-2xl mx-auto">File a secure complaint. We track widespread abuse and provide legal pathways.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 fade-up">
        
        {/* Form Panel */}
        <div className="bg-brand-bg2 border border-brand-border rounded-[20px] p-8">
           <h3 className="font-display font-bold text-2xl text-brand-text mb-2">File a Digital Rights Complaint</h3>
           <p className="font-sans text-brand-muted text-sm mb-8">Your data belongs to you. Let's protect it.</p>
           
           {status === 'submitted' ? (
             <div className="border border-brand-accent2 bg-brand-accent2/10 p-6 rounded-xl text-center">
               <span className="text-brand-accent2 text-2xl mb-4 block">✓</span>
               <h4 className="font-sans font-bold text-brand-text text-lg mb-2">Report Submitted Successfully</h4>
               <p className="font-mono text-brand-muted text-sm mb-2">Case ID: GRD-{Math.floor(10000 + Math.random() * 90000)}</p>
               <p className="font-sans text-brand-muted text-sm">Expected response within 48 hours.</p>
             </div>
           ) : (
             <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-brand-bg3 border border-brand-border rounded-xl">
                  <span className="font-sans text-brand-text text-sm">Submit Anonymously</span>
                  <button 
                    type="button" 
                    onClick={() => setIsAnon(!isAnon)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${isAnon ? 'bg-brand-accent' : 'bg-brand-muted/30'}`}
                  >
                    <span className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform ${isAnon ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>

                <div>
                  <select 
                    value={type} onChange={e => setType(e.target.value)} required
                    className="w-full bg-brand-bg3 border border-brand-border rounded-xl px-4 py-3 text-brand-text font-sans focus:outline-none focus:border-brand-accent transition-colors appearance-none"
                  >
                    <option value="">-- Select Violation Type --</option>
                    <option value="Non-consensual Image Sharing">Non-consensual Image Sharing</option>
                    <option value="Online Harassment">Online Harassment</option>
                    <option value="Deepfake/AI Manipulation">Deepfake/AI Manipulation</option>
                    <option value="Data Breach">Data Breach</option>
                    <option value="Copyright Infringement">Copyright Infringement</option>
                    <option value="Cyberstalking">Cyberstalking</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <input 
                    type="text" 
                    placeholder="Where did it happen? (Platform/URL)"
                    className="w-full bg-brand-bg3 border border-brand-border rounded-xl px-4 py-3 text-brand-text font-sans focus:outline-none focus:border-brand-accent transition-colors"
                  />
                </div>

                <div>
                  <textarea 
                    value={desc} onChange={e => setDesc(e.target.value)} required
                    placeholder="Describe what happened"
                    className="w-full bg-brand-bg3 border border-brand-border rounded-xl px-4 py-3 text-brand-text font-sans focus:outline-none focus:border-brand-accent transition-colors min-h-[90px] resize-none"
                  />
                </div>

                <div>
                  <p className="font-sans text-brand-muted text-sm mb-2">Attach Evidence (optional)</p>
                  <input type="file" className="text-brand-muted font-sans text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-accent/10 file:text-brand-accent hover:file:bg-brand-accent/20 cursor-pointer" />
                </div>

                <button type="submit" className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-sans font-bold py-3.5 rounded-xl transition-colors">
                  Submit Report
                </button>
             </form>
           )}
        </div>

        {/* Heatmap Panel */}
        <div className="bg-transparent flex flex-col justify-center">
           <div className="mb-6">
             <h3 className="font-display font-bold text-2xl text-brand-text mb-2">Violation Heatmap</h3>
             <p className="font-sans text-brand-muted text-sm">Tracking digital rights abuse patterns across major Indian cities.</p>
           </div>
           
           <div className="relative w-full aspect-square max-w-[400px] mx-auto bg-brand-bg2 border border-brand-border rounded-2xl flex items-center justify-center p-8 mb-8 overflow-hidden">
             {/* Map Placeholder, standard Indian map silhoutte representation */}
             <svg viewBox="0 0 100 100" className="w-full h-full text-brand-border2 opacity-30" fill="currentColor">
                <path d="M45,10 C48,5 55,5 55,10 C55,15 65,20 65,30 C65,40 75,50 70,60 C65,70 55,80 50,90 C45,80 35,70 30,60 C25,50 35,40 35,30 C35,20 45,15 45,10 Z" />
             </svg>
             {/* Hotspots */}
             <div className="absolute top-[25%] left-[45%] w-4 h-4 bg-brand-accent3 rounded-full blur-[4px] animate-pulse" /> {/* Delhi */}
             <div className="absolute top-[50%] left-[35%] w-3 h-3 bg-brand-accent4 rounded-full blur-[3px]" /> {/* Mumbai */}
             <div className="absolute top-[65%] left-[45%] w-3 h-3 bg-brand-accent rounded-full blur-[3px]" /> {/* Bangalore */}
           </div>

           <div>
             <div className="flex gap-4 mb-4 text-xs font-sans text-brand-muted">
               <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-accent3" /> High</span>
               <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-accent4" /> Medium</span>
               <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-accent2" /> Low</span>
             </div>
             <div className="grid grid-cols-2 gap-y-3 font-sans text-sm">
               <div className="flex justify-between pr-4"><span className="font-bold text-brand-text">Delhi</span> <span className="text-brand-accent3">2,847</span></div>
               <div className="flex justify-between pl-4"><span className="font-bold text-brand-text">Mumbai</span> <span className="text-brand-accent4">1,923</span></div>
               <div className="flex justify-between pr-4"><span className="font-bold text-brand-text">Bangalore</span> <span className="text-brand-accent">1,456</span></div>
               <div className="flex justify-between pl-4"><span className="font-bold text-brand-text">Hyderabad</span> <span className="text-brand-accent2">987</span></div>
               <div className="flex justify-between pr-4"><span className="font-bold text-brand-text">Chennai</span> <span className="text-brand-accent2">743</span></div>
               <div className="flex justify-between pl-4"><span className="font-bold text-brand-text">Kolkata</span> <span className="text-brand-accent2">621</span></div>
             </div>
           </div>
        </div>

      </div>
    </section>
  );
}
