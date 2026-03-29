import React, { useState, useEffect, useRef } from 'react';
import { useClerk, useUser } from '@clerk/react';
import Header from './components/Header';
import Hero from './components/Hero';
import AgentActivity from './components/AgentActivity';
import PropertyRecommendations from './components/PropertyRecommendations';
import BusinessTypesSection from './components/BusinessTypesSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

function App() {
  const [parsedData, setParsedData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [tinyfishResults, setTinyfishResults] = useState([]);
  const agentSectionRef = useRef(null);
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  /**
   * 🔥 Webflow re-init (unchanged)
   */
  useEffect(() => {
    if (window.Webflow && window.Webflow.require) {
      try {
        window.Webflow.destroy();
        window.Webflow.ready();
        window.Webflow.require('ix2').init();
      } catch (e) {
        console.warn("Webflow init warning:", e);
      }
    }
  }, [parsedData, isProcessing]);

  /**
   * 🔥 HANDLE SEARCH (SSE ONLY — NO POST)
   */
  const handleSearch = (query) => {
    // 🔒 Guard: require login before searching
    if (!isSignedIn) {
      openSignIn();
      return;
    }

    console.log("🔍 Searching for:", query);

    // Reset all results so old sections disappear immediately
    setParsedData(null);
    setTinyfishResults([]);
    setIsRefining(false);
    setError(null);
    setIsProcessing(true);

    // Set query last so AgentActivity mounts / re-triggers after reset
    setSearchQuery(query);

    // Auto-scroll to agent activity after React re-renders
    setTimeout(() => {
      agentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  /**
   * 🔥 RECEIVE FINAL RESULTS FROM SSE
   */
  useEffect(() => {
    const handler = (e) => {
      console.log("📦 Received results:", e.detail);
      setTinyfishResults(e.detail || []);
      setIsRefining(false);
      setIsProcessing(false);
    };
    window.addEventListener("tinyfish-results", handler);
    return () => window.removeEventListener("tinyfish-results", handler);
  }, []);

  /**
   * 🏆 REFINING STATE — agents done, LLM picking best match
   */
  useEffect(() => {
    const handler = () => setIsRefining(true);
    window.addEventListener("tinyfish-refining", handler);
    return () => window.removeEventListener("tinyfish-refining", handler);
  }, []);

  return (
    <div className="antialiased min-h-screen flex flex-col bg-[#0d0d0d] text-white">
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col items-center">

        <Hero onSearch={handleSearch}>

          {/* 🔥 LOADING */}
          {isProcessing && (
            <div className="w-full max-w-4xl mx-auto mb-8 p-4 bg-purple-900/30 text-purple-300 animate-pulse rounded-lg text-center font-medium border border-purple-500/20">
              PropFish AI agents are searching across websites...
            </div>
          )}

          {/* 🔥 ERROR */}
          {error && (
            <div className="w-full max-w-4xl mx-auto mb-8 p-4 bg-red-900/30 border border-red-500/30 text-red-400 rounded-lg">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          {/* 🔥 LIVE AGENT */}
          <div ref={agentSectionRef} style={{ scrollMarginTop: '80px' }}>
            <AgentActivity query={searchQuery} />
          </div>

          {/* 🏆 REFINING BANNER — shown after agents finish, before results appear */}
          {isRefining && tinyfishResults.length === 0 && (
            <div className="w-full max-w-4xl mx-auto mb-8 p-4 bg-purple-900/30 text-purple-300 animate-pulse rounded-lg text-center font-medium border border-purple-500/20 flex items-center justify-center gap-3">
              <svg className="animate-spin h-4 w-4 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Refining the best matches using AI insights...
            </div>
          )}

          {/* 🔥 RESULTS */}
          {tinyfishResults.length > 0 && (
            <PropertyRecommendations results={tinyfishResults} />
          )}

        </Hero>

      </main>

      {/* Additional sections */}
      <div className="w-full">
        <BusinessTypesSection />
        <TestimonialsSection />
      </div>

      <Footer />
    </div>
  );
}

export default App;