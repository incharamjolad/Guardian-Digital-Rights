import React, { useEffect, useRef, useState } from 'react';

export default function Trust() {
  const barsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (barsRef.current) {
      observer.observe(barsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="trust" className="bg-brand-bg2 py-24 border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="mb-16 text-center fade-up">
           <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-text mb-6">Trust & Transparency</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            
            {/* Privacy Score */}
            <div className="bg-brand-bg3 border border-brand-border rounded-2xl p-8 fade-up">
               <h3 className="font-display font-bold text-2xl text-brand-text mb-4">Privacy Score</h3>
               <p className="font-sans text-brand-muted mb-8 text-sm leading-relaxed">We don't sell your data, we don't track your behavior, and we don't serve ads. Our entire platform is built on a zero-knowledge architecture where your sensitive reports are encrypted locally before ever touching our servers.</p>
               
               <div ref={barsRef} className="space-y-6 mb-10">
                 <div>
                   <div className="flex justify-between text-sm font-sans font-bold text-brand-text mb-2">
                     <span>Data Encryption</span>
                     <span>98%</span>
                   </div>
                   <div className="h-2 bg-brand-bg rounded-full overflow-hidden">
                     <div className="h-full bg-brand-accent2 transition-all duration-[1500ms] ease-out" style={{ width: isVisible ? '98%' : '0%' }} />
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm font-sans font-bold text-brand-text mb-2">
                     <span>No Ad Tracking</span>
                     <span>100%</span>
                   </div>
                   <div className="h-2 bg-brand-bg rounded-full overflow-hidden">
                     <div className="h-full bg-brand-accent transition-all duration-[1500ms] ease-out" style={{ width: isVisible ? '100%' : '0%' }} />
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm font-sans font-bold text-brand-text mb-2">
                     <span>Open Source</span>
                     <span>75%</span>
                   </div>
                   <div className="h-2 bg-brand-bg rounded-full overflow-hidden">
                     <div className="h-full bg-brand-accent4 transition-all duration-[1500ms] ease-out" style={{ width: isVisible ? '75%' : '0%' }} />
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm font-sans font-bold text-brand-text mb-2">
                     <span>Government Independence</span>
                     <span>90%</span>
                   </div>
                   <div className="h-2 bg-brand-bg rounded-full overflow-hidden">
                     <div className="h-full bg-brand-accent3 transition-all duration-[1500ms] ease-out" style={{ width: isVisible ? '90%' : '0%' }} />
                   </div>
                 </div>
               </div>

               <div>
                 <h4 className="font-sans font-bold text-brand-text mb-4">Our Pledge</h4>
                 <div className="grid grid-cols-2 gap-4">
                   {['No data sold', 'Anonymous reporting', 'End-to-end encryption', 'Open source roadmap', 'Independent audits', 'Free forever tier'].map((item, i) => (
                     <div key={i} className="flex items-center gap-2">
                       <span className="text-brand-accent2">✓</span>
                       <span className="font-sans text-brand-muted text-sm">{item}</span>
                     </div>
                   ))}
                 </div>
               </div>
            </div>

            {/* Success Wall */}
            <div className="bg-brand-bg border border-brand-border rounded-2xl p-8 fade-up">
               <h3 className="font-display font-bold text-2xl text-brand-text mb-8">Success Stories</h3>
               
               <div className="space-y-6">
                 <div className="flex gap-4 items-start">
                   <div className="w-10 h-10 bg-brand-accent2/10 rounded-lg flex items-center justify-center shrink-0">
                     <span className="text-xl">🏆</span>
                   </div>
                   <div>
                     <h4 className="font-sans font-bold text-brand-text">Content takedown in 48h</h4>
                     <p className="font-sans text-brand-muted text-sm my-1">Instagram removed 12 images after Guardian-generated DMCA notice.</p>
                     <span className="text-xs text-brand-muted/70 font-sans">2 hours ago</span>
                   </div>
                 </div>

                 <div className="flex gap-4 items-start">
                   <div className="w-10 h-10 bg-brand-accent/10 rounded-lg flex items-center justify-center shrink-0">
                     <span className="text-xl">⚖️</span>
                   </div>
                   <div>
                     <h4 className="font-sans font-bold text-brand-text">Cybercrime FIR filed</h4>
                     <p className="font-sans text-brand-muted text-sm my-1">First-time user filed FIR for online harassment using pre-filled form.</p>
                     <span className="text-xs text-brand-muted/70 font-sans">Yesterday</span>
                   </div>
                 </div>

                 <div className="flex gap-4 items-start">
                   <div className="w-10 h-10 bg-brand-accent4/10 rounded-lg flex items-center justify-center shrink-0">
                     <span className="text-xl">🛡️</span>
                   </div>
                   <div>
                     <h4 className="font-sans font-bold text-brand-text">Deepfake removed</h4>
                     <p className="font-sans text-brand-muted text-sm my-1">AI detected manipulated video; within 72h YouTube removed it.</p>
                     <span className="text-xs text-brand-muted/70 font-sans">3 days ago</span>
                   </div>
                 </div>
               </div>
            </div>
         </div>

         {/* Badges row */}
         <div className="flex flex-wrap items-center justify-center gap-4 fade-up">
           <div className="bg-brand-bg3 border border-brand-border px-4 py-2 rounded-full flex items-center gap-2">
             <span>🔒</span> <span className="font-sans text-sm font-bold text-brand-text">Privacy Pro</span>
           </div>
           <div className="bg-brand-bg3 border border-brand-border px-4 py-2 rounded-full flex items-center gap-2">
             <span>⚡</span> <span className="font-sans text-sm font-bold text-brand-text">First Report</span>
           </div>
           <div className="bg-brand-bg3 border border-brand-border px-4 py-2 rounded-full flex items-center gap-2">
             <span>🌍</span> <span className="font-sans text-sm font-bold text-brand-text">Multilingual</span>
           </div>
           <div className="bg-brand-bg3 border border-brand-border px-4 py-2 rounded-full flex items-center gap-2">
             <span>🏛️</span> <span className="font-sans text-sm font-bold text-brand-text">Legal Eagle</span>
           </div>
           <div className="bg-brand-bg3 border border-brand-border px-4 py-2 rounded-full flex items-center gap-2">
             <span>🤝</span> <span className="font-sans text-sm font-bold text-brand-text">Community Hero</span>
           </div>
         </div>

      </div>
    </section>
  );
}
