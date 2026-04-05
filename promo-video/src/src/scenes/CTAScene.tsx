import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CatRidingDog } from "../components/CatRidingDog";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    fps,
    frame,
    config: { damping: 100, stiffness: 150 },
  });

  const ctaOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaY = interpolate(frame, [20, 40], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const urlOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Animated glow
  const glowSize = interpolate(frame, [0, 45, 90], [300, 500, 400], {
    extrapolateRight: "clamp",
  });

  // Pulse effect on the button
  const buttonGlow = interpolate(
    frame % 30,
    [0, 15, 30],
    [0.4, 0.7, 0.4],
    {
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0a1a 0%, #1a0d2e 50%, #0f0a1a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: glowSize,
          height: glowSize,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(219, 39, 119, 0.25) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          display: "flex",
          alignItems: "center",
          gap: 18,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: "linear-gradient(135deg, #db2777, #9333ea)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 38,
            boxShadow: "0 8px 32px rgba(219, 39, 119, 0.4)",
          }}
        >
          🐕
        </div>
        <span
          style={{
            fontSize: 56,
            fontWeight: 800,
            background: "linear-gradient(90deg, #ec4899, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -1,
          }}
        >
          MyPetVenues
        </span>
      </div>

      {/* CTA text */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: 12,
          }}
        >
          Start discovering pet-friendly venues today.
        </div>
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Join thousands of pet owners who already found their favorite spots.
        </div>
      </div>

      {/* CTA Button */}
      <div
        style={{
          opacity: ctaOpacity,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #db2777, #9333ea)",
            padding: "20px 56px",
            borderRadius: 16,
            fontSize: 24,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: 0.5,
            boxShadow: `0 8px 40px rgba(219, 39, 119, ${buttonGlow})`,
          }}
        >
          Get Started — It's Free
        </div>
      </div>

      {/* URL */}
      <div
        style={{
          opacity: urlOpacity,
          marginTop: 28,
          fontSize: 20,
          color: "rgba(255,255,255,0.4)",
          letterSpacing: 2,
        }}
      >
        mypetvenues.com
      </div>

      {/* Grand finale — happy duo runs across to close the show */}
      <CatRidingDog enterAt={15} direction="left-to-right" bottom={50} scale={1.2} />
    </AbsoluteFill>
  );
};
