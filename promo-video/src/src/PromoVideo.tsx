import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { KineticText, TypewriterText } from "./components/KineticText";
import { CatRidingDog } from "./components/CatRidingDog";

/**
 * 30-second cinematic promo — one continuous flowing composition.
 * No discrete "slides" — elements layer, overlap, and animate fluidly.
 */
export const PromoVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // ─── Global camera: slow zoom + drift throughout ───
  const cameraZoom = interpolate(frame, [0, 900], [1, 1.08], {
    extrapolateRight: "clamp",
  });
  const cameraPanX = Math.sin(frame * 0.005) * 15;
  const cameraPanY = Math.cos(frame * 0.004) * 10;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* ── Persistent animated background ── */}
      <AnimatedBackground />

      {/* ── Camera wrapper — everything inside drifts/zooms ── */}
      <AbsoluteFill
        style={{
          transform: `scale(${cameraZoom}) translate(${cameraPanX}px, ${cameraPanY}px)`,
          transformOrigin: "center center",
        }}
      >
        {/* ═══════════════════════════════════════════════════
            BEAT 1: LOGO ENTRANCE (frames 0–100)
            Cinematic zoom-in with particles
         ═══════════════════════════════════════════════════ */}
        <Sequence from={0} durationInFrames={130}>
          <LogoEntrance />
        </Sequence>

        {/* ═══════════════════════════════════════════════════
            BEAT 2: PROBLEM STATEMENT (frames 80–230)
            Overlaps with logo fade-out for continuous flow
         ═══════════════════════════════════════════════════ */}
        <Sequence from={80} durationInFrames={180}>
          <ProblemBeat />
        </Sequence>

        {/* ═══════════════════════════════════════════════════
            BEAT 3: SOLUTION REVEAL (frames 220–400)
            Phone mockup flies in, text streams
         ═══════════════════════════════════════════════════ */}
        <Sequence from={220} durationInFrames={200}>
          <SolutionBeat />
        </Sequence>

        {/* ═══════════════════════════════════════════════════
            BEAT 4: FEATURE SHOWCASE (frames 370–570)
            Cards orbit in, icons pulse
         ═══════════════════════════════════════════════════ */}
        <Sequence from={370} durationInFrames={220}>
          <FeaturesBeat />
        </Sequence>

        {/* ═══════════════════════════════════════════════════
            BEAT 5: VENUE CAROUSEL (frames 540–700)
            Scrolling venue cards like a real feed
         ═══════════════════════════════════════════════════ */}
        <Sequence from={540} durationInFrames={180}>
          <VenueCarousel />
        </Sequence>

        {/* ═══════════════════════════════════════════════════
            BEAT 6: SOCIAL PROOF (frames 680–800)
            Quotes fly in, star ratings animate
         ═══════════════════════════════════════════════════ */}
        <Sequence from={680} durationInFrames={130}>
          <SocialProofBeat />
        </Sequence>

        {/* ═══════════════════════════════════════════════════
            BEAT 7: CTA FINALE (frames 780–900)
            Everything converges, logo pulses
         ═══════════════════════════════════════════════════ */}
        <Sequence from={780} durationInFrames={120}>
          <CTAFinale />
        </Sequence>
      </AbsoluteFill>

      {/* ── Cat riding dog — persistent across the whole video ── */}
      {/* They trot across at key moments */}
      <Sequence from={40} durationInFrames={100}>
        <CatRidingDog enterAt={0} direction="left-to-right" bottom={70} scale={0.9} />
      </Sequence>
      <Sequence from={350} durationInFrames={100}>
        <CatRidingDog enterAt={0} direction="right-to-left" bottom={50} scale={1.0} />
      </Sequence>
      <Sequence from={650} durationInFrames={100}>
        <CatRidingDog enterAt={0} direction="left-to-right" bottom={60} scale={0.85} />
      </Sequence>
      <Sequence from={810} durationInFrames={90}>
        <CatRidingDog enterAt={0} direction="right-to-left" bottom={80} scale={1.2} />
      </Sequence>
    </AbsoluteFill>
  );
};

/* ─────────────────────────────────────────────────────────
   BEAT COMPONENTS (inline — each is a flowing segment)
   ───────────────────────────────────────────────────────── */

