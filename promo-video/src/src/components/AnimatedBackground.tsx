import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  random,
} from "remotion";

/**
 * Continuously animated background with drifting orbs, moving gradient,
 * and floating particles — runs for the entire video duration.
 */
export const AnimatedBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Slowly shifting gradient hue
  const gradAngle = interpolate(frame, [0, 900], [135, 225]);
  const hueShift1 = interpolate(frame, [0, 900], [260, 310]);
  const hueShift2 = interpolate(frame, [0, 900], [280, 340]);

  // Large floating orbs (slow, ambient)
  const orbs = Array.from({ length: 5 }, (_, i) => {
    const seed = `orb-${i}`;
    const baseX = random(seed + "x") * width;
    const baseY = random(seed + "y") * height;
    const speed = 0.3 + random(seed + "s") * 0.5;
    const radius = 150 + random(seed + "r") * 250;
    const hue = 280 + random(seed + "h") * 60;
    const x = baseX + Math.sin(frame * speed * 0.02) * 120;
    const y = baseY + Math.cos(frame * speed * 0.015) * 80;
    return { x, y, radius, hue };
  });

  // Tiny floating particles
  const particles = Array.from({ length: 30 }, (_, i) => {
    const seed = `particle-${i}`;
    const startX = random(seed + "x") * width;
    const speed = 0.5 + random(seed + "s") * 1.5;
    const size = 2 + random(seed + "sz") * 4;
    const drift = Math.sin(frame * 0.03 + random(seed + "d") * 10) * 40;
    // Continuous upward float, wrapping around
    const yTravel = (frame * speed) % (height + 100);
    const y = height + 50 - yTravel;
    const x = startX + drift;
    const opacity = interpolate(
      y,
      [0, height * 0.5, height],
      [0, 0.5, 0.1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    return { x, y, size, opacity };
  });

  return (
    <AbsoluteFill>
      {/* Base gradient — continuously rotating */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(${gradAngle}deg, 
            hsl(${hueShift1}, 30%, 6%) 0%, 
            hsl(${hueShift2}, 40%, 10%) 40%, 
            hsl(${hueShift1 + 20}, 25%, 7%) 100%)`,
        }}
      />

      {/* Floating orbs with blur */}
      {orbs.map((orb, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: orb.x - orb.radius / 2,
            top: orb.y - orb.radius / 2,
            width: orb.radius,
            height: orb.radius,
            borderRadius: "50%",
            background: `radial-gradient(circle, hsla(${orb.hue}, 60%, 40%, 0.12) 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: `rgba(236, 200, 255, ${p.opacity})`,
          }}
        />
      ))}

      {/* Subtle noise overlay for texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-conic-gradient(rgba(255,255,255,0.01) 0%, transparent 0.5%)",
          opacity: 0.5,
        }}
      />
    </AbsoluteFill>
  );
};
