import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { IntroScene } from "./scenes/IntroScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { SolutionScene } from "./scenes/SolutionScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { VenueShowcaseScene } from "./scenes/VenueShowcaseScene";
import { BookingScene } from "./scenes/BookingScene";
import { TestimonialsScene } from "./scenes/TestimonialsScene";
import { CTAScene } from "./scenes/CTAScene";

export const PromoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1a" }}>
      <TransitionSeries>
        {/* Scene 1: Logo + Tagline intro (0-4s) */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <IntroScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: 15 })}
          presentation={fade()}
        />

        {/* Scene 2: The Problem (4-8s) */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <ProblemScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: 15 })}
          presentation={fade()}
        />

        {/* Scene 3: The Solution (8-12s) */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <SolutionScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: 15 })}
          presentation={fade()}
        />

        {/* Scene 4: Key Features (12-17s) */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <FeaturesScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: 15 })}
          presentation={fade()}
        />

        {/* Scene 5: Venue Showcase (17-21s) */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <VenueShowcaseScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: 15 })}
          presentation={fade()}
        />

        {/* Scene 6: Booking Flow (21-25s) */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <BookingScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: 15 })}
          presentation={fade()}
        />

        {/* Scene 7: Social Proof (25-28s) */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <TestimonialsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: 15 })}
          presentation={fade()}
        />

        {/* Scene 8: CTA (28-30s) */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
