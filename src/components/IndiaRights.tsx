import React, { useState } from 'react';
import { Scale } from 'lucide-react';

const laws = [
  {
    id: 'dpdp',
    title: 'DPDP Act, 2023',
    description: 'Digital Personal Data Protection Act. Companies must ask your permission before using your data.',
    body: 'The DPDP Act gives Indian citizens control over their personal data. It mandates that entities (Data Fiduciaries) must obtain explicit, clear consent before processing your data. You have the right to access, correct, and erase your data, and companies face severe penalties for data breaches.'
  },
  {
    id: 'sec66e',
    title: 'IT Act — Section 66E',
    description: 'Protection against privacy violation and voyeurism.',
    body: 'Section 66E criminalizes capturing, publishing, or transmitting images of a person\'s private areas without their consent. It’s designed to protect bodily privacy and penalizes voyeurism and non-consensual sharing of intimate images with up to 3 years imprisonment.'
  },
  {
    id: 'sec67',
    title: 'IT Act — Section 67',
    description: 'Publishing obscene material in electronic form.',
    body: 'Section 67 makes it illegal to publish or transmit material containing sexually explicit acts or conduct in electronic form. This section is actively used to take down non-consensual pornography and punish offenders with up to 3 years jail time.'
  },
  {
    id: 'sec499',
    title: 'IPC — Section 499/500',
    description: 'Criminal defamation laws applying to online spaces.',
    body: 'Sections 499 and 500 of the Indian Penal Code deal with defamation. If someone publishes false statements online (via social media, forums, or blogs) that harm your reputation, you can file a criminal complaint against them for defamation.'
  },
  {
    id: 'copyright',
    title: 'Copyright Act, 1957',
    description: 'Protection for your original digital content and creativity.',
    body: 'The Copyright Act protects your original creative works (videos, music, articles, art) from unauthorized copying or distribution. Through mechanisms like DMCA and Section 52, you can issue legal notices demanding the removal of stolen content.'
  }
];

