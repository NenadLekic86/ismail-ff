"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Lottie from "lottie-react";

// Import Lottie animations
import Anim1 from "@/public/lottie/Anim1.json";
import Anim2 from "@/public/lottie/Anim2.json";
import Anim3 from "@/public/lottie/Anim3.json";
import Anim4 from "@/public/lottie/Anim4.json";
import Anim5 from "@/public/lottie/Anim5.json";
import OneBigAnimData from "@/public/lottie/OneBigAnim.json";

// Frame markers for big background animation - where each section completes
const SECTION_FRAMES = {
  section1: 241,   // Unsheet Music
  section2: 485,   // Collaboration
  section3: 721,   // Music On The Go
  section4: 960,   // Practice and Perform
  section5: 1440,  // Musync Intelligence (full animation)
};

// Loop segments for big background animation (frames 1201-1440, 20-24s)
const BIG_ANIM_LOOP_START = 1201;
const BIG_ANIM_LOOP_END = 1440;

// Loop segments for small animations
const LOOP_START = 265;
const LOOP_END = 500;

export default function AnimatedSection() {
  // Slow down the big animation by 30% (multiply frame rate by 0.7)
  type LottieJSON = { fr?: number } & Record<string, unknown>;
  const OneBigAnim: Record<string, unknown> = useMemo(() => {
    const data = OneBigAnimData as unknown as LottieJSON;
    if (typeof data.fr === "number") {
      return { ...data, fr: data.fr * 0.7 } as Record<string, unknown>;
    }
    return data as Record<string, unknown>;
  }, []);

  // Refs for each Lottie animation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bigAnimRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottie1Ref = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottie2Ref = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottie3Ref = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottie4Ref = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottie5Ref = useRef<any>(null);

  // Container refs for intersection observer
  const sectionRef = useRef<HTMLDivElement>(null);
  const container1Ref = useRef<HTMLDivElement>(null);
  const container2Ref = useRef<HTMLDivElement>(null);
  const container3Ref = useRef<HTMLDivElement>(null);
  const container4Ref = useRef<HTMLDivElement>(null);
  const container5Ref = useRef<HTMLDivElement>(null);

  // State to track which animations have been played
  const [playedAnimations, setPlayedAnimations] = useState<Set<number>>(new Set());
  
  // State to track which animations should loop
  const [loopingAnimations, setLoopingAnimations] = useState<{[key: number]: boolean}>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  
  // State to track if big background animation should loop
  const [bigAnimLooping, setBigAnimLooping] = useState(false);
  
  // State to track current animation progress (which frame we've reached)
  const [currentMaxFrame, setCurrentMaxFrame] = useState(0);
  
  // State to track if big animation has been initialized
  const [bigAnimInitialized, setBigAnimInitialized] = useState(false);
  
  // State to track last section view time (for scroll speed detection)
  const [lastSectionTime, setLastSectionTime] = useState<number>(Date.now());
  const [lastSectionIndex, setLastSectionIndex] = useState<number>(0);
  
  // Threshold: if sections are viewed within this time (ms), it's considered "fast scrolling"
  const FAST_SCROLL_THRESHOLD = 3000;

  // Observer for individual mobile/tablet animations AND desktop big animation sync
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px', // Only trigger when section is in middle 40% of viewport
      threshold: 0, // Trigger based on rootMargin position
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const index = parseInt(entry.target.getAttribute('data-animation-index') || '0');
        
        if (entry.isIntersecting) {
          // Handle mobile/tablet animations (small individual animations)
          if (!playedAnimations.has(index)) {
            const lottieRefs = [lottie1Ref, lottie2Ref, lottie3Ref, lottie4Ref, lottie5Ref];
            const lottieRef = lottieRefs[index - 1];
            
            if (lottieRef.current) {
              lottieRef.current.play();
              setPlayedAnimations(prev => new Set(prev).add(index));
            }
          }

          // Handle desktop big animation (only on desktop sizes)
          if (bigAnimRef.current && !bigAnimLooping && window.innerWidth >= 1024) {
            const targetFrames = [
              SECTION_FRAMES.section1,
              SECTION_FRAMES.section2,
              SECTION_FRAMES.section3,
              SECTION_FRAMES.section4,
              SECTION_FRAMES.section5,
            ];
            const targetFrame = targetFrames[index - 1];
            const previousFrame = index > 1 ? targetFrames[index - 2] : 0;

            // If we haven't reached this section's end frame yet, animate to it
            if (currentMaxFrame < targetFrame) {
              const currentTime = Date.now();
              const timeSinceLastSection = currentTime - lastSectionTime;
              const sectionJump = Math.abs(index - lastSectionIndex);
              
              // Detect fast scrolling or section jumping:
              // - Scrolled to section within FAST_SCROLL_THRESHOLD
              // - OR skipped more than 1 section (jumping around)
              const isFastScrolling = timeSinceLastSection < FAST_SCROLL_THRESHOLD || sectionJump > 1;
              
              // Update tracking
              setLastSectionTime(currentTime);
              setLastSectionIndex(index);
              
              // If this is the first interaction, initialize from start
              if (!bigAnimInitialized) {
                bigAnimRef.current.goToAndStop(0, true);
                setBigAnimInitialized(true);
              }
              
              if (isFastScrolling) {
                // FAST SCROLL MODE: Instantly jump to previous section's end, then play current section
                // This shows all previous animations completed instantly
                if (previousFrame > 0 && currentMaxFrame < previousFrame) {
                  // Instantly jump to show all previous sections complete
                  bigAnimRef.current.goToAndStop(previousFrame, true);
                  setCurrentMaxFrame(previousFrame);
                }
                // Now play only the current section
                bigAnimRef.current.playSegments([previousFrame, targetFrame], true);
              } else {
                // SLOW SCROLL MODE (reading): Play naturally from current position
                // This creates a smooth, continuous animation as user scrolls through content
                const startFrame = currentMaxFrame;
                bigAnimRef.current.playSegments([startFrame, targetFrame], true);
              }
              
              setCurrentMaxFrame(targetFrame);

              // If we've reached the final frame, prepare to loop
              if (targetFrame === SECTION_FRAMES.section5) {
                // Animation will complete and trigger onComplete
              }
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all animation containers
    const containers = [container1Ref, container2Ref, container3Ref, container4Ref, container5Ref];
    containers.forEach((containerRef) => {
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [playedAnimations, currentMaxFrame, bigAnimLooping, bigAnimInitialized, lastSectionTime, lastSectionIndex]);

  return (
    <section ref={sectionRef} className="ilustration-wrapper my-30 w-full relative">
        {/* Big background Lottie animation - Desktop only (lg and up) */}
        <div className="hidden lg:block absolute lg:-top-[180px] xl:-top-[230px] -left-[50px] w-full h-auto pointer-events-none z-[0] big-animation-holder">
          {!bigAnimLooping ? (
            <Lottie 
              lottieRef={bigAnimRef}
              animationData={OneBigAnim}
              loop={false}
              autoplay={false}
              onComplete={() => {
                // When reaching frame 1440, switch to looping mode
                if (currentMaxFrame >= SECTION_FRAMES.section5) {
                  setBigAnimLooping(true);
                }
              }}
              className="w-full h-auto"
            />
          ) : (
            <Lottie 
              animationData={OneBigAnim}
              loop={true}
              autoplay={true}
              initialSegment={[BIG_ANIM_LOOP_START, BIG_ANIM_LOOP_END]}
              className="w-full h-auto"
            />
          )}
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 xl:px-36 relative z-[1] custom-pb1">
            {/* Trigger point for section 1 - always present for intersection observer */}
            <div ref={container1Ref} data-animation-index="1" className="absolute top-0 left-0 w-full h-px pointer-events-none" />
            <div className="flex flex-col lg:flex-row items-center">
                <div className="basis-full lg:basis-3/5">
                    <h2 className="sm:text-2xl lg:text-4xl xl:text-5xl font-semibold lg:hidden">
                        (Un)sheet Music
                    </h2>
                    {/* Individual animation for mobile/tablet only */}
                    <div className="relative pb-7 lg:pb-0 lg:hidden">
                    {!loopingAnimations[1] ? (
                        <Lottie 
                            lottieRef={lottie1Ref}
                            animationData={Anim1} 
                            loop={false}
                            autoplay={false}
                            initialSegment={[0, LOOP_END]}
                            onComplete={() => setLoopingAnimations(prev => ({...prev, 1: true}))}
                            className="relative w-[115%] -left-[25px] md:w-auto md:left-0"
                        />
                    ) : (
                        <Lottie 
                            animationData={Anim1} 
                            loop={true}
                            autoplay={true}
                            initialSegment={[LOOP_START, LOOP_END]}
                            className="relative w-[115%] -left-[25px] md:w-auto md:left-0"
                        />
                    )}
                    </div>
                </div>
                <div className="basis-full lg:basis-2/5">
                    <h2 className="sm:text-2xl lg:text-4xl 3xl:text-5xl font-semibold mb-4 hidden lg:block">
                        (Un)sheet Music
                    </h2>
                    <p className="2xl:text-lg mb-4">Lorem ipsum dolor sit amet consectetur. Molestie placerat justo aliquet tellus felis ornare dignissim sapien. Urna sed enim neque neque urna varius diam vitae. Tortor vel nunc quis urna metus feugiat leo proin.</p>
                    <Link href="/" className="flex items-center gap-2">
                        <span>Learn More</span>
                        <Image src="/long-arrow-r.svg" alt="Mac App Store" width={68} height={24} className="hover:cursor-pointer" />
                    </Link>
                </div>
            </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 xl:px-36 relative z-[1] custom-pb2">
            {/* Trigger point for section 2 - always present for intersection observer */}
            <div ref={container2Ref} data-animation-index="2" className="absolute top-0 left-0 w-full h-px pointer-events-none" />
            <div className="flex flex-col-reverse lg:flex-row items-center">
                <div className="basis-full lg:basis-3/5 hidden lg:block">
                    <h2 className="sm:text-2xl lg:text-4xl 3xl:text-5xl font-semibold mb-4">
                      Collaboration
                    </h2>
                    <p className="2xl:text-lg mb-4 md:pr-40">Lorem ipsum dolor sit amet consectetur. Molestie placerat justo aliquet tellus felis ornare dignissim sapien. Urna sed enim neque neque urna varius diam vitae. Tortor vel nunc quis urna metus feugiat leo proin.</p>
                    <Link href="/" className="flex items-center gap-2">
                        <span>Learn More</span>
                        <Image src="/long-arrow-r.svg" alt="Mac App Store" width={68} height={24} className="hover:cursor-pointer" />
                    </Link>
                </div>
                <div className="basis-full lg:basis-2/5 my-20 md:my-0">
                    <h2 className="sm:text-2xl lg:text-4xl xl:text-5xl font-semibold lg:hidden">
                    Collaboration
                    </h2>
                    {/* Individual animation for mobile/tablet only */}
                    <div className="relative lg:hidden">
                    {!loopingAnimations[2] ? (
                        <Lottie 
                            lottieRef={lottie2Ref}
                            animationData={Anim2} 
                            loop={false}
                            autoplay={false}
                            initialSegment={[0, LOOP_END]}
                            onComplete={() => setLoopingAnimations(prev => ({...prev, 2: true}))}
                            className="py-7 lg:py-0"
                        />
                    ) : (
                        <Lottie 
                            animationData={Anim2} 
                            loop={true}
                            autoplay={true}
                            initialSegment={[LOOP_START, LOOP_END]}
                            className="py-7 lg:py-0"
                        />
                    )}
                    <div className="lg:hidden">
                        <p className="lg:text-lg mb-4 md:pr-40">Lorem ipsum dolor sit amet consectetur. Molestie placerat justo aliquet tellus felis ornare dignissim sapien. Urna sed enim neque neque urna varius diam vitae. Tortor vel nunc quis urna metus feugiat leo proin.</p>
                        <Link href="/" className="flex items-center gap-2">
                            <span>Learn More</span>
                            <Image src="/long-arrow-r.svg" alt="Mac App Store" width={68} height={24} className="hover:cursor-pointer" />
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 xl:px-36 relative z-[1] custom-pb3">
            {/* Trigger point for section 3 - always present for intersection observer */}
            <div ref={container3Ref} data-animation-index="3" className="absolute top-0 left-0 w-full h-px pointer-events-none" />
            <div className="flex flex-col lg:flex-row items-center">
                <div className="basis-full lg:basis-3/5">
                    <h2 className="sm:text-2xl lg:text-4xl xl:text-5xl font-semibold  lg:hidden">
                        Music On The Go
                    </h2>
                    {/* Individual animation for mobile/tablet only */}
                    <div className="py-7 lg:py-0 lg:hidden">
                    {!loopingAnimations[3] ? (
                        <Lottie 
                            lottieRef={lottie3Ref}
                            animationData={Anim3} 
                            loop={false}
                            autoplay={false}
                            initialSegment={[0, LOOP_END]}
                            onComplete={() => setLoopingAnimations(prev => ({...prev, 3: true}))}
                            className="w-[200%] lg:w-auto"
                        />
                    ) : (
                        <Lottie 
                            animationData={Anim3} 
                            loop={true}
                            autoplay={true}
                            initialSegment={[LOOP_START, LOOP_END]}
                            className="w-[200%] lg:w-auto"
                        />
                    )}
                    </div>
                </div>
                <div className="basis-full lg:basis-2/5">
                    <h2 className="sm:text-2xl lg:text-4xl 3xl:text-5xl font-semibold mb-4 hidden lg:block">
                        Music On The Go
                    </h2>
                    <p className="2xl:text-lg mb-4">Lorem ipsum dolor sit amet consectetur. Molestie placerat justo aliquet tellus felis ornare dignissim sapien. Urna sed enim neque neque urna varius diam vitae. Tortor vel nunc quis urna metus feugiat leo proin.</p>
                    <Link href="/" className="flex items-center gap-2">
                        <span>Learn More</span>
                        <Image src="/long-arrow-r.svg" alt="Mac App Store" width={68} height={24} className="hover:cursor-pointer" />
                    </Link>
                </div>
            </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 xl:px-36 relative z-[1] custom-pb4">
            {/* Trigger point for section 4 - always present for intersection observer */}
            <div ref={container4Ref} data-animation-index="4" className="absolute top-0 left-0 w-full h-px pointer-events-none" />
            <div className="flex flex-col-reverse lg:flex-row items-center">
                <div className="basis-full lg:basis-3/5 hidden lg:block">
                    <h2 className="sm:text-2xl lg:text-4xl xl:text-5xl font-semibold mb-4">
                        Practice and Perform
                    </h2>
                    <p className="2xl:text-lg mb-4 md:pr-40">Lorem ipsum dolor sit amet consectetur. Molestie placerat justo aliquet tellus felis ornare dignissim sapien. Urna sed enim neque neque urna varius diam vitae. Tortor vel nunc quis urna metus feugiat leo proin.</p>
                    <Link href="/" className="flex items-center gap-2">
                        <span>Learn More</span>
                        <Image src="/long-arrow-r.svg" alt="Mac App Store" width={68} height={24} className="hover:cursor-pointer" />
                    </Link>
                </div>
                <div className="basis-full lg:basis-2/5 my-20 md:my-0">
                    <h2 className="sm:text-2xl lg:text-4xl 3xl:text-5xl font-semibold lg:hidden">
                        Practice and Perform
                    </h2>
                    {/* Individual animation for mobile/tablet only */}
                    <div className="lg:hidden">
                    {!loopingAnimations[4] ? (
                        <Lottie 
                            lottieRef={lottie4Ref}
                            animationData={Anim4} 
                            loop={false}
                            autoplay={false}
                            initialSegment={[0, LOOP_END]}
                            onComplete={() => setLoopingAnimations(prev => ({...prev, 4: true}))}
                            className="py-7 lg:py-0"
                        />
                    ) : (
                        <Lottie 
                            animationData={Anim4} 
                            loop={true}
                            autoplay={true}
                            initialSegment={[LOOP_START, LOOP_END]}
                            className="py-7 lg:py-0"
                        />
                    )}
                    <div className="lg:hidden">
                        <p className="lg:text-lg mb-4 md:pr-40">Lorem ipsum dolor sit amet consectetur. Molestie placerat justo aliquet tellus felis ornare dignissim sapien. Urna sed enim neque neque urna varius diam vitae. Tortor vel nunc quis urna metus feugiat leo proin.</p>
                        <Link href="/" className="flex items-center gap-2">
                            <span>Learn More</span>
                            <Image src="/long-arrow-r.svg" alt="Mac App Store" width={68} height={24} className="hover:cursor-pointer" />
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 xl:px-36 relative z-[1]">
            {/* Trigger point for section 5 - always present for intersection observer */}
            <div ref={container5Ref} data-animation-index="5" className="absolute top-0 left-0 w-full h-px pointer-events-none" />
            <div className="flex flex-col lg:flex-row items-center">
                <div className="basis-full lg:basis-3/5">
                    <h2 className="sm:text-2xl lg:text-4xl xl:text-5xl font-semibold  lg:hidden">
                        Musync Intelligence
                    </h2>
                    {/* Individual animation for mobile/tablet only */}
                    <div className="relative py-7 lg:py-0 lg:hidden">
                    {!loopingAnimations[5] ? (
                        <Lottie 
                            lottieRef={lottie5Ref}
                            animationData={Anim5} 
                            loop={false}
                            autoplay={false}
                            initialSegment={[0, LOOP_END]}
                            onComplete={() => setLoopingAnimations(prev => ({...prev, 5: true}))}
                            className="relative w-[170%] -left-[25px] md:w-auto md:left-0"
                        />
                    ) : (
                        <Lottie 
                            animationData={Anim5} 
                            loop={true}
                            autoplay={true}
                            initialSegment={[LOOP_START, LOOP_END]}
                            className="relative w-[170%] -left-[25px] md:w-auto md:left-0"
                        />
                    )}
                    </div>
                </div>
                <div className="basis-full lg:basis-2/5">
                    <h2 className="sm:text-2xl lg:text-4xl 3xl:text-5xl font-semibold mb-4 hidden lg:block">
                        Musync Intelligence
                    </h2>
                    <p className="2xl:text-lg mb-4">Lorem ipsum dolor sit amet consectetur. Molestie placerat justo aliquet tellus felis ornare dignissim sapien. Urna sed enim neque neque urna varius diam vitae. Tortor vel nunc quis urna metus feugiat leo proin.</p>
                    <Link href="/" className="flex items-center gap-2">
                        <span>Learn More</span>
                        <Image src="/long-arrow-r.svg" alt="Mac App Store" width={68} height={24} className="hover:cursor-pointer" />
                    </Link>
                </div>
            </div>
        </div>
    </section>
  );
}
