export default function BusinessTypesSection() {
  return (
    <section id="about" data-wf--service-section--variant="style-two" className="service-section w-variant-a349f121-daf6-51c2-ac26-18516ccbd0f4 my-16 py-16">
      <div className="w-layout-blockcontainer container w-container">
        <div className="service-content-wrap flex flex-col gap-16">
          
          {/* Top Overview Section */}
          <div className="service-section-overview text-center max-w-2xl mx-auto">
            <div fade-up="true" data-wf--section-details--variant="style-two" className="section-details w-variant-00f4c875-a668-8d73-2023-49a74906a628">
              <div className="section-title-wrap w-variant-00f4c875-a668-8d73-2023-49a74906a628 mb-4">
                <h2 title-anim="true" className="h2 section-title w-variant-00f4c875-a668-8d73-2023-49a74906a628 text-white text-4xl font-bold">Built for Every Type of Business</h2>
              </div>
              <div className="section-para-wrap w-variant-00f4c875-a668-8d73-2023-49a74906a628">
                <p text-anim="true" className="text-regular section-para w-variant-00f4c875-a668-8d73-2023-49a74906a628 text-gray-400 text-lg">From real estate agents to large brokerages, our AI agent scales with your business.</p>
              </div>
            </div>
          </div>

          {/* Service Grid Card Wrapper */}
          <div fade-up="true" className="service-grid bg-[#0d1017] border border-white/5 rounded-[32px] p-8 md:p-16 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            
            {/* Left Side: Agencies & Bullet Points */}
            <div fade-up="true" className="flex-1 w-full">
              <h4 className="h4 service-support-title text-white text-3xl font-semibold mb-8">Real Estate Agencies</h4>
              <ul role="list" className="service-support-feature-list text-gray-300 space-y-5 list-inside marker:text-gray-500 text-lg">
                <li className="text-regular leading-relaxed">Automate client onboarding and support with AI.</li>
                <li className="text-regular leading-relaxed">Provide instant 24/7 assistance.</li>
                <li className="text-regular leading-relaxed">Scale operations as you grow.</li>
              </ul>
            </div>

            {/* Right Side: 3 Stacked Cards */}
            <div group-fade-up-parent="true" className="service-item-wrap flex flex-col gap-5 flex-1 w-full">
              
              <div group-fade-up-item="true" className="service-item bg-[#141720] border border-white/5 p-6 rounded-2xl flex items-center hover:bg-[#1a1c26] transition-colors gap-6">
                <img loading="lazy" alt="Icon" src="/images/icon-20-1-.svg" className="service-item-icon w-10 h-10 object-contain"/>
                <div className="service-item-vr w-px h-12 bg-white/10 hidden md:block"></div>
                <div className="service-item-title-with-para">
                  <h4 className="text-regular weight-semi-bold service-item-title text-white text-xl mb-1 mt-0">Independent Realtors</h4>
                  <p className="text-extra-small text-gray-400 text-sm m-0">Answer buyer questions &amp; check availability instantly.</p>
                </div>
              </div>

              <div group-fade-up-item="true" className="service-item bg-[#141720] border border-white/5 p-6 rounded-2xl flex items-center hover:bg-[#1a1c26] transition-colors gap-6">
                <img loading="lazy" alt="Icon" src="/images/icon-20-3-.svg" className="service-item-icon w-10 h-10 object-contain"/>
                <div className="service-item-vr w-px h-12 bg-white/10 hidden md:block"></div>
                <div className="service-item-title-with-para">
                  <h4 className="text-regular weight-semi-bold service-item-title text-white text-xl mb-1 mt-0">Property Management</h4>
                  <p className="text-extra-small text-gray-400 text-sm m-0">Capture tenant leads and qualify prospects automatically.</p>
                </div>
              </div>

              <div group-fade-up-item="true" className="service-item bg-[#141720] border border-white/5 p-6 rounded-2xl flex items-center hover:bg-[#1a1c26] transition-colors gap-6">
                <img loading="lazy" alt="Icon" src="/images/icon-20-2-.svg" className="service-item-icon w-10 h-10 object-contain"/>
                <div className="service-item-vr w-px h-12 bg-white/10 hidden md:block"></div>
                <div className="service-item-title-with-para">
                  <h4 className="text-regular weight-semi-bold service-item-title text-white text-xl mb-1 mt-0">Investment Firms</h4>
                  <p className="text-extra-small text-gray-400 text-sm m-0">Reduce research time by surfacing deep AI insights.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
