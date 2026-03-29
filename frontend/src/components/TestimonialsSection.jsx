export default function TestimonialsSection() {
  return (
    <section className="faq-section my-16 py-8">
      <div className="w-layout-blockcontainer container w-container">
        <div className="w-full text-center mb-12">
           <h2 className="h2 section-title text-white">What our users say</h2>
           <p className="text-gray-400 mt-4 max-w-2xl mx-auto">See how PropFish AI is transforming the property search experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
           <div className="p-8 bg-[#111] rounded-2xl border border-white/5 shadow-sm relative hover:-translate-y-1 transition-transform duration-300">
             <div className="text-purple-500 text-6xl leading-none mb-4 font-serif absolute top-4 right-6 opacity-20">"</div>
             <p className="text-gray-300 text-sm mb-8 leading-relaxed relative z-10 block min-h-[80px]">"This AI found me 5 off-market listings I couldn't find anywhere else. The conversational search saved me hours."</p>
             <div className="flex items-center gap-4 border-t border-white/10 pt-6">
               <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-300 font-bold border border-purple-500/30">JD</div>
               <div>
                  <h5 className="font-bold text-white text-sm">John Doe</h5>
                  <p className="text-xs text-purple-400/80">First-time Homebuyer</p>
               </div>
             </div>
           </div>
           
           <div className="p-8 bg-[#111] rounded-2xl border border-white/5 shadow-sm relative hover:-translate-y-1 transition-transform duration-300">
             <div className="text-purple-500 text-6xl leading-none mb-4 font-serif absolute top-4 right-6 opacity-20">"</div>
             <p className="text-gray-300 text-sm mb-8 leading-relaxed relative z-10 block min-h-[80px]">"As a realtor, I use PropFish to generate custom lists for my high-end clients in seconds. Highly actionable."</p>
             <div className="flex items-center gap-4 border-t border-white/10 pt-6">
               <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-300 font-bold border border-purple-500/30">SM</div>
               <div>
                  <h5 className="font-bold text-white text-sm">Sarah Michaelson</h5>
                  <p className="text-xs text-purple-400/80">Luxury Realtor</p>
               </div>
             </div>
           </div>
           
           <div className="p-8 bg-[#111] rounded-2xl border border-white/5 shadow-sm relative hover:-translate-y-1 transition-transform duration-300">
             <div className="text-purple-500 text-6xl leading-none mb-4 font-serif absolute top-4 right-6 opacity-20">"</div>
             <p className="text-gray-300 text-sm mb-8 leading-relaxed relative z-10 block min-h-[80px]">"The ROI on property investments requires deep data. PropFish aggregates exactly what I need and presents it cleanly."</p>
             <div className="flex items-center gap-4 border-t border-white/10 pt-6">
               <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-300 font-bold border border-purple-500/30">AT</div>
               <div>
                  <h5 className="font-bold text-white text-sm">Alex Torres</h5>
                  <p className="text-xs text-purple-400/80">Property Investor</p>
               </div>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
