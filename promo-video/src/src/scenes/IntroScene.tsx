import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CatRidingDog } from "../components/CatRidingDog";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo scale spring animation
  const logoScale = spring({
    fps,
    frame,
    config: { damping: 120, stiffness: 200 },
  });

  // Tagline fade in
  const taglineOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineY = interpolate(frame, [30, 50], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle background glow pulse
  const glowSize = interpolate(frame, [0, 60, 120], [300, 400, 350], {
    extrapolateRight: "clamp",
  });

  // Paw prints appearing
  const paw1Opacity = interpolate(frame, [60, 75], [0, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const paw2Opacity = interpolate(frame, [75, 90], [0, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0a1a 0%, #1a0d2e 50%, #0f0a1a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* Radial glow behind logo */}
      <div
        style={{
          position: "absolute",
          width: glowSize,
          height: glowSize,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(219, 39, 119, 0.3) 0%, rgba(147, 51, 234, 0.15) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Decorative paw prints */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 300,
          fontSize: 80,
          opacity: paw1Opacity,
          transform: "rotate(-25deg)",
        }}
      >
        🐾
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 200,
          right: 350,
          fontSize: 60,
          opacity: paw2Opacity,
          transform: "rotate(15deg)",
        }}
      >
        🐾
      </div>

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "linear-gradient(135deg, #db2777, #9333ea)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44,
            boxShadow: "0 8px 32px rgba(219, 39, 119, 0.4)",
          }}
        >
          🐕
        </div>
        <span
          style={{
            fontSize: 72,
            fontWeight: 800,
            background: "linear-gradient(90deg, #ec4899, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -2,
          }}
        >
          MyPetVenues
        </span>
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          fontSize: 32,
          color: "rgba(255, 255, 255, 0.85)",
          fontWeight: 400,
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}
      >
        Discover · Review · Book Pet-Friendly Venues
      </div>

      {/* Happy cat riding a dog across the intro */}
      <CatRidingDog enterAt={65} direction="left-to-right" bottom={80} scale={1.1} />
    </AbsoluteFill>
  );
};
