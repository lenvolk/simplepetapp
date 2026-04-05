import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CatRidingDog } from "../components/CatRidingDog";

const features = [
  {
    icon: "🔍",
    title: "Smart Search",
    desc: "Filter by pet type, venue type, location & amenities",
    color: "#ec4899",
  },
  {
    icon: "⭐",
    title: "Trusted Reviews",
    desc: "Community ratings with photos from real pet owners",
    color: "#a855f7",
  },
  {
    icon: "📅",
    title: "Easy Booking",
    desc: "Reserve time slots & manage all your visits",
    color: "#3b82f6",
  },
  {
    icon: "🐾",
    title: "Pet Profiles",
    desc: "Add your pets so venues know who's coming",
    color: "#10b981",
  },
];

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingOpacity = interpolate(frame, [0, 20], [0, 1], {
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
        padding: "60px 100px",
      }}
    >
      {/* Heading */}
      <div
        style={{
          opacity: headingOpacity,
          textAlign: "center",
          marginBottom: 64,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#a855f7",
            textTransform: "uppercase",
            letterSpacing: 4,
            marginBottom: 12,
          }}
        >
          Key Features
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "#ffffff",
          }}
        >
          Everything you need in{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #ec4899, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            one place
          </span>
        </div>
      </div>

      {/* Feature grid */}
      <div
        style={{
          display: "flex",
          gap: 32,
          width: "100%",
          justifyContent: "center",
        }}
      >
        {features.map((feature, i) => {
          const delay = 20 + i * 20;
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
                width: 370,
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 24,
                padding: "40px 32px",
                textAlign: "center",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 20,
                  background: `${feature.color}22`,
                  border: `2px solid ${feature.color}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 40,
                  margin: "0 auto 24px",
                }}
              >
                {feature.icon}
              </div>

              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: 12,
                }}
              >
                {feature.title}
              </div>

              <div
                style={{
                  fontSize: 17,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.5,
                }}
              >
                {feature.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* Happy friends cruising below the feature cards */}
      <CatRidingDog enterAt={70} direction="left-to-right" bottom={30} scale={0.85} />
    </AbsoluteFill>
  );
};
