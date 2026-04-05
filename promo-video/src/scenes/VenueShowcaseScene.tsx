import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const venues = [
  {
    name: "Paws & Coffee Lounge",
    type: "Cafe",
    rating: 4.8,
    reviews: 124,
    emoji: "☕",
    amenities: ["🥤 Water Bowls", "🌿 Outdoor Seating", "🍕 Pet Menu"],
    gradient: "linear-gradient(135deg, #92400e, #b45309)",
  },
  {
    name: "Bark Central Park",
    type: "Dog Park",
    rating: 4.9,
    reviews: 256,
    emoji: "🌳",
    amenities: ["🏃 Off-Leash Area", "💧 Water Station", "🪑 Shade Zones"],
    gradient: "linear-gradient(135deg, #065f46, #059669)",
  },
  {
    name: "Pet Paradise Hotel",
    type: "Pet Hotel",
    rating: 4.7,
    reviews: 89,
    emoji: "🏨",
    amenities: ["🛏️ Pet Beds", "🍽️ Room Service", "🧼 Grooming"],
    gradient: "linear-gradient(135deg, #5b21b6, #7c3aed)",
  },
];

export const VenueShowcaseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0a1a 0%, #1c1028 100%)",
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
        padding: "60px 100px",
      }}
    >
      {/* Section heading */}
      <div style={{ opacity: headingOpacity, marginBottom: 48 }}>
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#f59e0b",
            textTransform: "uppercase",
            letterSpacing: 4,
            marginBottom: 12,
          }}
        >
          Venue Showcase
        </div>
        <div style={{ fontSize: 44, fontWeight: 800, color: "#fff" }}>
          Discover venues your pet will love
        </div>
      </div>

      {/* Venue cards row */}
      <div
        style={{
          display: "flex",
          gap: 32,
          width: "100%",
        }}
      >
        {venues.map((venue, i) => {
          const delay = 15 + i * 20;
          const cardScale = spring({
            fps,
            frame: Math.max(0, frame - delay),
            config: { damping: 80, stiffness: 150 },
          });
          const cardOpacity = interpolate(
            frame,
            [delay, delay + 10],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                transform: `scale(${cardScale})`,
                opacity: cardOpacity,
                flex: 1,
                borderRadius: 24,
                overflow: "hidden",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Image placeholder with gradient */}
              <div
                style={{
                  height: 200,
                  background: venue.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 80,
                  position: "relative",
                }}
              >
                {venue.emoji}
                {/* Type badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(8px)",
                    padding: "6px 14px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  {venue.type}
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: "24px" }}>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 8,
                  }}
                >
                  {venue.name}
                </div>

                {/* Rating */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 16,
                  }}
                >
                  <span style={{ color: "#fbbf24", fontSize: 18 }}>
                    {"★".repeat(Math.floor(venue.rating))}
                  </span>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                  >
                    {venue.rating}
                  </span>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 14,
                    }}
                  >
                    ({venue.reviews} reviews)
                  </span>
                </div>

                {/* Amenities */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  {venue.amenities.map((amenity, j) => (
                    <span
                      key={j}
                      style={{
                        fontSize: 14,
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
