export default function PropertyRecommendations({ results }) {
  const properties = results?.flatMap((site) => {
    const listings = site.result?.listings || site.result?.top_listings || [];

    return listings.map((item, index) => ({
      id: `${site.site}-${item.id || index}`,
      title: item.property_type || "Property",
      image: item.image_url || "https://picsum.photos/400/300",
      badge: item.price || "N/A",
      badgeType: "purple",
      aiInsight: `${item.bedrooms || ""} • ${item.area || ""}`,
      address: item.address || item.location || "Address not available",
      location: item.location || "Unknown location",
      url: item.url,
      keyFeatures: Array.isArray(item.key_features) ? item.key_features : [],
      isBestPick: !!item.isBestPick,
      bestReason: item.bestReason || null,
      isTop: index === 0
    }));
  }) || [];

  // Sort best pick to front
  properties.sort((a, b) => (b.isBestPick ? 1 : 0) - (a.isBestPick ? 1 : 0));

  if (!properties.length) return null;

  return (
    <section className="w-layout-blockcontainer container w-container mb-16">
      <div className="section-title-wrap mb-8 text-center">
        <h2 className="h2 section-title text-white">Top Property Matches</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {properties.map((property) => (
      <div
          key={property.id}
          className="feature-item"
          style={{
            height: '100%',
            position: 'relative',
            ...(property.isBestPick ? {
              border: '2px solid #f59e0b',
              borderRadius: '16px',
              boxShadow: '0 0 28px 4px rgba(245,158,11,0.35), 0 0 0 1px rgba(245,158,11,0.2)',
            } : {})
          }}
        >
          {/* ⭐ Best Match crown ribbon */}
          {property.isBestPick && (
            <div style={{
              position: 'absolute',
              top: '-14px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
              color: '#000',
              fontWeight: '800',
              fontSize: '11px',
              letterSpacing: '0.08em',
              padding: '4px 16px',
              borderRadius: '99px',
              whiteSpace: 'nowrap',
              zIndex: 10,
              boxShadow: '0 2px 12px rgba(245,158,11,0.5)'
            }}>
              ⭐ PROPFISH BEST MATCH
            </div>
          )}

          <div className="feature-item-banner-wrap relative" style={{ height: '240px' }}>
            <img
              src={property.image}
              alt={property.title}
              className="feature-item-banner object-cover w-full h-full"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300'; }}
            />
            <div
              className={`absolute top-4 left-4 text-white text-xs font-bold px-4 py-2 rounded-full tracking-wider ${property.badgeType === "gradient" ? "bg-purple-600" : "bg-[#111] border border-white/20"}`}
            >
              {property.badge}
            </div>
          </div>

          <div className="feature-item-body flex flex-col flex-grow">
            <h4 className="h4 weight-semi-bold text-white mb-1">{property.location}</h4>
            <p className="text-sm text-gray-400 mb-1 flex items-start gap-1">
              <span className="mt-0.5">📍</span>
              <span>{property.address}</span>
            </p>
            <p className="text-regular text-gray-400 mb-3">{property.aiInsight}</p>

            {property.isBestPick && property.bestReason && (
              <div style={{
                background: 'rgba(245,158,11,0.08)',
                border: '1px solid rgba(245,158,11,0.3)',
                borderRadius: '8px',
                padding: '8px 12px',
                marginBottom: '12px',
                fontSize: '12px',
                color: '#fbbf24',
                lineHeight: '1.5'
              }}>
                🏆 {property.bestReason}
              </div>
            )}

            {property.keyFeatures.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {property.keyFeatures.map((feature, i) => (
                  <span key={i} className="text-xs bg-purple-900/40 text-purple-300 px-2 py-1 rounded-md border border-purple-500/20">
                    {feature}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">{property.title}</span>
              <a
                href={property.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-medium text-sm hover:underline"
              >
                View Listing →
              </a>
            </div>
          </div>
        </div>
        ))}
      </div>
    </section>
  );
}