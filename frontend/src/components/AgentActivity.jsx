const activities = [
  {
    id: 1,
    text: "Scanning listings...",
    icon: (
      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    ),
    progress: "w-1/3",
    isActive: false,
  },
  {
    id: 2,
    text: "Analyzing neighborhoods...",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
      </svg>
    ),
    progress: "w-1/4",
    isActive: true,
  },
  {
    id: 3,
    text: "Filtering properties...",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    ),
    progress: "w-3/4",
    isActive: false,
  }
];

export default function AgentActivity() {
  return (
    <section className="w-full mb-16">
      <h2 className="text-2xl font-bold mb-6">AI Agent Activity</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className={`rounded-2xl p-4 flex items-center gap-4 relative ${
              activity.isActive 
                ? 'bg-white border-glow-purple shadow-glow-purple' 
                : 'bg-white shadow-sm border border-gray-100'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              activity.isActive ? 'bg-purple-100 text-purple-600' : 'bg-purple-50 text-purple-500'
            }`}>
              {activity.icon}
            </div>
            <div className="flex-grow">
              <div className="text-sm font-medium mb-2">{activity.text}</div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-purple ${activity.progress} rounded-full`}></div>
              </div>
            </div>
            {activity.isActive && (
              <div className="absolute right-4 text-purple-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
