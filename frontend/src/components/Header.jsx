import { useState, useEffect, useRef } from 'react';
import { useClerk, useUser, UserButton } from '@clerk/react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { openSignIn, openSignUp } = useClerk();
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled past top to show background
      setIsScrolled(currentScrollY > 50);

      // Determine scroll direction for hiding/showing header
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setIsHidden(true); // Scrolling down - hide
      } else {
        setIsHidden(false); // Scrolling up - reveal
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header-section fixed top-0 left-0 w-full z-[999] transition-transform duration-[400ms] ease ${isHidden ? '-translate-y-full' : 'translate-y-0'} bg-transparent`}>
      <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="header-nav w-nav bg-transparent">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <div fade="true" className="header-nav-content-wrap">
            <div className="nav-content-wrap relative z-10 transition-colors duration-[400ms]">
              <a href="/" className={`invert nav-logo-link w-nav-brand font-bold text-xl transition-colors duration-[400ms] ${isScrolled ? 'text-white' : 'text-gray-100 hover:text-white'}`}>
                PropFish AI
              </a>
              <nav role="navigation" className="nav-offcanvas w-nav-menu">
                <div className="nav-menu-with-btn">
                  <div className="nav-menu-inner">
                    <div className="nav-menu">
                      {/* Home */}
                      <a
                        href="/"
                        className={`nav-link w-nav-link transition-colors duration-[400ms] ${isScrolled ? 'text-white' : 'text-gray-100 hover:text-white'}`}
                      >
                        Home
                      </a>

                      {/* About — smooth scroll to #about section */}
                      <a
                        href="#about"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className={`nav-link w-nav-link transition-colors duration-[400ms] ${isScrolled ? 'text-white' : 'text-gray-100 hover:text-white'}`}
                      >
                        About
                      </a>

                      {/* TinyFish — external link */}
                      <a
                        href="https://www.tinyfish.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`nav-link w-nav-link transition-colors duration-[400ms] ${isScrolled ? 'text-white' : 'text-gray-100 hover:text-white'}`}
                      >
                        TinyFish
                      </a>
                    </div>
                  </div>

                  {/* Mobile buttons */}
                  <div className="desktop-hidden flex items-center gap-2">
                    {isSignedIn ? (
                      <UserButton afterSignOutUrl="/" />
                    ) : (
                      <>
                        <a
                          href="#"
                          onClick={(e) => { e.preventDefault(); openSignIn(); }}
                          className="button w-inline-block"
                          style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.25)' }}
                        >
                          <div className="button-text-wrap">
                            <div className="button-text-switch">
                              <div className="button-text first-text">Login</div>
                              <div className="button-text second-text">Login</div>
                            </div>
                          </div>
                          <div className="button-bg"></div>
                        </a>
                        <a
                          href="#"
                          onClick={(e) => { e.preventDefault(); openSignUp(); }}
                          data-wf--button--variant="base"
                          className="button w-inline-block"
                        >
                          <div className="button-text-wrap">
                            <div className="button-text-switch">
                              <div className="button-text first-text">Sign Up</div>
                              <div className="button-text second-text">Sign Up</div>
                            </div>
                          </div>
                          <div className="button-bg"></div>
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </nav>

              {/* Desktop buttons — Login + Sign Up (unauthenticated) or UserButton (authenticated) */}
              <div className="nav-btn-inner flex items-center gap-3">
                {isSignedIn ? (
                  <UserButton afterSignOutUrl="/" />
                ) : (
                  <>
                    {/* Login — ghost style */}
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); openSignIn(); }}
                      className="button w-variant-b0fff8c7-2f2a-2b98-9255-dbe5a5319f5e w-inline-block"
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.25)',
                        color: 'white'
                      }}
                    >
                      <div className="button-text-wrap w-variant-b0fff8c7-2f2a-2b98-9255-dbe5a5319f5e">
                        <div className="button-text-switch">
                          <div className="button-text first-text">Login</div>
                          <div className="button-text second-text">Login</div>
                        </div>
                      </div>
                      <div className="button-bg w-variant-b0fff8c7-2f2a-2b98-9255-dbe5a5319f5e"></div>
                    </a>

                    {/* Sign Up */}
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); openSignUp(); }}
                      data-wf--button--variant="style-three"
                      className="button w-variant-b0fff8c7-2f2a-2b98-9255-dbe5a5319f5e w-inline-block"
                    >
                      <div className="button-text-wrap w-variant-b0fff8c7-2f2a-2b98-9255-dbe5a5319f5e">
                        <div className="button-text-switch">
                          <div className="button-text first-text">Sign Up</div>
                          <div className="button-text second-text">Sign Up</div>
                        </div>
                      </div>
                      <div className="button-bg w-variant-b0fff8c7-2f2a-2b98-9255-dbe5a5319f5e"></div>
                    </a>
                  </>
                )}
              </div>
              <div className="hamburger-trigger-wrap">
                <div className="hamburger-trigger w-nav-button">
                  <div data-is-ix2-target="1" className="hamburger-lottie-icon" data-animation-type="lottie" data-src="/js/menu-.json" data-loop="0" data-direction="1" data-autoplay="0" data-renderer="svg" data-default-duration="0" data-duration="0.9"></div>
                </div>
              </div>
            </div>

            {/* Dynamic Background Opacity matching Webflow parameters */}
            <div className={`header-nav-bg absolute inset-0 transition-all duration-[400ms] ${isScrolled
              ? 'opacity-100 bg-[#060b13]/95 backdrop-blur-md border-b border-white/10 shadow-lg'
              : 'opacity-0'
              }`}>
              <div className="header-nav-bg-gradiant hidden"></div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
