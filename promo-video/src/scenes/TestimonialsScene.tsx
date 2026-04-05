import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const testimonials = [
  {
    name: "Sarah M.",
    pet: "🐕 Golden Retriever owner",
    quote:
      "Finally, a platform that understands pet owners! Found 3 amazing dog-friendly cafes in my neighborhood.",
    stars: 5,
  },
  {
    name: "Mike T.",
    pet: "🐈 Cat dad",
    quote:
      "The booking system is seamless. My cat and I love our weekly visits to the pet lounge!",
    stars: 5,
  },
  {
    name: "Lisa R.",
    pet: "🏪 Venue owner",
    quote:
      "Our bookings increased 40% after listing on MyPetVenues. The pet community is amazing!",
    stars: 5,
  },
];

export const TestimonialsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a0d2e 0%, #0f172a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
        padding: "60px 100px",
      }}
    >
      {/* Heading */}
      <div
        style={{
          opacity: headingOpacity,
          textAlign: "center",
          marginBottom: 48,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#fbbf24",
            textTransform: "uppercase",
            letterSpacing: 4,
            marginBottom: 12,
          }}
        >
          Loved by Pet Owners
        </div>
        <div style={{ fontSize: 44, fontWeight: 800, color: "#fff" }}>
          What our community says
        </div>
      </div>

      {/* Testimonials row */}
      <div style={{ display: "flex", gap: 32, width: "100%" }}>
        {testimonials.map((t, i) => {
          const delay = 10 + i * 15;
          const cardScale = spring({
            fps,
            frame: Math.max(0, frame - delay),
            config: { damping: 100, stiffness: 180 },
          });

          return (
            <div
              key={i}
              style={{
                transform: `scale(${cardScale})`,
                flex: 1,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 24,
                padding: "36px 32px",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Stars */}
              <div style={{ fontSize: 22, marginBottom: 16, color: "#fbbf24" }}>
                {"★".repeat(t.stars)}
              </div>

              {/* Quote */}
              <div
                style={{
                  fontSize: 19,
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.6,
                  marginBottom: 24,
                  fontStyle: "italic",
                }}
              >
                "{t.quote}"
              </div>

              {/* Author */}
              <div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 4,
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {t.pet}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
