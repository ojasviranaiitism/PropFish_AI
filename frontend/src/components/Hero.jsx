import { useState } from 'react';

export default function Hero({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <section className="text-center w-full max-w-4xl mb-16">
      <h1 className="text-5xl md:text-[64px] font-extrabold tracking-tighter mb-8 leading-tight text-gray-900">
        Find your next home with<br />AI-powered insights.
      </h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative w-full max-w-4xl mx-auto shadow-lg rounded-full bg-white flex items-center p-2 border border-gray-100">
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your ideal home, neighborhood, and lifestyle..." 
          className="flex-grow border-none bg-transparent py-3 px-6 focus:ring-0 text-gray-700 placeholder-gray-400 outline-none text-lg w-full rounded-l-full" 
        />
        <button 
          type="submit"
          className="bg-gradient-purple text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Search
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </form>
    </section>
  );
}
