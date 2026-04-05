import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Sequence,
} from "remotion";

const problems = [
  { icon: "🔍", text: "Generic directories don't show pet policies" },
  { icon: "📱", text: "Social media groups lack searchability" },
  { icon: "❌", text: "No standardized pet amenity information" },
  { icon: "📅", text: "No booking system for pet venues" },
];

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();

  const headingOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headingY = interpolate(frame, [0, 20], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0f0a1a 0%, #1c1028 100%)",
        padding: "80px 120px",
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* Section heading */}
      <div
        style={{
          opacity: headingOpacity,
          transform: `translateY(${headingY}px)`,
          marginBottom: 60,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#ec4899",
            textTransform: "uppercase",
            letterSpacing: 4,
            marginBottom: 12,
          }}
        >
          The Problem
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.2,
          }}
        >
          Finding pet-friendly places
          <br />
          <span style={{ color: "rgba(255,255,255,0.5)" }}>
            shouldn't be this hard.
          </span>
        </div>
      </div>

      {/* Problem cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {problems.map((problem, i) => {
          const delay = 25 + i * 18;
          const cardOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const cardX = interpolate(frame, [delay, delay + 15], [-60, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                opacity: cardOpacity,
                transform: `translateX(${cardX}px)`,
                display: "flex",
                alignItems: "center",
                gap: 24,
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 16,
                padding: "24px 36px",
                backdropFilter: "blur(10px)",
              }}
            >
              <span style={{ fontSize: 40 }}>{problem.icon}</span>
              <span
                style={{
                  fontSize: 26,
                  color: "rgba(255, 255, 255, 0.9)",
                  fontWeight: 500,
                }}
              >
                {problem.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Frustrated emoji */}
      <Sequence from={90}>
        <div
          style={{
            position: "absolute",
            right: 160,
            bottom: 120,
            fontSize: 120,
            opacity: interpolate(frame - 90, [0, 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          😤
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
