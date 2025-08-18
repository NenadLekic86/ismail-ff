"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 md:py-38 relative">
            <div className="flex flex-col md:flex-row items-center gap-4 py-10">
                <div className="basis-full md:basis-2/5">
                    <h1 className="text-6xl md:text-[64px] mb-4">Streamline the Way You Play</h1>
                    <p className="text-lg md:text-[22px] mb-4">The digital music score app that seamlessly integrates music management, collaboration, and performance in a single platform. Designed for musicians, educators, and ensembles.</p>
                    <div className="flex flex-col md:flex-row items-center gap-4 hidden md:flex">
                        <Link href="/">
                            <Image src="/app_store-btn3.png" alt="Mac App Store" width={204} height={60} className="hover:cursor-pointer" />
                        </Link>
                        <Link href="/">
                            <Image src="/google_play-btn3.png" alt="Google Play" width={204} height={60} className="hover:cursor-pointer" />
                        </Link>
                    </div>
                </div>
                <div className="basis-full md:basis-3/5">
                    <Image 
                    src="/hero-bg.svg" 
                    alt="Hero Image" 
                    width={3000} 
                    height={3000} 
                    className="md:absolute top-10 right-0"
                    priority
                    />

                    <div className="flex flex-col md:flex-row items-center gap-4 md:hidden">
                        <Link href="/">
                            <Image src="/app_store-btn3.png" alt="Mac App Store" width={204} height={60} className="hover:cursor-pointer" />
                        </Link>
                        <Link href="/">
                            <Image src="/google_play-btn3.png" alt="Google Play" width={204} height={60} className="hover:cursor-pointer" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}