"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Hero() {
    const [heroAnimData, setHeroAnimData] = useState<Record<string, unknown> | null>(null);

    useEffect(() => {
        let isMounted = true;
        fetch("/lottie/heroAnim.json")
            .then((res) => res.json())
            .then((data) => {
                if (isMounted) setHeroAnimData(data);
            })
            .catch(() => {
                // Silently fall back to the static image if fetch fails
            });
        return () => {
            isMounted = false;
        };
    }, []);
    return (
        <section className="relative">
            <div className="absolute inset-0 -z-10 md:-top-36 lg:-top-24 pointer-events-none hidden md:block">
                {heroAnimData ? (
                    <Lottie 
                        animationData={heroAnimData}
                        loop
                        autoplay
                        className="w-full h-full"
                    />
                ) : (
                    <Image 
                        src="/hero-bg.svg" 
                        alt="Hero Image" 
                        fill
                        className="object-cover"
                        priority
                    />
                )}
            </div>
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 md:py-16 lg:py-44 relative">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 py-10">
                    <div className="basis-full md:basis-2/5">
                        <h1 className="text-6xl md:text-[64px] mb-4">Streamline the Way You Play</h1>
                        <p className="text-lg md:text-[22px] mb-4">The digital music score app that seamlessly integrates music management, collaboration, and performance in a single platform. Designed for musicians, educators, and ensembles.</p>
                        <div className="hidden md:flex flex-col md:flex-row items-center gap-4">
                            <Link href="/">
                                <Image src="/app_store-btn3.png" alt="Mac App Store" width={204} height={60} className="hover:cursor-pointer" />
                            </Link>
                            <Link href="/">
                                <Image src="/google_play-btn3.png" alt="Google Play" width={204} height={60} className="hover:cursor-pointer" />
                            </Link>
                        </div>
                    </div>
                    <div className="basis-full w-100 md:basis-3/5 relative">
                        <div className="absolute inset-0 -z-10 w-[170%] -left-[65%] -top-[150px] pointer-events-none md:hidden">
                            {heroAnimData ? (
                                <Lottie 
                                    animationData={heroAnimData}
                                    loop
                                    autoplay
                                    className="w-full h-full"
                                />
                            ) : (
                                <Image 
                                    src="/hero-bg.svg" 
                                    alt="Hero Image" 
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            )}
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-4 pt-72 md:hidden">
                            <Link href="/">
                                <Image src="/app_store-btn3.png" alt="Mac App Store" width={204} height={60} className="hover:cursor-pointer" />
                            </Link>
                            <Link href="/">
                                <Image src="/google_play-btn3.png" alt="Google Play" width={204} height={60} className="hover:cursor-pointer" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}