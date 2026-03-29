export default function Footer() {
  return (
    <footer className="footer-section mt-16">
      <div className="w-layout-blockcontainer container w-container">
        <div className="footer-left-content">
          <div group-fade-up-parent="true" className="footer-top">
            <div group-fade-up-item="true" className="footer-details">
              <a href="/" className="w-inline-block font-bold text-2xl text-white">
                PropFish AI
              </a>
              <p className="text-regular text-gray-400 mt-4">
                AI-powered search for your perfect home. Discover exactly what you need with conversational intel.
              </p>
            </div>
            <div group-fade-up-item="true" className="footer-menu-inner">
              <div className="footer-menu-wrap">
                <div className="footer-menu-title text-white">Company</div>
                <div className="footer-menu">
                  <a href="/" className="footer-link w-inline-block text-gray-400 hover:text-white"><div>Home</div></a>
                  <a href="#" className="footer-link w-inline-block text-gray-400 hover:text-white"><div>About</div></a>
                  <a href="#" className="footer-link w-inline-block text-gray-400 hover:text-white"><div>Privacy Policy</div></a>
                </div>
              </div>
              <div className="footer-menu-wrap">
                <div className="footer-menu-title text-white">Support</div>
                <div className="footer-menu">
                  <a href="#" className="footer-link w-inline-block text-gray-400 hover:text-white"><div>Terms of Service</div></a>
                  <a href="#" className="footer-link w-inline-block text-gray-400 hover:text-white"><div>Contact</div></a>
                </div>
              </div>
            </div>
          </div>
          <div fade-up="true" className="footer-bottom flex justify-between">
            <p className="text-small footer-copyright-text text-gray-400">2026 @PropFish AI All rights Reserved</p>
            <p className="text-small footer-copyright-text text-gray-400 flex gap-4">
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">LinkedIn</a>
            </p>
          </div>
        </div>
      </div>
      <div className="footer-bg">
        <img src="/images/footer_bg.avif" loading="lazy" alt="Bg Shape" className="footer-bg-shape" />
      </div>
    </footer>
  );
}