export default function IndiaRights() {
  const [activeLaw, setActiveLaw] = useState<{title: string, body: string} | null>(null);

  return (
    <section id="india" className="bg-brand-bg2 border-y border-brand-border py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fade-up">
        <div className="mb-16 text-center">
           <span className="text-brand-accent font-sans font-bold uppercase tracking-wider text-sm mb-4 block">Engineered for India</span>
           <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-text mb-6">Designed for Bharat's unique needs.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left panel */}
          <div>
             <div className="space-y-4 mb-8">
               <div className="bg-brand-bg border border-brand-border p-6 rounded-2xl flex gap-4 items-start">
                 <div className="text-3xl">🇮🇳</div>
                 <div>
                   <h3 className="font-display font-bold text-lg text-brand-text mb-1">Indian law explained simply</h3>
                   <p className="font-sans text-brand-muted text-sm">DPDP Act, IT Act, and IPC summarized in plain language without the legal jargon.</p>
                 </div>
               </div>
               <div className="bg-brand-bg border border-brand-border p-6 rounded-2xl flex gap-4 items-start">
                 <div className="text-3xl">🏛️</div>
                 <div>
                   <h3 className="font-display font-bold text-lg text-brand-text mb-1">One-tap cybercrime filing</h3>
                   <p className="font-sans text-brand-muted text-sm">Pre-filled smart forms that generate reports ready for cybercrime.gov.in</p>
                 </div>
               </div>
               <div className="bg-brand-bg border border-brand-border p-6 rounded-2xl flex gap-4 items-start">
                 <div className="text-3xl">📱</div>
                 <div>
                   <h3 className="font-display font-bold text-lg text-brand-text mb-1">Works offline too</h3>
                   <p className="font-sans text-brand-muted text-sm">Core rights guides and reporting templates are stored locally for rural connectivity.</p>
                 </div>
               </div>
               <div className="bg-brand-bg border border-brand-border p-6 rounded-2xl flex gap-4 items-start">
                 <div className="text-3xl">🎓</div>
                 <div>
                   <h3 className="font-display font-bold text-lg text-brand-text mb-1">Rural digital rights education</h3>
                   <p className="font-sans text-brand-muted text-sm">Bite-sized video lessons and audio guides crafted for Tier 2 and Tier 3 cities.</p>
                 </div>
               </div>
             </div>

             <div>
                 <p className="font-sans font-bold text-sm text-brand-text mb-4">Available in 13 languages</p>
                 <div className="flex flex-wrap gap-2">
                   {[
                     { name: 'English', code: 'en' },
                     { name: 'हिन्दी', code: 'hi' },
                     { name: 'தமிழ்', code: 'ta' },
                     { name: 'తెలుగు', code: 'te' },
                     { name: 'ಕನ್ನಡ', code: 'kn' },
                     { name: 'বাংলা', code: 'bn' },
                     { name: 'मराठी', code: 'mr' },
                     { name: 'ગુજરાતી', code: 'gu' },
                     { name: 'മലയാളം', code: 'ml' },
                     { name: 'ਪੰਜਾਬੀ', code: 'pa' },
                     { name: 'اردو', code: 'ur' },
                     { name: 'অসমীয়া', code: 'as' },
                     { name: 'ଓଡ଼ିଆ', code: 'or' }
                   ].map(lang => (
                   <button 
                     key={lang.code}
                     onClick={() => {
                        if (lang.code === 'en') {
                            document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
                            window.location.reload();
                            return;
                        }
                        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
                        if (select) {
                            select.value = lang.code;
                            select.dispatchEvent(new Event('change'));
                        } else {
                            document.cookie = `googtrans=/en/${lang.code}; path=/; max-age=31536000`;
                            document.cookie = `googtrans=/en/${lang.code}; path=/; domain=${window.location.hostname}; max-age=31536000`;
                            window.location.reload();
                        }
                     }}
                     className={`hover:bg-brand-border border px-4 py-2 rounded-full font-sans text-sm transition-colors cursor-pointer ${
                       (document.cookie.includes(`/en/${lang.code}`) || (lang.code === 'en' && !document.cookie.includes('googtrans=')))
                         ? 'bg-brand-accent text-white border-brand-accent font-bold'
                         : 'bg-brand-bg3 border-brand-border text-brand-text'
                     }`}
                   >
                     {lang.name}
                   </button>
                 ))}
               </div>
             </div>
          </div>

          {/* Right Panel */}
          <div className="bg-brand-bg3 border border-brand-border rounded-2xl p-6 lg:p-10 h-max">
             <h3 className="font-display font-bold text-2xl text-brand-text mb-8 flex items-center gap-2">
                <Scale className="text-brand-accent w-6 h-6" /> Know Your Rights
             </h3>
             <div className="space-y-4">
               {laws.map(law => (
                 <div key={law.id} className="bg-brand-bg border border-brand-border p-5 rounded-xl flex justify-between items-center group hover:border-brand-accent/50 transition-colors">
                   <div>
                     <h4 className="font-display font-bold text-brand-text">{law.title}</h4>
                     <p className="font-sans text-brand-muted text-sm mt-1 max-w-[280px]">{law.description}</p>
                   </div>
                   <button 
                     onClick={() => setActiveLaw({title: law.title, body: law.body})}
                     className="shrink-0 text-brand-accent font-sans font-bold text-sm bg-brand-accent/10 px-4 py-2 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity"
                   >
                     Learn &rarr;
                   </button>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>

      {/* Law Modal */}
      {activeLaw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setActiveLaw(null)}>
           <div className="bg-brand-bg2 border border-brand-border w-full max-w-[520px] rounded-2xl p-8" onClick={e => e.stopPropagation()}>
              <h3 className="font-display font-bold text-2xl text-brand-text mb-4">{activeLaw.title}</h3>
              <p className="font-sans text-brand-muted text-lg leading-relaxed mb-8">{activeLaw.body}</p>
              <button 
                onClick={() => setActiveLaw(null)}
                className="w-full bg-brand-bg3 hover:bg-brand-border border border-brand-border text-brand-text font-sans font-bold py-3 rounded-xl transition-colors"
              >
                Understood
              </button>
           </div>
        </div>
      )}
    </section>
  );
}
