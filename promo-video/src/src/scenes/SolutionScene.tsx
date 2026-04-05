import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CatRidingDog } from "../components/CatRidingDog";

export const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const phoneScale = spring({
    fps,
    frame: Math.max(0, frame - 20),
    config: { damping: 100, stiffness: 150 },
  });

  const checkmarks = [
    { text: "Centralized pet venue directory", delay: 40 },
    { text: "Community-driven reviews", delay: 55 },
    { text: "One-click booking", delay: 70 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a0d2e 0%, #0f172a 50%, #1a0d2e 100%)",
        display: "flex",
        alignItems: "center",
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
        padding: "0 120px",
      }}
    >
      {/* Left side - text */}
      <div style={{ flex: 1, opacity: textOpacity }}>
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#34d399",
            textTransform: "uppercase",
            letterSpacing: 4,
            marginBottom: 16,
          }}
        >
          The Solution
        </div>
        <div
          style={{
            fontSize: 50,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.2,
            marginBottom: 48,
          }}
        >
          One platform for
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #ec4899, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            everything pet-friendly.
          </span>
        </div>

        {/* Checkmarks */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {checkmarks.map((item, i) => {
            const itemOpacity = interpolate(
              frame,
              [item.delay, item.delay + 12],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const itemX = interpolate(
              frame,
              [item.delay, item.delay + 12],
              [-30, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  opacity: itemOpacity,
                  transform: `translateX(${itemX}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #10b981, #34d399)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  ✓
                </div>
                <span
                  style={{
                    fontSize: 26,
                    color: "rgba(255,255,255,0.9)",
                    fontWeight: 500,
                  }}
                >
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right side - mock phone/app preview */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          transform: `scale(${phoneScale})`,
        }}
      >
        <div
          style={{
            width: 380,
            height: 660,
            borderRadius: 40,
            background: "linear-gradient(180deg, #1e1535 0%, #2d1f4e 100%)",
            border: "3px solid rgba(255,255,255,0.15)",
            boxShadow:
              "0 20px 80px rgba(219, 39, 119, 0.2), 0 0 0 1px rgba(255,255,255,0.05)",
            padding: "48px 24px 24px",
            overflow: "hidden",
          }}
        >
          {/* Status bar mockup */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 20,
              fontSize: 13,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            <span>9:41</span>
            <span>●●●</span>
          </div>

          {/* Search bar mockup */}
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 24,
            }}
          >
            <span style={{ fontSize: 18 }}>🔍</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}>
              Find pet-friendly venues...
            </span>
          </div>

          {/* Mini venue cards */}
          {[
            { name: "Paws & Coffee", type: "Cafe", rating: "4.8", emoji: "☕" },
            { name: "Bark Central Park", type: "Park", rating: "4.9", emoji: "🌳" },
            { name: "Pet Paradise Hotel", type: "Hotel", rating: "4.7", emoji: "🏨" },
          ].map((venue, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: 14,
                padding: "16px",
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #db2777, #9333ea)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                }}
              >
                {venue.emoji}
              </div>
              <div>
                <div
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {venue.name}
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 13,
                    display: "flex",
                    gap: 8,
                  }}
                >
                  <span>{venue.type}</span>
                  <span>⭐ {venue.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Happy duo trotting right-to-left */}
      <CatRidingDog enterAt={50} direction="right-to-left" bottom={40} scale={0.9} />
    </AbsoluteFill>
  );
};
