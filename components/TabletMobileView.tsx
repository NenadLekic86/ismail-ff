"use client";

import Image from "next/image";

export default function TabletMobileView() {
    return (
        <section className="tablet-mobile-view mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-[1]">
            <div className="mx-auto max-w-[950px]">
                <Image 
                    src="/tablet_mobile_view2.webp" 
                    alt="Tablet Mobile View" 
                    width={1000} 
                    height={1000} 
                    className="w-full h-auto"
                    priority
                />
            </div>
        </section>
    )
}