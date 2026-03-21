import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AgentActivity from './components/AgentActivity';
import PropertyRecommendations from './components/PropertyRecommendations';
import Footer from './components/Footer';

function App() {
  const [parsedData, setParsedData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    console.log("Searching for:", query);
    setParsedData(null);
    setError(null);
    setIsProcessing(true);

    try {
      const response = await fetch('http://localhost:5000/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to parse query');
      }

      console.log("Structured JSON extracted from backend:", data.data);
      setParsedData(data.data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="text-gray-900 antialiased min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-8 py-12 flex flex-col items-center">
        <Hero onSearch={handleSearch} />
        
        {/* Rendering parsed AI query output */}
        {isProcessing && (
          <div className="w-full max-w-4xl mb-8 p-4 bg-purple-50 text-purple-700 animate-pulse rounded-lg text-center font-medium">
            Claude is analyzing your request...
          </div>
        )}

        {error && (
          <div className="w-full max-w-4xl mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            <span className="font-bold">Error:</span> {error}
          </div>
        )}
        
        {parsedData && (
          <div className="w-full max-w-4xl mb-16 p-6 bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden relative">
             <div className="absolute top-0 left-0 w-1 h-full bg-gradient-purple"></div>
             <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
               <span className="text-purple-600">AI Extracted Parameters</span>
               <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
             </h3>
             <pre className="bg-gray-50 p-4 rounded-xl text-sm overflow-auto text-gray-800 border border-gray-100">
               {JSON.stringify(parsedData, null, 2)}
             </pre>
          </div>
        )}

        <AgentActivity />
        <PropertyRecommendations />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
