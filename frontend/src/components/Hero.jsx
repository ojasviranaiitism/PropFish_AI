import { useState } from 'react';

export default function Hero({ onSearch, children }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <>
      {/* ✅ FULL VIEWPORT BACKGROUND - Anchored to document root */}
      <div className="absolute top-0 left-0 z-0 w-[100vw] h-[110vh] overflow-hidden pointer-events-none">
        <img
          src="/images/bg-20-1-.avif"
          alt="BG"
          className="w-full h-full object-cover object-top"
        />
      </div>

      <section className="w-[100vw] max-w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[90vh] overflow-visible flex items-center justify-center pt-10">
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6">
          <div className="feature-hero-content-wrap">
            <div>
              <div className="feature-hero-section-details text-center mt-15">
                <h1 className="h1 hero-title">
                  Find your next home with AI-powered insights.
                </h1>
                <p className="text-regular feature-hero-para mt-4">
                  Skip the scrolling. Describe your ideal property, neighborhood, and lifestyle, and let our agents gather the best matches instantly.
                </p>
              </div>

              {/* SEARCH CHAT UI */}
              <form
                onSubmit={handleSearch}
                className="relative w-full max-w-3xl mt-20 mx-auto z-10"
              >
                <div className="bg-[#12244a]/70 backdrop-blur-[30px] border border-[#264482] p-5 rounded-[24px] shadow-2xl flex flex-col gap-3">

                  {/* Header Title */}
                  <div className="flex items-center text-sm font-mono tracking-wide text-gray-200 ml-2">
                    AI Property Finder bot.
                  </div>

                  {/* Chat Input Area */}
                  <div className="bg-[#0f1115] border border-gray-800 rounded-[20px] p-4 flex flex-col min-h-[160px] relative shadow-inner">

                    {/* Textarea */}
                    <textarea
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSearch(e);
                        }
                      }}
                      placeholder="Describe your ideal home, neighborhood, and lifestyle..."
                      className="w-full flex-grow bg-transparent text-white placeholder-gray-400 outline-none resize-none text-[17px] p-1 font-sans leading-relaxed"
                      rows="3"
                    ></textarea>

                    {/* Toolbar */}
                    <div className="flex items-center justify-between mt-auto pt-4">

                      {/* Left Tools */}
                      <div className="flex items-center gap-3 text-gray-500">
                        <button type="button" className="hover:text-white transition-colors p-1" title="Add Details">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                        </button>
                        <div className="h-5 w-[1px] bg-gray-700"></div>
                        <button type="button" className="hover:text-white transition-colors p-1" title="Attach Document">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                        </button>
                      </div>

                      {/* Right Action */}
                      <div className="flex items-center gap-4">
                        {/* Voice Input (Preserved) */}
                        <button
                          type="button"
                          className="w-10 h-10 flex items-center justify-center rounded-[12px] bg-[#1a1d24] border border-[#2a2d36] text-gray-400 hover:text-white hover:bg-[#252830] transition-all"
                          title="Voice Input (Coming Soon)"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                        </button>

                        <button
                          type="button"
                          onClick={handleSearch}
                          data-wf--button--variant="base"
                          className="button w-inline-block border-none bg-transparent cursor-pointer p-0 m-0 outline-none"
                        >
                          <div className="button-text-wrap">
                            <div className="button-text-switch">
                              <div className="button-text first-text px-4">Search</div>
                              <div className="button-text second-text px-4">Search</div>
                            </div>
                          </div>
                          <div className="button-bg"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* SEARCH RESULTS FEED */}
            {children && (
              <div className="w-full">
                {children}
              </div>
            )}

            {/* BRAND MARQUEE */}
            <div className="mt-12 overflow-hidden flex whitespace-nowrap mask-image-gradient w-full max-w-5xl mx-auto opacity-70 hover:opacity-100 transition-opacity duration-300">
              <div className="flex animate-marquee shrink-0 gap-0 min-w-full justify-around items-center">
                <img src="https://cdn.worldvectorlogo.com/logos/zillow-1.svg" alt="Zillow Logo" className="ml-0 h-8 w-auto object-contain" />Zillow
                <img src="https://play-lh.googleusercontent.com/TQyPUjiUTgsLCjHwktulyVyNw05FxSO8YghYQMXn4gQhjyIW55BA4WwmKxbXTB_Niw" alt="magicbricks Logo" className="h-8 w-auto object-contain" />Magicbricks
                <img src="https://c.housingcdn.com/demand/s/client/common/assets/housing-logo.c02cf34a.png" alt="Housing Logo" className="h-8 w-auto object-contain" />Housing
                <img src="https://s3-eu-west-1.amazonaws.com/hackajob-uploads1.p.hackajob/branding/blogs/HhD7LA6XThWvf9MqsmMh_unnamed.jpg" alt="Hackajob Logo" className="h-8 w-auto object-contain" />Hackajob
                <img src="https://play-lh.googleusercontent.com/AkpikqIIjM1JmESQofBUsUxZjkAbsFDS9hafuf0FOAaeXYpixqbHT5Is6RAEbdAMDWw" alt="Bayut Logo" className="h-8 w-auto object-contain" />Bayut
              </div>
              <div className="flex animate-marquee shrink-0 gap-0 min-w-full justify-around items-center" aria-hidden="true">
                <img src="https://cdn.worldvectorlogo.com/logos/zillow-1.svg" alt="Zillow Logo" className="ml-0 h-8 w-auto object-contain" />Zillow
                <img src="https://play-lh.googleusercontent.com/TQyPUjiUTgsLCjHwktulyVyNw05FxSO8YghYQMXn4gQhjyIW55BA4WwmKxbXTB_Niw" alt="magicbricks Logo" className="h-8 w-auto object-contain" />Magicbricks
                <img src="https://c.housingcdn.com/demand/s/client/common/assets/housing-logo.c02cf34a.png" alt="Housing Logo" className="h-8 w-auto object-contain" />Housing
                <img src="https://s3-eu-west-1.amazonaws.com/hackajob-uploads1.p.hackajob/branding/blogs/HhD7LA6XThWvf9MqsmMh_unnamed.jpg" alt="Hackajob Logo" className="h-8 w-auto object-contain" />Hackajob
                <img src="https://play-lh.googleusercontent.com/AkpikqIIjM1JmESQofBUsUxZjkAbsFDS9hafuf0FOAaeXYpixqbHT5Is6RAEbdAMDWw" alt="Bayut Logo" className="h-8 w-auto object-contain" />Bayut
              </div>
            </div>

            {/* FEATURES */}
            <div className="mt-16">
              <div className="feature-grid-wrap">

                <div className="feature-grid">
                  <div className="feature-item">
                    <div className="feature-item-banner-wrap">
                      <img src="/images/banner-20-1-.png" className="feature-item-banner" />
                    </div>
                    <div className="feature-item-body">
                      <h4 className="h4 weight-semi-bold">Seamless Data Intel</h4>
                      <p className="text-regular">
                        Integrates with top property listings to automate data flow instantly.
                      </p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-item-banner-wrap">
                      <img src="/images/banner-20-3-.png" className="feature-item-banner" />
                    </div>
                    <div className="feature-item-body">
                      <h4 className="h4 weight-semi-bold">AI Analytics</h4>
                      <p className="text-regular">
                        We analyze thousands of data points to find an exact match in seconds flat.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="feature-grid grid-reverse">
                  <div className="feature-item">
                    <div className="feature-item-banner-wrap">
                      <img src="/images/banner-20-3-.png" className="feature-item-banner" />
                    </div>
                    <div className="feature-item-body">
                      <h4 className="h4 weight-semi-bold">Global Coverage</h4>
                      <p className="text-regular">
                        Find homes in top cities around the world effortlessly.
                      </p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-item-banner-wrap">
                      <img src="/images/banner-20-2-.png" className="feature-item-banner" />
                    </div>
                    <div className="feature-item-body">
                      <h4 className="h4 weight-semi-bold">Conversational UI</h4>
                      <p className="text-regular">
                        Search effortlessly with natural language for a smooth experience.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}