const LogoEntrance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo scales from tiny to normal with overshoot
  const logoScale = spring({
    fps,
    frame,
    config: { damping: 12, stiffness: 80, mass: 0.8 },
  });
  const logoRotate = interpolate(frame, [0, 30], [-5, 0], {
    extrapolateRight: "clamp",
  });

  // Radial burst
  const burstScale = interpolate(frame, [5, 40], [0, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const burstOpacity = interpolate(frame, [5, 25, 40], [0, 0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit: zoom past camera
  const exitZoom = interpolate(frame, [90, 130], [1, 2.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(frame, [90, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
        opacity: exitOpacity,
        transform: `scale(${exitZoom})`,
      }}
    >
      {/* Radial burst */}
      <div
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: "3px solid rgba(219, 39, 119, 0.4)",
          transform: `scale(${burstScale})`,
          opacity: burstOpacity,
        }}
      />

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale}) rotate(${logoRotate}deg)`,
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: 22,
            background: "linear-gradient(135deg, #db2777, #9333ea)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
            boxShadow: "0 12px 48px rgba(219, 39, 119, 0.5)",
          }}
        >
          🐕
        </div>
        <span
          style={{
            fontSize: 80,
            fontWeight: 800,
            background: "linear-gradient(90deg, #ec4899, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -3,
          }}
        >
          MyPetVenues
        </span>
      </div>

      {/* Tagline streams in */}
      <TypewriterText
        text="Discover · Review · Book Pet-Friendly Venues"
        startFrame={25}
        fontSize={30}
        color="rgba(255,255,255,0.8)"
        speed={2}
      />
    </AbsoluteFill>
  );
};

const ProblemBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Whole beat fades in/out
  const fadeIn = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [140, 175], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scroll effect — content slides up slowly
  const scrollY = interpolate(frame, [0, 180], [80, -40], {
    extrapolateRight: "clamp",
  });

  const problems = [
    { icon: "🔍", text: "Generic directories ignore pet policies" },
    { icon: "📱", text: "Social media groups are chaos to search" },
    { icon: "❌", text: "No standardized pet amenity info" },
    { icon: "📅", text: "Zero booking systems for pet venues" },
  ];

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        transform: `translateY(${scrollY}px)`,
        display: "flex",
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
        padding: "100px 140px",
        flexDirection: "column",
      }}
    >
      <KineticText
        text="Finding pet-friendly places"
        startFrame={5}
        fontSize={58}
        fontWeight={800}
        align="left"
      />
      <KineticText
        text="shouldn't be this hard."
        startFrame={15}
        fontSize={58}
        fontWeight={800}
        color="rgba(255,255,255,0.4)"
        align="left"
      />

      <div style={{ marginTop: 50, display: "flex", flexDirection: "column", gap: 18 }}>
        {problems.map((p, i) => {
          const delay = 30 + i * 15;
          const slideProgress = spring({
            fps,
            frame: Math.max(0, frame - delay),
            config: { damping: 30, stiffness: 100 },
          });
          const x = interpolate(slideProgress, [0, 1], [-300, 0]);
          const opacity = interpolate(slideProgress, [0, 0.3, 1], [0, 0.5, 1]);
          const blur = interpolate(slideProgress, [0, 1], [12, 0]);

          return (
            <div
              key={i}
              style={{
                transform: `translateX(${x}px)`,
                opacity,
                filter: `blur(${blur}px)`,
                display: "flex",
                alignItems: "center",
                gap: 20,
                background: "rgba(255,30,60,0.06)",
                border: "1px solid rgba(255,80,100,0.15)",
                borderRadius: 14,
                padding: "18px 28px",
              }}
            >
              <span style={{ fontSize: 36 }}>{p.icon}</span>
              <span style={{ fontSize: 24, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
                {p.text}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const SolutionBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [160, 195], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phone flies in from the right
  const phoneX = spring({
    fps,
    frame: Math.max(0, frame - 10),
    config: { damping: 20, stiffness: 60 },
  });
  const phoneSlide = interpolate(phoneX, [0, 1], [500, 0]);

  // Phone floats gently
  const phoneFloat = Math.sin(frame * 0.05) * 8;

  // Continuous phone glow pulse
  const phoneShadow = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.15, 0.35]);

  const checkmarks = [
    "Centralized pet venue directory",
    "Community-driven reviews & photos",
    "One-click booking system",
  ];

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        display: "flex",
        alignItems: "center",
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
        padding: "0 140px",
      }}
    >
      {/* Left: text */}
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 10 }}>
          <KineticText
            text="One platform for"
            startFrame={5}
            fontSize={54}
            fontWeight={800}
            align="left"
          />
        </div>
        <div style={{ marginBottom: 44 }}>
          <KineticText
            text="everything pet-friendly."
            startFrame={12}
            fontSize={54}
            fontWeight={800}
            gradient="linear-gradient(90deg, #ec4899, #a855f7)"
            align="left"
          />
        </div>

        {checkmarks.map((text, i) => {
          const delay = 30 + i * 18;
          const prog = spring({
            fps,
            frame: Math.max(0, frame - delay),
            config: { damping: 25, stiffness: 100 },
          });
          const x = interpolate(prog, [0, 1], [-40, 0]);
          const opacity = interpolate(prog, [0, 1], [0, 1]);

          return (
            <div
              key={i}
              style={{
                transform: `translateX(${x}px)`,
                opacity,
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #10b981, #34d399)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  color: "#fff",
                  fontWeight: 700,
                  boxShadow: "0 4px 16px rgba(16, 185, 129, 0.3)",
                }}
              >
                ✓
              </div>
              <span style={{ fontSize: 24, color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>
                {text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Right: phone mockup slides in */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          transform: `translateX(${phoneSlide}px) translateY(${phoneFloat}px)`,
        }}
      >
        <div
          style={{
            width: 360,
            height: 640,
            borderRadius: 36,
            background: "linear-gradient(180deg, #1e1535 0%, #2d1f4e 100%)",
            border: "2px solid rgba(255,255,255,0.12)",
            boxShadow: `0 32px 80px rgba(219, 39, 119, ${phoneShadow}), 0 0 0 1px rgba(255,255,255,0.06)`,
            padding: "44px 22px 22px",
            overflow: "hidden",
          }}
        >
          {/* Notch */}
          <div
            style={{
              width: 120,
              height: 24,
              borderRadius: 12,
              background: "#0f0a1a",
              margin: "-20px auto 16px",
            }}
          />
          {/* Search bar */}
          <div
            style={{
              background: "rgba(255,255,255,0.07)",
              borderRadius: 10,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: 16 }}>🔍</span>
            <TypewriterText
              text="Dog-friendly cafes near me..."
              startFrame={40}
              fontSize={14}
              color="rgba(255,255,255,0.5)"
              speed={1.2}
            />
          </div>
          {/* Venue cards scroll up */}
          {[
            { name: "Paws & Coffee", type: "Cafe", rating: "4.8", emoji: "☕" },
            { name: "Bark Central Park", type: "Park", rating: "4.9", emoji: "🌳" },
            { name: "Pet Paradise Hotel", type: "Hotel", rating: "4.7", emoji: "🏨" },
            { name: "Whiskers Lounge", type: "Bar", rating: "4.6", emoji: "🍸" },
          ].map((v, i) => {
            const cardDelay = 55 + i * 12;
            const cardProg = spring({
              fps,
              frame: Math.max(0, frame - cardDelay),
              config: { damping: 20, stiffness: 80 },
            });
            const cardY = interpolate(cardProg, [0, 1], [80, 0]);
            return (
              <div
                key={i}
                style={{
                  opacity: cardProg,
                  transform: `translateY(${cardY}px)`,
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 12,
                  padding: "12px 14px",
                  marginBottom: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: "linear-gradient(135deg, #db2777, #9333ea)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                  }}
                >
                  {v.emoji}
                </div>
                <div>
                  <div style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>{v.name}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
                    {v.type} · ⭐ {v.rating}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const FeaturesBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [180, 215], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const features = [
    { icon: "🔍", title: "Smart Search", desc: "Filter by pet type, venue, location", color: "#ec4899" },
    { icon: "⭐", title: "Trusted Reviews", desc: "Photos & ratings from real owners", color: "#a855f7" },
    { icon: "📅", title: "Easy Booking", desc: "Reserve time slots instantly", color: "#3b82f6" },
    { icon: "🐾", title: "Pet Profiles", desc: "Venues know who's coming", color: "#10b981" },
  ];

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
        padding: "0 100px",
      }}
    >
      <div style={{ marginBottom: 60 }}>
        <KineticText
          text="Everything you need, one place."
          startFrame={5}
          fontSize={50}
          fontWeight={800}
          gradient="linear-gradient(90deg, #ec4899, #3b82f6)"
        />
      </div>

      <div style={{ display: "flex", gap: 28 }}>
        {features.map((f, i) => {
          // Each card flies in from its own direction with rotation
          const delay = 20 + i * 18;
          const prog = spring({
            fps,
            frame: Math.max(0, frame - delay),
            config: { damping: 18, stiffness: 80, mass: 0.7 },
          });
          const y = interpolate(prog, [0, 1], [120, 0]);
          const rotate = interpolate(prog, [0, 1], [8 - i * 4, 0]);
          const scale = interpolate(prog, [0, 0.5, 1], [0.8, 1.05, 1]);

          // Pulsing icon glow
          const glowPulse = interpolate(
            Math.sin(frame * 0.06 + i),
            [-1, 1],
            [0.2, 0.5]
          );

          return (
            <div
              key={i}
              style={{
                transform: `translateY(${y}px) rotate(${rotate}deg) scale(${scale})`,
                opacity: prog,
                width: 380,
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${f.color}33`,
                borderRadius: 22,
                padding: "36px 28px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 18,
                  background: `${f.color}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 38,
                  margin: "0 auto 20px",
                  boxShadow: `0 0 30px ${f.color}${Math.round(glowPulse * 255).toString(16).padStart(2, "0")}`,
                  border: `2px solid ${f.color}44`,
                }}
              >
                {f.icon}
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                {f.title}
              </div>
              <div style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}>
                {f.desc}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const VenueCarousel: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [145, 175], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const venues = [
    { name: "Paws & Coffee Lounge", type: "Cafe", rating: 4.8, emoji: "☕", grad: "#92400e, #b45309" },
    { name: "Bark Central Park", type: "Dog Park", rating: 4.9, emoji: "🌳", grad: "#065f46, #059669" },
    { name: "Pet Paradise Hotel", type: "Hotel", rating: 4.7, emoji: "🏨", grad: "#5b21b6, #7c3aed" },
    { name: "Whiskers & Tails Spa", type: "Grooming", rating: 4.6, emoji: "✂️", grad: "#9f1239, #e11d48" },
    { name: "Furry Friends Daycare", type: "DayCare", rating: 4.8, emoji: "🏠", grad: "#0e7490, #06b6d4" },
  ];

  // Continuous horizontal scroll
  const scrollX = interpolate(frame, [0, 180], [100, -1200], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ padding: "100px 140px 0", marginBottom: 48 }}>
        <KineticText
          text="Venues your pet will love"
          startFrame={3}
          fontSize={48}
          fontWeight={800}
          align="left"
        />
      </div>

      {/* Scrolling cards */}
      <div
        style={{
          display: "flex",
          gap: 28,
          transform: `translateX(${scrollX}px)`,
          padding: "0 140px",
        }}
      >
        {venues.map((v, i) => {
          // Each card has a subtle tilt while scrolling
          const tilt = Math.sin(frame * 0.04 + i * 2) * 2;
          const vertFloat = Math.sin(frame * 0.05 + i) * 5;

          return (
            <div
              key={i}
              style={{
                minWidth: 400,
                borderRadius: 22,
                overflow: "hidden",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                transform: `rotate(${tilt}deg) translateY(${vertFloat}px)`,
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              }}
            >
              <div
                style={{
                  height: 220,
                  background: `linear-gradient(135deg, ${v.grad})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 80,
                  position: "relative",
                }}
              >
                {v.emoji}
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    background: "rgba(0,0,0,0.45)",
                    backdropFilter: "blur(8px)",
                    padding: "5px 12px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  {v.type}
                </div>
              </div>
              <div style={{ padding: "20px 22px" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
                  {v.name}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#fbbf24", fontSize: 16 }}>
                    {"★".repeat(Math.floor(v.rating))}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 15 }}>
                    {v.rating}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const SocialProofBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [100, 125], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const quotes = [
    { text: "Finally, a platform that gets pet owners!", name: "Sarah M.", pet: "🐕 Golden Retriever mom" },
    { text: "Bookings increased 40% after listing here.", name: "Mike's Café", pet: "🏪 Venue owner" },
    { text: "My cat & I found our weekly hangout spot!", name: "Lisa R.", pet: "🐈 Cat parent" },
  ];

  // Counter animation
  const userCount = Math.min(Math.floor(interpolate(frame, [10, 60], [0, 10000])), 10000);
  const venueCount = Math.min(Math.floor(interpolate(frame, [10, 60], [0, 2500])), 2500);

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
        padding: "80px 100px",
      }}
    >
      {/* Stats that count up */}
      <div style={{ display: "flex", gap: 80, marginBottom: 50 }}>
        {[
          { num: userCount.toLocaleString() + "+", label: "Happy Pet Owners" },
          { num: venueCount.toLocaleString() + "+", label: "Pet-Friendly Venues" },
          { num: "4.8", label: "Average Rating" },
        ].map((stat, i) => {
          const prog = spring({
            fps,
            frame: Math.max(0, frame - 5 - i * 8),
            config: { damping: 20, stiffness: 100 },
          });
          return (
            <div
              key={i}
              style={{
                textAlign: "center",
                opacity: prog,
                transform: `scale(${interpolate(prog, [0, 1], [0.7, 1])})`,
              }}
            >
              <div
                style={{
                  fontSize: 52,
                  fontWeight: 800,
                  background: "linear-gradient(90deg, #ec4899, #a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.num}
              </div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quote cards slide in from alternating sides */}
      <div style={{ display: "flex", gap: 28, width: "100%" }}>
        {quotes.map((q, i) => {
          const delay = 15 + i * 14;
          const prog = spring({
            fps,
            frame: Math.max(0, frame - delay),
            config: { damping: 22, stiffness: 80 },
          });
          const x = interpolate(prog, [0, 1], [i % 2 === 0 ? -200 : 200, 0]);
          const rotate = interpolate(prog, [0, 1], [i % 2 === 0 ? -6 : 6, 0]);

          return (
            <div
              key={i}
              style={{
                flex: 1,
                transform: `translateX(${x}px) rotate(${rotate}deg)`,
                opacity: prog,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "30px 26px",
              }}
            >
              <div style={{ color: "#fbbf24", fontSize: 20, marginBottom: 12 }}>★★★★★</div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", fontStyle: "italic", lineHeight: 1.5, marginBottom: 18 }}>
                "{q.text}"
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{q.name}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>{q.pet}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const CTAFinale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Everything converges to center
  const convergeProg = spring({
    fps,
    frame,
    config: { damping: 15, stiffness: 60, mass: 1.2 },
  });

  // Pulsing glow
  const glowIntensity = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.25, 0.55]);
  const glowSize = interpolate(frame, [0, 60, 120], [200, 500, 400]);

  // Button pulse
  const buttonScale = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [1, 1.06]
  );

  const urlOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* Big glow */}
      <div
        style={{
          position: "absolute",
          width: glowSize,
          height: glowSize,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(219, 39, 119, ${glowIntensity}) 0%, rgba(147, 51, 234, ${glowIntensity * 0.5}) 50%, transparent 70%)`,
          filter: "blur(50px)",
        }}
      />

      {/* Logo zooms from small */}
      <div
        style={{
          transform: `scale(${interpolate(convergeProg, [0, 1], [0.3, 1])})`,
          opacity: convergeProg,
          display: "flex",
          alignItems: "center",
          gap: 18,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 20,
            background: "linear-gradient(135deg, #db2777, #9333ea)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            boxShadow: "0 12px 40px rgba(219, 39, 119, 0.5)",
          }}
        >
          🐕
        </div>
        <span
          style={{
            fontSize: 60,
            fontWeight: 800,
            background: "linear-gradient(90deg, #ec4899, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          MyPetVenues
        </span>
      </div>

      <div style={{ marginBottom: 36 }}>
        <KineticText
          text="Start discovering pet-friendly venues today."
          startFrame={15}
          fontSize={38}
          fontWeight={600}
        />
      </div>

      {/* CTA button with pulse */}
      <div
        style={{
          opacity: interpolate(frame, [25, 40], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `scale(${buttonScale})`,
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
            boxShadow: `0 8px 44px rgba(219, 39, 119, ${glowIntensity + 0.1})`,
          }}
        >
          Get Started — It's Free
        </div>
      </div>

      <div
        style={{
          opacity: urlOpacity,
          marginTop: 24,
          fontSize: 20,
          color: "rgba(255,255,255,0.4)",
          letterSpacing: 2,
        }}
      >
        mypetvenues.com
      </div>
    </AbsoluteFill>
  );
};
