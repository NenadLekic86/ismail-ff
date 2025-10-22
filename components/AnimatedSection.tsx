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
  // Define loop segments for each animation
  // Each animation will play once from 0 to LOOP_END, then loop from LOOP_START to LOOP_END
  const LOOP_START = 265;
  const LOOP_END = 500;
  
  // Loop segments for big background animation (frames 1201-1440, 20-24s)
  const BIG_ANIM_LOOP_START = 1201;
  const BIG_ANIM_LOOP_END = 1440;

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
  
  // State to track if section is in viewport (to trigger big animation)
  const [sectionInView, setSectionInView] = useState(false);

  // Observer for section visibility (triggers big background animation)
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !sectionInView) {
            setSectionInView(true);
            // Trigger animation play
            if (bigAnimRef.current && !bigAnimLooping) {
              bigAnimRef.current.play();
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of section is visible
      }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    return () => {
      sectionObserver.disconnect();
    };
  }, [sectionInView, bigAnimLooping]);

  // Observer for individual mobile/tablet animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4, // Trigger when 40% of the element is visible
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const index = parseInt(entry.target.getAttribute('data-animation-index') || '0');
        
        if (entry.isIntersecting && !playedAnimations.has(index)) {
          // Play the animation when it enters viewport for the first time
          const lottieRefs = [lottie1Ref, lottie2Ref, lottie3Ref, lottie4Ref, lottie5Ref];
          const lottieRef = lottieRefs[index - 1];
          
          if (lottieRef.current) {
            lottieRef.current.play();
            setPlayedAnimations(prev => new Set(prev).add(index));
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
  }, [playedAnimations]);

  return (
    <section ref={sectionRef} className="ilustration-wrapper my-30 relative">
        {/* Big background Lottie animation - Desktop only (xl and up) */}
        <div className="hidden lg:block absolute lg:-top-[180px] xl:-top-[230px] -left-[50px] w-full h-auto pointer-events-none z-[0]">
          {!bigAnimLooping ? (
            <Lottie 
              lottieRef={bigAnimRef}
              animationData={OneBigAnim}
              loop={false}
              autoplay={false}
              initialSegment={[0, BIG_ANIM_LOOP_END]}
              onComplete={() => setBigAnimLooping(true)}
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

        <div className="max-w-screen-2xl mx-auto px-6 md:px-36 lg:py-16 xl:py-36 2xl:py-50 3xl:py-70 relative z-[1]">
            <div className="flex flex-col lg:flex-row items-center">
                <div className="basis-full lg:basis-3/5">
                    <h2 className="sm:text-2xl lg:text-4xl xl:text-5xl font-semibold lg:hidden">
                        (Un)sheet Music
                    </h2>
                    {/* Individual animation for mobile/tablet only */}
                    <div ref={container1Ref} data-animation-index="1" className="relative pb-7 lg:pb-0 lg:hidden">
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
                    <h2 className="sm:text-2xl lg:text-4xl xl:text-5xl font-semibold mb-4 hidden lg:block">
                        (Un)sheet Music
                    </h2>
                    <p className="lg:text-lg mb-4">Lorem ipsum dolor sit amet consectetur. Molestie placerat justo aliquet tellus felis ornare dignissim sapien. Urna sed enim neque neque urna varius diam vitae. Tortor vel nunc quis urna metus feugiat leo proin.</p>
                    <Link href="/" className="flex items-center gap-2">
                        <span>Learn More</span>
                        <Image src="/long-arrow-r.svg" alt="Mac App Store" width={68} height={24} className="hover:cursor-pointer" />
                    </Link>
                </div>
            </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 md:px-36 lg:py-16 xl:py-36 2xl:py-50 3xl:py-70 relative z-[1]">
            <div className="flex flex-col-reverse lg:flex-row items-center">
                <div className="basis-full lg:basis-3/5 hidden lg:block">
                    <h2 className="sm:text-2xl lg:text-4xl xl:text-5xl font-semibold mb-4">
                      Collaboration
                    </h2>
                    <p className="lg:text-lg mb-4 md:pr-40">Lorem ipsum dolor sit amet consectetur. Molestie placerat justo aliquet tellus felis ornare dignissim sapien. Urna sed enim neque neque urna varius diam vitae. Tortor vel nunc quis urna metus feugiat leo proin.</p>
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
                    <div ref={container2Ref} data-animation-index="2" className="relative lg:hidden">
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

        <div className="max-w-screen-2xl mx-auto px-6 md:px-36 lg:py-16 xl:py-24 2xl:py-50 3xl:py-80 relative z-[1]">
            <div className="flex flex-col lg:flex-row items-center">
                <div className="basis-full lg:basis-3/5">
                    <h2 className="sm:text-2xl lg:text-4xl xl:text-5xl font-semibold  lg:hidden">
                        Music On The Go
                    </h2>
                    {/* Individual animation for mobile/tablet only */}
                    <div ref={container3Ref} data-animation-index="3" className="py-7 lg:py-0 lg:hidden">
                    {!loopingAnimations[3] ? (
                        <Lottie 
                            lottieRef={lottie3Ref}
                            animationData={Anim3} 
                            loop={false}
                            autoplay={false}
                            initialSegment={[0, LOOP_END]}
                            onComplete={() => setLoopingAnimations(prev => ({...prev, 3: true}))}
                            className="w-[125%] lg:w-auto"
                        />
                    ) : (
                        <Lottie 
                            animationData={Anim3} 
                            loop={true}
                            autoplay={true}
                            initialSegment={[LOOP_START, LOOP_END]}
                            className="w-[125%] lg:w-auto"
                        />
                    )}
                    </div>
                </div>
                <div className="basis-full lg:basis-2/5">
                    <h2 className="sm:text-2xl lg:text-4xl xl:text-5xl font-semibold mb-4 hidden lg:block">
                        Music On The Go
                    </h2>
                    <p className="lg:text-lg mb-4">Lorem ipsum dolor sit amet consectetur. Molestie placerat justo aliquet tellus felis ornare dignissim sapien. Urna sed enim neque neque urna varius diam vitae. Tortor vel nunc quis urna metus feugiat leo proin.</p>
                    <Link href="/" className="flex items-center gap-2">
                        <span>Learn More</span>
                        <Image src="/long-arrow-r.svg" alt="Mac App Store" width={68} height={24} className="hover:cursor-pointer" />
                    </Link>
                </div>
            </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 md:px-36 lg:py-16 xl:py-52 2xl:py-70 3xl:py-80 relative z-[1]">
            <div className="flex flex-col-reverse lg:flex-row items-center">
                <div className="basis-full lg:basis-3/5 hidden lg:block">
                    <h2 className="sm:text-2xl lg:text-4xl xl:text-5xl font-semibold mb-4">
                        Practice and Perform
                    </h2>
                    <p className="lg:text-lg mb-4 md:pr-40">Lorem ipsum dolor sit amet consectetur. Molestie placerat justo aliquet tellus felis ornare dignissim sapien. Urna sed enim neque neque urna varius diam vitae. Tortor vel nunc quis urna metus feugiat leo proin.</p>
                    <Link href="/" className="flex items-center gap-2">
                        <span>Learn More</span>
                        <Image src="/long-arrow-r.svg" alt="Mac App Store" width={68} height={24} className="hover:cursor-pointer" />
                    </Link>
                </div>
                <div className="basis-full lg:basis-2/5 my-20 md:my-0">
                    <h2 className="sm:text-2xl lg:text-4xl xl:text-5xl font-semibold lg:hidden">
                        Practice and Perform
                    </h2>
                    {/* Individual animation for mobile/tablet only */}
                    <div ref={container4Ref} data-animation-index="4" className="lg:hidden">
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

        <div className="max-w-screen-2xl mx-auto px-6 md:px-36 lg:py-16 xl:py-52 2xl:py-70 3xl:py-80 4xl:py-90 relative z-[1]">
            <div className="flex flex-col lg:flex-row items-center">
                <div className="basis-full lg:basis-3/5">
                    <h2 className="sm:text-2xl lg:text-4xl xl:text-5xl font-semibold  lg:hidden">
                        Musync Intelligence
                    </h2>
                    {/* Individual animation for mobile/tablet only */}
                    <div ref={container5Ref} data-animation-index="5" className="relative py-7 lg:py-0 lg:hidden">
                    {!loopingAnimations[5] ? (
                        <Lottie 
                            lottieRef={lottie5Ref}
                            animationData={Anim5} 
                            loop={false}
                            autoplay={false}
                            initialSegment={[0, LOOP_END]}
                            onComplete={() => setLoopingAnimations(prev => ({...prev, 5: true}))}
                            className="relative w-[115%] -left-[25px] md:w-auto md:left-0"
                        />
                    ) : (
                        <Lottie 
                            animationData={Anim5} 
                            loop={true}
                            autoplay={true}
                            initialSegment={[LOOP_START, LOOP_END]}
                            className="relative w-[115%] -left-[25px] md:w-auto md:left-0"
                        />
                    )}
                    </div>
                </div>
                <div className="basis-full lg:basis-2/5">
                    <h2 className="sm:text-2xl lg:text-4xl xl:text-5xl font-semibold mb-4 hidden lg:block">
                        Musync Intelligence
                    </h2>
                    <p className="lg:text-lg mb-4">Lorem ipsum dolor sit amet consectetur. Molestie placerat justo aliquet tellus felis ornare dignissim sapien. Urna sed enim neque neque urna varius diam vitae. Tortor vel nunc quis urna metus feugiat leo proin.</p>
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
