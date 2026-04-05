import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/**
 * Animated happy cat riding a dog — they bounce joyfully across the frame.
 * Place as an overlay in any scene.
 */
export const CatRidingDog: React.FC<{
  /** Frame offset within the scene when the duo enters */
  enterAt?: number;
  /** Horizontal direction: "left-to-right" or "right-to-left" */
  direction?: "left-to-right" | "right-to-left";
  /** Vertical baseline position (distance from bottom in px) */
  bottom?: number;
  /** Overall scale */
  scale?: number;
}> = ({
  enterAt = 0,
  direction = "left-to-right",
  bottom = 60,
  scale = 1,
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const localFrame = Math.max(0, frame - enterAt);

  // Horizontal travel across the screen
  const travelDuration = 90; // 3 seconds at 30fps
  const rawX = interpolate(localFrame, [0, travelDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const xPercent = direction === "left-to-right" ? rawX : 1 - rawX;
  const xPos = interpolate(xPercent, [0, 1], [-200, width + 100]);

  // Happy bounce (sinusoidal)
  const bounceHeight = 22;
  const bounceSpeed = 0.35;
  const bounce = Math.abs(Math.sin(localFrame * bounceSpeed)) * bounceHeight;

  // Dog's body tilt while trotting
  const tilt = Math.sin(localFrame * bounceSpeed) * 4;

  // Cat's independent little wiggle (slightly offset frequency)
  const catWiggle = Math.sin(localFrame * 0.45) * 6;
  const catBounce = Math.abs(Math.sin(localFrame * bounceSpeed + 0.5)) * 6;

  // Tail wag
  const tailWag = Math.sin(localFrame * 0.7) * 25;

  // Sparkle / hearts appearing periodically
  const heartBeat = Math.sin(localFrame * 0.25);
  const heartOpacity = interpolate(heartBeat, [-1, 0, 1], [0, 0.2, 1]);
  const heartScale = interpolate(heartBeat, [-1, 0, 1], [0.5, 0.8, 1.1]);

  // Entrance fade
  const opacity = interpolate(localFrame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit fade at end of travel
  const exitOpacity = interpolate(
    localFrame,
    [travelDuration - 12, travelDuration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const flipX = direction === "right-to-left" ? "scaleX(-1)" : "scaleX(1)";

  return (
    <div
      style={{
        position: "absolute",
        left: xPos,
        bottom: bottom + bounce,
        opacity: opacity * exitOpacity,
        transform: `scale(${scale}) ${flipX}`,
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      {/* Floating hearts */}
      <div
        style={{
          position: "absolute",
          top: -50,
          left: 40,
          fontSize: 28,
          opacity: heartOpacity,
          transform: `scale(${heartScale}) translateY(${-heartBeat * 8}px)`,
        }}
      >
        💖
      </div>
      <div
        style={{
          position: "absolute",
          top: -35,
          left: 95,
          fontSize: 20,
          opacity: heartOpacity * 0.7,
          transform: `scale(${heartScale * 0.8}) translateY(${-heartBeat * 12}px)`,
        }}
      >
        ✨
      </div>
      <div
        style={{
          position: "absolute",
          top: -55,
          left: 10,
          fontSize: 22,
          opacity: interpolate(Math.sin(localFrame * 0.18), [-1, 1], [0, 1]),
          transform: `translateY(${Math.sin(localFrame * 0.2) * -6}px)`,
        }}
      >
        💕
      </div>

      {/* === DOG === */}
      <div
        style={{
          position: "relative",
          transform: `rotate(${tilt}deg)`,
          width: 160,
          height: 100,
        }}
      >
        {/* Dog body */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 20,
            width: 110,
            height: 55,
            borderRadius: "50% 50% 45% 45%",
            background: "linear-gradient(180deg, #d4a76a 0%, #c08840 100%)",
            boxShadow: "inset 0 -4px 8px rgba(0,0,0,0.15)",
          }}
        />

        {/* Dog head */}
        <div
          style={{
            position: "absolute",
            bottom: 25,
            left: -8,
            width: 60,
            height: 52,
            borderRadius: "55% 50% 45% 50%",
            background: "linear-gradient(160deg, #d4a76a 0%, #b87830 100%)",
          }}
        >
          {/* Dog ear (floppy) */}
          <div
            style={{
              position: "absolute",
              top: -6,
              left: 2,
              width: 22,
              height: 30,
              borderRadius: "50% 50% 40% 60%",
              background: "#a06828",
              transform: `rotate(${-15 + tilt * 0.5}deg)`,
            }}
          />
          {/* Dog eye */}
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 14,
              width: 10,
              height: 11,
              borderRadius: "50%",
              background: "#2d1b0e",
            }}
          >
            {/* Eye shine */}
            <div
              style={{
                position: "absolute",
                top: 2,
                left: 2,
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#fff",
              }}
            />
          </div>
          {/* Dog nose */}
          <div
            style={{
              position: "absolute",
              top: 26,
              left: 4,
              width: 14,
              height: 10,
              borderRadius: "50%",
              background: "#2d1b0e",
            }}
          />
          {/* Happy open mouth (smile) */}
          <div
            style={{
              position: "absolute",
              top: 34,
              left: 8,
              width: 20,
              height: 10,
              borderRadius: "0 0 50% 50%",
              background: "#e85d75",
              overflow: "hidden",
            }}
          >
            {/* Tongue */}
            <div
              style={{
                position: "absolute",
                bottom: -4,
                left: 5,
                width: 10,
                height: 12,
                borderRadius: "0 0 50% 50%",
                background: "#ff7b93",
                transform: `translateY(${Math.sin(localFrame * 0.3) * 2}px)`,
              }}
            />
          </div>
        </div>

        {/* Dog tail (wagging!) */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            right: -10,
            width: 8,
            height: 40,
            borderRadius: 8,
            background: "linear-gradient(0deg, #c08840, #d4a76a)",
            transformOrigin: "bottom center",
            transform: `rotate(${-40 + tailWag}deg)`,
          }}
        />

        {/* Dog legs (animated trotting) */}
        {[0, 1, 2, 3].map((leg) => {
          const legOffset = leg < 2 ? 0 : Math.PI; // front/back pair offset
          const leftPos = leg % 2 === 0 ? 30 : 105;
          const legSwing =
            Math.sin(localFrame * bounceSpeed * 2 + legOffset) * 18;
          return (
            <div
              key={leg}
              style={{
                position: "absolute",
                bottom: -22,
                left: leftPos,
                width: 10,
                height: 26,
                borderRadius: "4px 4px 6px 6px",
                background:
                  leg < 2
                    ? "linear-gradient(180deg, #c08840, #a06828)"
                    : "linear-gradient(180deg, #b87830, #905820)",
                transformOrigin: "top center",
                transform: `rotate(${legSwing}deg)`,
              }}
            />
          );
        })}

        {/* === CAT (riding on top!) === */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 35,
            transform: `rotate(${catWiggle * 0.4}deg) translateY(${-catBounce}px)`,
          }}
        >
          {/* Cat body */}
          <div
            style={{
              position: "relative",
              width: 55,
              height: 35,
              borderRadius: "50% 55% 45% 40%",
              background: "linear-gradient(180deg, #6b7280 0%, #4b5563 100%)",
              boxShadow: "inset 0 -3px 6px rgba(0,0,0,0.15)",
            }}
          >
            {/* Cat head */}
            <div
              style={{
                position: "absolute",
                top: -22,
                left: -6,
                width: 38,
                height: 34,
                borderRadius: "45% 45% 40% 40%",
                background:
                  "linear-gradient(160deg, #6b7280 0%, #4b5563 100%)",
              }}
            >
              {/* Cat ears (pointy triangles) */}
              <div
                style={{
                  position: "absolute",
                  top: -12,
                  left: 0,
                  width: 0,
                  height: 0,
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderBottom: "14px solid #6b7280",
                  transform: "rotate(-8deg)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: -12,
                  right: 2,
                  width: 0,
                  height: 0,
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderBottom: "14px solid #6b7280",
                  transform: "rotate(8deg)",
                }}
              />
              {/* Inner ears (pink) */}
              <div
                style={{
                  position: "absolute",
                  top: -8,
                  left: 3,
                  width: 0,
                  height: 0,
                  borderLeft: "3px solid transparent",
                  borderRight: "3px solid transparent",
                  borderBottom: "8px solid #f9a8c9",
                  transform: "rotate(-8deg)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: -8,
                  right: 5,
                  width: 0,
                  height: 0,
                  borderLeft: "3px solid transparent",
                  borderRight: "3px solid transparent",
                  borderBottom: "8px solid #f9a8c9",
                  transform: "rotate(8deg)",
                }}
              />
              {/* Cat eyes (happy closed arcs = ^_^ ) */}
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: 6,
                  width: 10,
                  height: 6,
                  borderTop: "3px solid #1f2937",
                  borderRadius: "50% 50% 0 0",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 6,
                  width: 10,
                  height: 6,
                  borderTop: "3px solid #1f2937",
                  borderRadius: "50% 50% 0 0",
                }}
              />
              {/* Cat nose (tiny pink triangle) */}
              <div
                style={{
                  position: "absolute",
                  top: 18,
                  left: 14,
                  width: 0,
                  height: 0,
                  borderLeft: "4px solid transparent",
                  borderRight: "4px solid transparent",
                  borderTop: "5px solid #f9a8c9",
                }}
              />
              {/* Cat whiskers */}
              {[-1, 1].map((side) => (
                <div key={side}>
                  <div
                    style={{
                      position: "absolute",
                      top: 20,
                      left: side === -1 ? -10 : undefined,
                      right: side === 1 ? -10 : undefined,
                      width: 16,
                      height: 1.5,
                      background: "rgba(255,255,255,0.4)",
                      transform: `rotate(${side * -5}deg)`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 23,
                      left: side === -1 ? -8 : undefined,
                      right: side === 1 ? -8 : undefined,
                      width: 14,
                      height: 1.5,
                      background: "rgba(255,255,255,0.3)",
                      transform: `rotate(${side * 5}deg)`,
                    }}
                  />
                </div>
              ))}
              {/* Happy blush cheeks */}
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 1,
                  width: 8,
                  height: 5,
                  borderRadius: "50%",
                  background: "rgba(249, 168, 201, 0.5)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 1,
                  width: 8,
                  height: 5,
                  borderRadius: "50%",
                  background: "rgba(249, 168, 201, 0.5)",
                }}
              />
            </div>

            {/* Cat tail (curving up happily) */}
            <div
              style={{
                position: "absolute",
                top: -10,
                right: -18,
                width: 8,
                height: 35,
                borderRadius: "8px 8px 4px 4px",
                background:
                  "linear-gradient(0deg, #4b5563, #6b7280)",
                transformOrigin: "bottom center",
                transform: `rotate(${30 + Math.sin(localFrame * 0.4) * 20}deg)`,
              }}
            >
              {/* Tail tip */}
              <div
                style={{
                  position: "absolute",
                  top: -6,
                  left: -2,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#4b5563",
                }}
              />
            </div>

            {/* Cat paws (gripping the dog) */}
            <div
              style={{
                position: "absolute",
                bottom: -6,
                left: 5,
                width: 12,
                height: 10,
                borderRadius: "0 0 50% 50%",
                background: "#4b5563",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -6,
                right: 5,
                width: 12,
                height: 10,
                borderRadius: "0 0 50% 50%",
                background: "#4b5563",
              }}
            />
          </div>
        </div>
      </div>

      {/* Dust puffs from running */}
      {[0, 1, 2].map((puff) => {
        const puffFrame = (localFrame - puff * 8) % 24;
        const puffOpacity =
          puffFrame >= 0
            ? interpolate(puffFrame, [0, 6, 18], [0.6, 0.3, 0], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
              })
            : 0;
        const puffScale = interpolate(puffFrame, [0, 18], [0.4, 1.2], {
          extrapolateRight: "clamp",
          extrapolateLeft: "clamp",
        });
        return (
          <div
            key={puff}
            style={{
              position: "absolute",
              bottom: -10 - puff * 4,
              right: 130 + puff * 15,
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.25)",
              opacity: puffOpacity,
              transform: `scale(${puffScale})`,
            }}
          />
        );
      })}
    </div>
  );
};
