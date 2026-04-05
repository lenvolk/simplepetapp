import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Cinematic text reveal — each word slides up with stagger and blur clears.
 */
export const KineticText: React.FC<{
  text: string;
  startFrame: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  gradient?: string;
  align?: "left" | "center" | "right";
  staggerFrames?: number;
  lineHeight?: number;
}> = ({
  text,
  startFrame,
  fontSize = 52,
  color = "#ffffff",
  fontWeight = 800,
  gradient,
  align = "center",
  staggerFrames = 4,
  lineHeight = 1.2,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent:
          align === "center"
            ? "center"
            : align === "right"
              ? "flex-end"
              : "flex-start",
        gap: `0 ${fontSize * 0.25}px`,
        lineHeight,
        overflow: "hidden",
      }}
    >
      {words.map((word, i) => {
        const wordStart = startFrame + i * staggerFrames;
        const progress = spring({
          fps,
          frame: Math.max(0, frame - wordStart),
          config: { damping: 40, stiffness: 120, mass: 0.8 },
        });

        const y = interpolate(progress, [0, 1], [60, 0]);
        const opacity = interpolate(progress, [0, 0.4, 1], [0, 0.5, 1]);
        const blur = interpolate(progress, [0, 1], [8, 0]);

        const style: React.CSSProperties = {
          fontSize,
          fontWeight,
          transform: `translateY(${y}px)`,
          opacity,
          filter: `blur(${blur}px)`,
          fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
          ...(gradient
            ? {
                background: gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }
            : { color }),
        };

        return (
          <span key={i} style={style}>
            {word}
          </span>
        );
      })}
    </div>
  );
};

/**
 * Typewriter effect for smaller text.
 */
export const TypewriterText: React.FC<{
  text: string;
  startFrame: number;
  fontSize?: number;
  color?: string;
  speed?: number;
}> = ({ text, startFrame, fontSize = 24, color = "rgba(255,255,255,0.7)", speed = 1.5 }) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const charCount = Math.min(Math.floor(elapsed * speed), text.length);
  const visible = text.slice(0, charCount);
  const cursorOpacity = Math.sin(frame * 0.3) > 0 ? 1 : 0;

  return (
    <div
      style={{
        fontSize,
        color,
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
        fontWeight: 400,
        letterSpacing: 1,
      }}
    >
      {visible}
      {charCount < text.length && (
        <span style={{ opacity: cursorOpacity, color: "#ec4899" }}>|</span>
      )}
    </div>
  );
};
