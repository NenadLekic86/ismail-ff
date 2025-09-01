"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function PricingSection() {
    const [activePlan, setActivePlan] = useState<"basic" | "premium" | "professional">("premium");
    const mobileContentRef = useRef<HTMLDivElement | null>(null);
    const tabsRef = useRef<HTMLDivElement | null>(null);
    const indicatorRef = useRef<HTMLDivElement | null>(null);
    const btnBasicRef = useRef<HTMLButtonElement | null>(null);
    const btnPremiumRef = useRef<HTMLButtonElement | null>(null);
    const btnProfessionalRef = useRef<HTMLButtonElement | null>(null);
    const desktopTabsRef = useRef<HTMLDivElement | null>(null);
    const desktopIndicatorRef = useRef<HTMLDivElement | null>(null);
    const boxBasicRef = useRef<HTMLDivElement | null>(null);
    const boxPremiumRef = useRef<HTMLDivElement | null>(null);
    const boxProfessionalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = mobileContentRef.current;
        if (!el) return;
        gsap.killTweensOf(el);
        gsap.set(el, { autoAlpha: 0 });
        gsap.to(el, { autoAlpha: 1, duration: 1, ease: "power2.out", overwrite: "auto" });
    }, [activePlan]);

    useEffect(() => {
        const moveIndicator = () => {
            const container = tabsRef.current;
            const indicator = indicatorRef.current;
            if (!container || !indicator) return;
            const target = activePlan === "basic" ? btnBasicRef.current : activePlan === "premium" ? btnPremiumRef.current : btnProfessionalRef.current;
            if (!target) return;
            const cRect = container.getBoundingClientRect();
            const tRect = target.getBoundingClientRect();
            const left = tRect.left - cRect.left;
            const top = tRect.top - cRect.top;
            const width = tRect.width;
            const height = tRect.height;
            gsap.to(indicator, { x: left, y: top, width, height, duration: 0.3, ease: "power2.out" });
        };

        // initial position after layout
        const id = requestAnimationFrame(moveIndicator);
        const onResize = () => moveIndicator();
        window.addEventListener("resize", onResize);
        return () => {
            cancelAnimationFrame(id);
            window.removeEventListener("resize", onResize);
        };
    }, [activePlan]);

    // Desktop: animate moving highlight indicator behind active pricing box
    useEffect(() => {
        const moveIndicator = () => {
            const container = desktopTabsRef.current;
            const indicator = desktopIndicatorRef.current;
            if (!container || !indicator) return;
            const target = activePlan === "basic" ? boxBasicRef.current : activePlan === "premium" ? boxPremiumRef.current : boxProfessionalRef.current;
            if (!target) return;
            const cRect = container.getBoundingClientRect();
            const tRect = target.getBoundingClientRect();
            const left = tRect.left - cRect.left;
            const top = tRect.top - cRect.top;
            const width = tRect.width;
            const height = tRect.height;
            gsap.to(indicator, { x: left, y: top, width, height, duration: 0.3, ease: "power2.out" });
        };

        const id = requestAnimationFrame(moveIndicator);
        const onResize = () => moveIndicator();
        window.addEventListener("resize", onResize);
        return () => {
            cancelAnimationFrame(id);
            window.removeEventListener("resize", onResize);
        };
    }, [activePlan]);

    // Always reset to premium on mobile view (changed from basic to premium)
    useEffect(() => {
        const handleResize = () => {
            // Always reset to premium regardless of screen size
            if (activePlan !== "premium") {
                setActivePlan("premium");
            }
        };
        
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [activePlan]);

    // Reset to premium when section comes into view or on page load
    useEffect(() => {
        // Always start with premium on component mount (page refresh)
        setActivePlan("premium");

        // Create ScrollTrigger to reset to premium when section comes into view
        const scrollTrigger = ScrollTrigger.create({
            trigger: ".pricing-section",
            start: "top 80%",
            onEnter: () => {
                setActivePlan("premium");
            },
            onEnterBack: () => {
                setActivePlan("premium");
            },
        });

        return () => {
            scrollTrigger.kill();
        };
    }, []); // Empty dependency array - only run once on mount

    const Row = ({ label, value, isCheck, isUncheck }: { label: string; value?: string; isCheck?: boolean; isUncheck?: boolean }) => (
        <div className="flex items-center justify-between py-3">
            <span className="text-base">{label}</span>
            {typeof value === "string" ? (
                <span className="text-base font-medium">{value}</span>
            ) : isCheck ? (
                <Image src="/check-icon.svg" alt="check" width={20} height={20} />
            ) : isUncheck ? (
                <Image src="/uncheck-icon.svg" alt="uncheck" width={20} height={20} />
            ) : null}
        </div>
    );

    return (
        <section className="pricing-section mx-auto max-w-7xl px-4 sm:px-6 my-20 lg:my-32 xl:my-44 relative">
            <h2 className="text-4xl md:text-5xl font-semibold text-center mb-12">Pricing Plan</h2>

            {/* Tablet/Desktop View */}
            <div className="hidden lg:flex flex-row flex-wrap items-start justify-center">
                <div className="basis-1/4 p-10">
                    <div className="flex flex-col items-start justify-start">
                        <h3 className="text-3xl font-medium mb-6">Price</h3>
                        <h3 className="text-3xl font-medium mb-4 pb-2 border-b border-black">Features</h3>
                        <p className="text-base mb-4 min-h-[24px]">Scores</p>
                        <p className="text-base mb-4 min-h-[24px]">Events</p>
                        <p className="text-base mb-4 min-h-[24px]">Online sync</p>
                        <p className="text-base mb-4 min-h-[24px]">Music annotator</p>
                        <p className="text-base mb-4 min-h-[24px]">Groups</p>
                        <p className="text-base mb-4 min-h-[24px]">Audio playback</p>
                        <p className="text-base mb-4 min-h-[24px]">Music editor</p>
                        <p className="text-base mb-4 min-h-[24px]">More advanced features</p>
                    </div>
                </div>
                <div className="basis-3/4">
                    <div ref={desktopTabsRef} className="relative flex flex-row items-start justify-start text-center">
                        <div ref={desktopIndicatorRef} className="absolute rounded-[26px] border-2 border-black bg-[#F3EFEE] pointer-events-none" style={{ left: 0, top: 0, width: 0, height: 0 }} />
                        <div ref={boxBasicRef} onClick={() => setActivePlan("basic")} className={`relative z-10 basis-1/3 cursor-pointer transition-all duration-300 ${activePlan === "basic" ? "p-12 -mt-3 bg-[#F3EFEE] border-2 border-black rounded-[26px]" : "p-10 bg-white/50 border-2 border-[#F9F7F7] rounded-0"}`}>
                            <div className="flex flex-col items-start justify-start">
                                <div className="text-center mx-auto">
                                    <h3 className="text-3xl font-medium mb-6">Free</h3>
                                    <h3 className={`text-2xl mb-4 pb-2 border-b border-black plan_type ${activePlan === "basic" ? "font-bold" : "font-medium"}`}>Basic</h3>
                                    <p className="text-base mb-4 min-h-[24px]">5 score limit</p>
                                    <p className="text-[18px] mb-4 min-h-[24px]">1</p>
                                    <p className="text-base mb-4 min-h-[24px]"><Image className="mx-auto" src="/check-icon.svg" alt="check" width={20} height={20} /></p>
                                    <p className="text-base mb-4 min-h-[24px]"><Image className="mx-auto" src="/check-icon.svg" alt="check" width={20} height={20} /></p>
                                    <p className="text-base mb-4 min-h-[24px]"><Image className="mx-auto" src="/uncheck-icon.svg" alt="check" width={20} height={20} /></p>
                                    <p className="text-base mb-4 min-h-[24px]"><Image className="mx-auto" src="/uncheck-icon.svg" alt="check" width={20} height={20} /></p>
                                    <p className="text-base mb-4 min-h-[24px]"><Image className="mx-auto" src="/uncheck-icon.svg" alt="check" width={20} height={20} /></p>
                                    <p className="text-base mb-4 min-h-[24px]"><Image className="mx-auto" src="/uncheck-icon.svg" alt="check" width={20} height={20} /></p>
                                </div>
                            </div>
                        </div>
                        <div ref={boxPremiumRef} onClick={() => setActivePlan("premium")} className={`relative z-10 basis-1/3 cursor-pointer transition-all duration-300 ${activePlan === "premium" ? "p-12 -mt-3 bg-[#F3EFEE] border-2 border-black rounded-[26px]" : "p-10 bg-white/50 border-2 border-[#F9F7F7] rounded-0"}`}>
                            <div className="flex flex-col items-start justify-start">
                                <div className="text-center mx-auto">
                                    <h3 className="text-4xl font-medium mb-6">$4.99/<span className="text-base">month</span></h3>
                                    <h3 className={`text-2xl mb-4 pb-2 border-b border-black plan_type ${activePlan === "premium" ? "font-bold" : "font-medium"}`}>Premium</h3>
                                    <p className="text-base mb-4 min-h-[24px]">50</p>
                                    <p className="text-base mb-4 min-h-[24px]">Unlimited</p>
                                    <p className="text-base mb-4 min-h-[24px]"><Image className="mx-auto" src="/check-icon.svg" alt="check" width={20} height={20} /></p>
                                    <p className="text-base mb-4 min-h-[24px]"><Image className="mx-auto" src="/check-icon.svg" alt="check" width={20} height={20} /></p>
                                    <p className="text-base mb-4 min-h-[24px]">5</p>
                                    <p className="text-base mb-4 min-h-[24px]"><Image className="mx-auto" src="/check-icon.svg" alt="check" width={20} height={20} /></p>
                                    <p className="text-base mb-4 min-h-[24px]"><Image className="mx-auto" src="/check-icon.svg" alt="check" width={20} height={20} /></p>
                                    <p className="text-base mb-4 min-h-[24px]"><Image className="mx-auto" src="/check-icon.svg" alt="check" width={20} height={20} /></p>
                                </div>
                            </div>
                        </div>
                        <div ref={boxProfessionalRef} onClick={() => setActivePlan("professional")} className={`relative z-10 basis-1/3 cursor-pointer transition-all duration-300 ${activePlan === "professional" ? "p-12 -mt-3 bg-[#F3EFEE] border-2 border-black rounded-[26px]" : "p-10 bg-white/50 border-2 border-[#F9F7F7] rounded-0"}`}>
                            <div className="flex flex-col items-start justify-start">
                                <div className="text-center mx-auto">
                                    <h3 className="text-4xl font-medium mb-6">$9.99/<span className="text-base">month</span></h3>
                                    <h3 className={`text-2xl mb-4 pb-2 border-b border-black plan_type ${activePlan === "professional" ? "font-bold" : "font-medium"}`}>Professional</h3>
                                    <p className="text-base mb-4 min-h-[24px]">200</p>
                                    <p className="text-base mb-4 min-h-[24px]">Unlimited</p>
                                    <p className="text-base mb-4 min-h-[24px]"><Image className="mx-auto" src="/check-icon.svg" alt="check" width={20} height={20} /></p>
                                    <p className="text-base mb-4 min-h-[24px]"><Image className="mx-auto" src="/check-icon.svg" alt="check" width={20} height={20} /></p>
                                    <p className="text-base mb-4 min-h-[24px]">Unlimited</p>
                                    <p className="text-base mb-4 min-h-[24px]"><Image className="mx-auto" src="/check-icon.svg" alt="check" width={20} height={20} /></p>
                                    <p className="text-base mb-4 min-h-[24px]"><Image className="mx-auto" src="/check-icon.svg" alt="check" width={20} height={20} /></p>
                                    <p className="text-base mb-4 min-h-[24px]"><Image className="mx-auto" src="/check-icon.svg" alt="check" width={20} height={20} /></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="lg:hidden">
                <div ref={tabsRef} className="relative flex items-center justify-between gap-2 mb-6 bg-white/50 rounded-[40px] p-1">
                    <div ref={indicatorRef} className="absolute rounded-full border-2 border-[#543F3A] pointer-events-none" style={{ left: 0, top: 0, width: 0, height: 0 }} />
                    <button ref={btnBasicRef}
                        onClick={() => setActivePlan("basic")} 
                        className="relative z-10 px-4 py-2 rounded-full border-2 border-transparent min-w-[95px] text-[#543F3A]">
                            Basic
                    </button>
                    <button ref={btnPremiumRef}
                        onClick={() => setActivePlan("premium")} 
                        className="relative z-10 px-4 py-2 rounded-full border-2 border-transparent min-w-[95px] text-[#543F3A]">
                            Premium
                    </button>
                    <button ref={btnProfessionalRef}
                        onClick={() => setActivePlan("professional")} 
                        className="relative z-10 px-4 py-2 rounded-full border-2 border-transparent min-w-[95px] text-[#543F3A]">
                            Professional
                    </button>
                </div>

                <div ref={mobileContentRef} className="rounded-[16px] p-10 bg-[#F9F7F6]">
                    {activePlan === "basic" && (
                        <div>
                            <h3 className="text-3xl font-medium mb-6 text-center">Free</h3>
                            <h3 className="text-2xl font-semibold mb-3 text-center">Basic</h3>
                            <hr className="border-black mb-2 max-w-[40%] mx-auto" />
                            <Row label="Scores" value="5 score limit" />
                            <Row label="Events" value="1" />
                            <Row label="Online sync" isCheck />
                            <Row label="Music annotator" isCheck />
                            <Row label="Groups" isUncheck />
                            <Row label="Audio playback" isUncheck />
                            <Row label="Music editor" isUncheck />
                            <Row label="More advanced features" isUncheck />
                        </div>
                    )}

                    {activePlan === "premium" && (
                        <div>
                            <h3 className="text-3xl font-medium mb-6 text-center">$4.99/<span className="text-base">month</span></h3>
                            <h3 className="text-2xl font-semibold mb-3 text-center">Premium</h3>
                            <hr className="border-black mb-2 max-w-[40%] mx-auto" />
                            <Row label="Scores" value="50" />
                            <Row label="Events" value="Unlimited" />
                            <Row label="Online sync" isCheck />
                            <Row label="Music annotator" isCheck />
                            <Row label="Groups" value="5" />
                            <Row label="Audio playback" isCheck />
                            <Row label="Music editor" isCheck />
                            <Row label="More advanced features" isCheck />
                        </div>
                    )}

                    {activePlan === "professional" && (
                        <div>
                            <h3 className="text-3xl font-medium mb-6 text-center">$9.99/<span className="text-base">month</span></h3>
                            <h3 className="text-2xl font-semibold mb-3 text-center">Professional</h3>
                            <hr className="border-black mb-2 max-w-[40%] mx-auto" />
                            <Row label="Scores" value="200" />
                            <Row label="Events" value="Unlimited" />
                            <Row label="Online sync" isCheck />
                            <Row label="Music annotator" isCheck />
                            <Row label="Groups" value="Unlimited" />
                            <Row label="Audio playback" isCheck />
                            <Row label="Music editor" isCheck />
                            <Row label="More advanced features" isCheck />
                        </div>
                    )}
                </div>
            </div>

        </section>
    );
}