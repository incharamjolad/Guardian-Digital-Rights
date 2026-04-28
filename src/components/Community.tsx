import React from 'react';
import { Users, BookOpen, Scale, Shield } from 'lucide-react';

export default function Community() {
  return (
    <section id="community" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-16 text-center lg:text-left fade-up">
         <span className="text-brand-accent font-sans font-bold uppercase tracking-wider text-sm mb-4 block">Community First</span>
         <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-text mb-6">You're not alone.</h2>
         <p className="font-sans text-brand-muted text-lg max-w-2xl mx-auto lg:mx-0">Join 12,000+ Indians protecting their digital rights together.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 fade-up">
        {/* Support Circle */}
        <div className="bg-brand-bg2 border border-brand-border rounded-2xl p-6">
          <div className="w-12 h-12 bg-brand-accent/20 rounded-xl flex items-center justify-center mb-6">
             <Users className="text-brand-accent w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-brand-text mb-3">Survivor Support Circle</h3>
          <p className="font-sans text-brand-muted">A safe, moderated space for victims of digital abuse to find guidance and emotional support.</p>
        </div>

        {/* Education Hub */}
        <div className="bg-brand-bg2 border border-brand-border rounded-2xl p-6">
          <div className="w-12 h-12 bg-brand-accent2/20 rounded-xl flex items-center justify-center mb-6">
             <BookOpen className="text-brand-accent2 w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-brand-text mb-3">Rights Education Hub</h3>
          <p className="font-sans text-brand-muted">Simple, jargon-free resources about your rights under Indian laws and policies.</p>
        </div>

        {/* Legal Aid */}
        <div className="bg-brand-bg2 border border-brand-border rounded-2xl p-6">
          <div className="w-12 h-12 bg-brand-accent3/20 rounded-xl flex items-center justify-center mb-6">
             <Scale className="text-brand-accent3 w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-brand-text mb-3">Legal Aid Network</h3>
          <p className="font-sans text-brand-muted">Connect directly with pro-bono lawyers specializing in technology and privacy law.</p>
        </div>

        {/* Bootcamp */}
        <div className="bg-brand-bg2 border border-brand-border rounded-2xl p-6">
          <div className="w-12 h-12 bg-brand-accent4/20 rounded-xl flex items-center justify-center mb-6">
             <Shield className="text-brand-accent4 w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-brand-text mb-3">Digital Literacy Bootcamp</h3>
          <p className="font-sans text-brand-muted">Interactive courses to secure your accounts, detect phishing, and protect your identity.</p>
        </div>
      </div>

      <div className="bg-brand-bg3 border border-brand-border rounded-2xl p-6 md:p-8 fade-up">
         <h4 className="font-display font-bold text-2xl text-brand-text mb-6">Live Community Activity</h4>
         <div className="space-y-4">
           {/* Forum post 1 */}
           <div className="bg-brand-bg2 border border-brand-border p-5 rounded-xl flex gap-4">
             <div className="w-10 h-10 bg-brand-accent text-white rounded-full flex items-center justify-center font-display font-bold shrink-0">VK</div>
             <div>
               <div className="flex items-center gap-3 mb-2 flex-wrap">
                 <span className="font-sans font-bold text-brand-text text-sm">Vikram K.</span>
                 <span className="bg-brand-accent2/20 text-brand-accent2 text-xs px-2 py-0.5 rounded-full font-sans font-bold">SOLVED</span>
                 <span className="text-brand-muted text-xs font-sans">2 mins ago</span>
               </div>
               <p className="font-sans text-brand-text/90 text-sm">Successfully removed the morphed images from the rogue Instagram page using Guardian's DMCA template. Thank you! 🙏</p>
             </div>
           </div>

           {/* Forum post 2 */}
           <div className="bg-brand-bg2 border border-brand-border p-5 rounded-xl flex gap-4">
             <div className="w-10 h-10 bg-brand-accent3 text-white rounded-full flex items-center justify-center font-display font-bold shrink-0">AS</div>
             <div>
               <div className="flex items-center gap-3 mb-2 flex-wrap">
                 <span className="font-sans font-bold text-brand-text text-sm">Anjali S.</span>
                 <span className="bg-brand-accent3/20 text-brand-accent3 text-xs px-2 py-0.5 rounded-full font-sans font-bold">URGENT</span>
                 <span className="text-brand-muted text-xs font-sans">15 mins ago</span>
               </div>
               <p className="font-sans text-brand-text/90 text-sm">Someone is threatening to share private chats. Which IT Act section should I quote in my complaint?</p>
             </div>
           </div>

           {/* Forum post 3 */}
           <div className="bg-brand-bg2 border border-brand-border p-5 rounded-xl flex gap-4">
             <div className="w-10 h-10 bg-brand-accent2 text-brand-bg rounded-full flex items-center justify-center font-display font-bold shrink-0">MG</div>
             <div>
               <div className="flex items-center gap-3 mb-2 flex-wrap">
                 <span className="font-sans font-bold text-brand-text text-sm">Neha G.</span>
                 <span className="bg-brand-accent4/20 text-brand-accent4 text-xs px-2 py-0.5 rounded-full font-sans font-bold">RESOURCE</span>
                 <span className="text-brand-muted text-xs font-sans">1 hour ago</span>
               </div>
               <p className="font-sans text-brand-text/90 text-sm">Made a quick guide on how to register complaints on cybercrime.gov.in efficiently. Attaching the PDF here.</p>
             </div>
           </div>

           {/* Forum post 4 */}
           <div className="bg-brand-bg2 border border-brand-border p-5 rounded-xl flex gap-4">
             <div className="w-10 h-10 bg-brand-accent4 text-brand-bg rounded-full flex items-center justify-center font-display font-bold shrink-0">R</div>
             <div>
               <div className="flex items-center gap-3 mb-2 flex-wrap">
                 <span className="font-sans font-bold text-brand-text text-sm">Rahul</span>
                 <span className="bg-brand-accent2/20 text-brand-accent2 text-xs px-2 py-0.5 rounded-full font-sans font-bold">SOLVED</span>
                 <span className="text-brand-muted text-xs font-sans">3 hours ago</span>
               </div>
               <p className="font-sans text-brand-text/90 text-sm">The legal aid desk connected me with a lawyer from Delhi. We are filing the notice tomorrow. Guardian works!</p>
             </div>
           </div>
         </div>
      </div>
    </section>
  );
}
