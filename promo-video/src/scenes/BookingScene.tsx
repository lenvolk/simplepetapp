import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const steps = [
  { num: "1", label: "Choose a Venue", icon: "🏪", color: "#ec4899" },
  { num: "2", label: "Pick Date & Time", icon: "📅", color: "#a855f7" },
  { num: "3", label: "Add Your Pets", icon: "🐕", color: "#3b82f6" },
  { num: "4", label: "Confirm Booking!", icon: "✅", color: "#10b981" },
];

export const BookingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0f0a1a 0%, #1a0d2e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* Heading */}
      <div
        style={{
          opacity: headingOpacity,
          textAlign: "center",
          marginBottom: 80,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#3b82f6",
            textTransform: "uppercase",
            letterSpacing: 4,
            marginBottom: 12,
          }}
        >
          How It Works
        </div>
        <div style={{ fontSize: 48, fontWeight: 800, color: "#fff" }}>
          Book in{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #ec4899, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            4 simple steps
          </span>
        </div>
      </div>

      {/* Steps row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        {steps.map((step, i) => {
          const delay = 15 + i * 22;
          const stepScale = spring({
            fps,
            frame: Math.max(0, frame - delay),
            config: { damping: 80, stiffness: 160 },
          });

          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div
                style={{
                  transform: `scale(${stepScale})`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 260,
                }}
              >
                {/* Step circle */}
                <div
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: "50%",
                    background: `${step.color}22`,
                    border: `3px solid ${step.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 50,
                    marginBottom: 20,
                    boxShadow: `0 0 40px ${step.color}33`,
                  }}
                >
                  {step.icon}
                </div>

                {/* Step number */}
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: step.color,
                    marginBottom: 6,
                  }}
                >
                  STEP {step.num}
                </div>

                {/* Step label */}
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  {step.label}
                </div>
              </div>

              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <div
                  style={{
                    opacity: interpolate(
                      frame,
                      [delay + 15, delay + 25],
                      [0, 0.5],
                      {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }
                    ),
                    fontSize: 28,
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  →
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
