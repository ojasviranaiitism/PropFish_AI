const properties = [
  {
    id: 1,
    title: "The Azure Residency",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvVEgtLZPoMK2wsPkEW3h0vLu7P13CwOTWVR3tRS5UxlPDBkLC2-hMbGgpDI1W0sJA8uj4XHbRkDLucDDXH6xKqJJXYWM-_yvPO8BcELA1TOne6Wc9RLC9nZGgYzcA9duzmLuaDA-y6A8KZVcu1MSO90TWMy0vrtObytwm7xNwhvo85Hl-RdgJmC6X_zmc9ZblTnFtrcJj5ILF02b_BtChI5CXLUo3f8IOoNam5urZTyQ5Gaw5tiOx0UVcdw1EdZSZBR4kYRzh0Zw",
    badge: "Top Recommendation",
    badgeType: "gradient",
    aiInsight: "Best match for urban living, short commute, and modern amenities.",
    hubs: [
      { icon: "🛒", name: "City Mall" },
      { icon: "🥦", name: "Fresh Market" }
    ],
    commuteType: "Commute",
    commute: [
      { color: "bg-pink-500", name: "Metro Central", time: "4m walk" },
      { color: "bg-yellow-400", name: "Bus Stop #12", time: "2m walk" }
    ],
    isTop: true
  },
  {
    id: 2,
    title: "Willow Creek Heights",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWJL2pnmpIkJeos7f6zcN26Uhx35v7IzmPiqq1m4DzUKp5RN9SZw5GN7W3fGNbJFZsiXxZfeD_gydK4UQq_bUuDTCRET6csTowDUpemAgVWr5CgQ-sZPB0Nty-TV3OwfJwtepowGtn_-HC9NVtJdmOSD-Dgp932Wn81WWlCDS4hzGcSNVe3g_pcZAEVP_Lt34uo9CT4RPVaciVl9w9uP-V4dWrDkCT8QdcW1XLmLko51_D-BtRRbdzYGCPp7iHAVU0hQrxNAWu0OQ",
    badge: "$850,000",
    badgeType: "purple",
    aiInsight: "Best match for urban living, short commute, and modern amenities.",
    hubs: [
      { icon: "🟩", name: "Central Park" },
      { icon: "🏠", name: "Artisan Bakeries" }
    ],
    commuteType: "Education",
    commute: [
      { color: "bg-red-500", name: "East Univ Station", time: "12m drive" }
    ],
    isTop: false
  },
  {
    id: 3,
    title: "Industrial Loft Loft",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFXQlvCXCSqACdY59dLqbwezIFUpoR8JCuLZd4WYxSlaZXlDgsESMxpT8KnL233sAgl9bG26WZYtFxZqpzSdiEzT-qD84llFoTYdvH-gSKERb7dTcl86s71OtkVL8I-yp58auIc7xOhQKRpbWb84xPepYPA-yW_2En3eVVZfcVI8K037UX_65iq9Iy8NKp3CYkh-hgG_Cu7tUST8Z7ibM6zYEUpwBufs4PLl0_3xTKjA6sWQ0p7_hNoXAhDo-MHu3g_uuaRkDV2XM",
    badge: "$3,100/month",
    badgeType: "purple",
    aiInsight: "Best match for urban living, short commute, and modern amenities.",
    hubs: [
      { icon: "🟣", name: "Tech District" },
      { icon: "🟡", name: "Night Market" }
    ],
    commuteType: "Commute",
    commute: [
      { color: "bg-red-600", name: "Loft St. Metro", time: "2m walk" }
    ],
    isTop: false
  }
];

export default function PropertyRecommendations() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div 
            key={property.id} 
            className={`bg-white rounded-2xl overflow-hidden flex flex-col relative ${
              property.isTop 
                ? 'border-glow-purple shadow-glow-purple' 
                : 'border border-gray-100 shadow-sm'
            }`}
          >
            {/* Image Container */}
            <div className="relative h-48 w-full bg-gray-200">
              <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
              <div className={`absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider ${
                property.badgeType === 'gradient' ? 'bg-gradient-purple uppercase' : 'bg-purple-500'
              }`}>
                {property.badge}
              </div>
              <button className="absolute top-3 right-3 w-8 h-8 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-red-500 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-1">{property.title}</h3>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                <span className="font-semibold text-gray-900">AI Insight:</span> {property.aiInsight}
              </p>

              <div className="mb-4">
                <div className="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wide">Nearby Hubs</div>
                <div className="flex flex-wrap gap-2">
                  {property.hubs.map((hub, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md">
                      <span aria-hidden="true">{hub.icon}</span> {hub.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto">
                <div className="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wide">{property.commuteType}</div>
                <ul className="space-y-1 text-sm">
                  {property.commute.map((commute, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-[2px] ${commute.color}`}></span> {commute.name}
                      </span>
                      <span className="text-gray-500 font-medium">{commute.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
