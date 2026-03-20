import Header from './components/Header';
import Hero from './components/Hero';
import AgentActivity from './components/AgentActivity';
import PropertyRecommendations from './components/PropertyRecommendations';
import Footer from './components/Footer';

function App() {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // In a real app, this would trigger the AI agent activity
  };

  return (
    <div className="text-gray-900 antialiased min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-8 py-12 flex flex-col items-center">
        <Hero onSearch={handleSearch} />
        <AgentActivity />
        <PropertyRecommendations />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
