export default function Header() {
  return (
    <header className="py-6 px-8 flex justify-between items-center max-w-7xl mx-auto w-full">
      {/* Logo */}
      <div className="flex items-center gap-2 font-bold text-xl">
        <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center text-white">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
          </svg>
        </div>
        PropFish AI
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-6">
        <a href="#" className="text-gray-600 font-medium hover:text-gray-900">Login</a>
        <a href="#" className="bg-gradient-purple text-white px-5 py-2 rounded-full font-medium hover:opacity-90 transition-opacity shadow-sm">Sign Up</a>
      </nav>
    </header>
  );
}
