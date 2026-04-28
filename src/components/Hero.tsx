import React, { useEffect, useState } from 'react';

export default function Hero() {
  const [counts, setCounts] = useState({ users: 0, reports: 0, cases: 0, partners: 0 });

  useEffect(() => {
    const targets = { users: 12847, reports: 89243, cases: 3412, partners: 47 };
    const duration = 1600; // 1.6s
    const start = performance.now();
    let animationFrameId: number;

    const animate = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCounts({
        users: Math.floor(targets.users * easeProgress),
        reports: Math.floor(targets.reports * easeProgress),
        cases: Math.floor(targets.cases * easeProgress),
        partners: Math.floor(targets.partners * easeProgress)
      });

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, 400);

    return () => {
      clearTimeout(timer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-accent/20 rounded-full blur-[80px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-accent2/20 rounded-full blur-[80px] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-accent3/20 rounded-full blur-[80px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10 w-full fade-up is-visible">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-border2 bg-brand-bg3/50 backdrop-blur-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-accent2 animate-pulse" />
          <span className="text-sm font-sans font-medium text-brand-text">India's #1 Digital Rights Platform</span>
        </div>

        <h1 className="font-display font-extrabold text-5xl md:text-[82px] leading-[1.1] tracking-[-0.02em] text-brand-text mb-6">
          Your Digital Life,<br />
          <span className="text-brand-accent">Defended.</span>
        </h1>

        <p className="font-sans text-lg md:text-xl text-brand-muted max-w-[560px] mx-auto mb-10">
          Your digital life is under attack. Guardian fights back. AI-powered tools, legal support, and community defense for India.
        </p>

        <div className="flex items-center gap-4 mb-16 flex-col sm:flex-row w-full sm:w-auto">
          <a href="#report" className="w-full sm:w-auto px-8 py-4 bg-brand-accent hover:bg-brand-accent/90 text-white font-sans font-bold rounded-full transition-colors text-lg">
            Start for Free &rarr;
          </a>
          <a href="#ai" className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-brand-bg3 text-brand-text font-sans font-bold rounded-full border border-brand-border2 transition-colors text-lg">
            See How It Works
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-4xl border-t border-brand-border pt-12">
          <div className="flex flex-col items-center">
            <span className="font-display font-bold text-3xl md:text-4xl text-brand-text mb-2">{counts.users.toLocaleString()}</span>
            <span className="font-sans font-medium text-sm text-brand-muted uppercase tracking-wider">Users Protected</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display font-bold text-3xl md:text-4xl text-brand-text mb-2">{counts.reports.toLocaleString()}</span>
            <span className="font-sans font-medium text-sm text-brand-muted uppercase tracking-wider">Reports Filed</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display font-bold text-3xl md:text-4xl text-brand-text mb-2">{counts.cases.toLocaleString()}</span>
            <span className="font-sans font-medium text-sm text-brand-muted uppercase tracking-wider">Cases Won</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display font-bold text-3xl md:text-4xl text-brand-text mb-2">{counts.partners.toLocaleString()}</span>
            <span className="font-sans font-medium text-sm text-brand-muted uppercase tracking-wider">Legal Partners</span>
          </div>
        </div>
      </div>
    </section>
  );
}
