import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-brand-bg3 border-t border-brand-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className="font-display font-bold text-3xl text-brand-text">Guard</span>
              <span className="font-display font-bold text-3xl text-brand-accent">ian</span>
            </div>
            <p className="font-sans text-brand-muted text-sm mb-6">Your digital life is under attack. Guardian fights back.</p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-accent2/10 border border-brand-accent2/30 rounded-full">
              <span className="text-brand-accent2 text-xs font-sans font-bold">No Ads. No Data Sales. Ever.</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-display font-bold text-brand-text mb-6">Product</h4>
            <ul className="space-y-4">
              <li><a href="#" className="font-sans text-sm text-brand-muted hover:text-brand-text transition-colors">AI Deepfake Detector</a></li>
              <li><a href="#" className="font-sans text-sm text-brand-muted hover:text-brand-text transition-colors">Takedown Generator</a></li>
              <li><a href="#" className="font-sans text-sm text-brand-muted hover:text-brand-text transition-colors">Abuse Heatmap</a></li>
              <li><a href="#" className="font-sans text-sm text-brand-muted hover:text-brand-text transition-colors">Pro-Bono Legal Desk</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-display font-bold text-brand-text mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="font-sans text-sm text-brand-muted hover:text-brand-text transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="font-sans text-sm text-brand-muted hover:text-brand-text transition-colors">Terms of Service</a></li>
              <li><a href="#" className="font-sans text-sm text-brand-muted hover:text-brand-text transition-colors">Transparency Report</a></li>
              <li><a href="#" className="font-sans text-sm text-brand-muted hover:text-brand-text transition-colors">Open Source License</a></li>
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h4 className="font-display font-bold text-brand-text mb-6">Connect</h4>
            <ul className="space-y-4">
              <li><a href="#" className="font-sans text-sm text-brand-muted hover:text-brand-text transition-colors">Twitter / X</a></li>
              <li><a href="#" className="font-sans text-sm text-brand-muted hover:text-brand-text transition-colors">Instagram</a></li>
              <li><a href="#" className="font-sans text-sm text-brand-muted hover:text-brand-text transition-colors">Discord Community</a></li>
              <li><a href="#" className="font-sans text-sm text-brand-muted hover:text-brand-text transition-colors">GitHub Repository</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-brand-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-sm text-brand-muted">© {new Date().getFullYear()} Guardian Digital Rights India.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-accent2 animate-pulse" />
            <span className="font-sans text-xs text-brand-muted">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
