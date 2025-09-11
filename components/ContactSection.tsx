"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./Buttons";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const violinRef = useRef<SVGSVGElement | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const svg = violinRef.current;
        if (!svg) return;

        const paths = Array.from(svg.querySelectorAll("path")) as SVGPathElement[];
        if (paths.length === 0) return;

        const initializeDashForTopToBottom = (path: SVGPathElement) => {
            const totalLength = path.getTotalLength();
            // Ensure dash is set to full path length
            path.style.strokeDasharray = `${totalLength}`;
            // Decide which endpoint is visually "top"
            const startPoint = path.getPointAtLength(0);
            const endPoint = path.getPointAtLength(totalLength);
            const epsilon = 4; // px tolerance when heights are nearly equal
            let startFromStart = true;
            if (Math.abs(startPoint.y - endPoint.y) <= epsilon) {
                // Tie-break horizontally: draw left-to-right if roughly same height
                startFromStart = startPoint.x <= endPoint.x;
            } else {
                startFromStart = startPoint.y < endPoint.y; // true means start -> end goes top-to-bottom
            }
            // Offset so animation to 0 reveals from the chosen start
            path.style.strokeDashoffset = startFromStart ? `${totalLength}` : `${-totalLength}`;
            path.style.visibility = "visible";
        };

        const resetForReplay = () => {
            paths.forEach((p) => initializeDashForTopToBottom(p));
        };

        // Prepare initial hidden state
        resetForReplay();

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ paused: true, defaults: { ease: "power1.out" } });
            // Draw each path sequentially; for a single path this is one tween
            paths.forEach((path) => {
                tl.to(path, { strokeDashoffset: 0, duration: 1.2 });
            });

            ScrollTrigger.create({
                trigger: svg,
                start: "top 85%",
                onEnter: () => {
                    resetForReplay();
                    tl.restart();
                },
                onEnterBack: () => {
                    resetForReplay();
                    tl.restart();
                },
                invalidateOnRefresh: true,
            });
        }, svg);

        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            message: formData.get('message') as string,
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                // Reset form
                (e.target as HTMLFormElement).reset();
            } else {
                setSubmitStatus('error');
                setErrorMessage(result.error || 'Failed to send message. Please try again.');
            }
        } catch {
            setSubmitStatus('error');
            setErrorMessage('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <section className="contact-section mx-auto max-w-6xl px-4 sm:px-6 my-20 lg:my-44 relative">
            <div className="contact-section-title max-w-xl mx-auto mb-10">
                <h2 className="text-4xl md:text-5xl font-semibold text-center mb-4">Get In Touch With Us</h2>
                <p className="text-center text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius tempor incididunt ut labore et dolore magna aliqua. Ut enim adiqua minim veniam quis nostrud exercitation ullamco</p>
            </div>

            <div className="contact-section-content p-6 md:py-10 md:pr-12 md:pl-0 bg-[#F3EFEE] rounded-[37px] shadow-[7px_28px_50px_23px_rgba(0,0,0,0.1)] relative">
                <div className="flex flex-col md:flex-row">
                    <div className="basis-full md:basis-1/5 order-2 md:order-1">
                        <svg id="violin" ref={violinRef} xmlns="http://www.w3.org/2000/svg" width="334" height="396" viewBox="0 0 334 396" fill="none">
                            <path d="M0.5 366.5C22.0493 366.405 113.039 376.348 109.227 352.791L108.99 292.544C108.99 288.594 111.382 289.308 114.626 289.57C121.209 290.093 122.298 290.307 128.692 289.094C131.226 288.618 132.742 288.904 133.357 291.759C134.139 295.304 130.373 306.749 129.592 311.484C128.266 319.598 125.732 341.751 133.997 346.748C142.072 351.625 158.624 344.939 165.35 339.538C172.691 333.708 180.766 323.857 181.902 314.221C182.85 304.299 179.771 290.641 176.006 281.385C173.448 275.222 170.536 268.797 174.182 262.373C174.703 261.469 174.964 261.112 175.935 260.874C178.161 261.064 173.898 267.774 163.716 258.447C154.315 249.81 148.039 230.132 152.633 217.854C154.599 212.524 157.132 210.953 162.484 209.74C169.967 208.027 167.173 215.903 164 208.955C159.95 200.151 166.984 189.8 167.765 180.425C168.973 165.792 164.592 152.562 152.775 143.378C148.11 139.785 136.317 131.956 130.302 135.002C126.798 136.787 127.911 147.756 128.029 151.491C128.716 168.79 130.35 186.54 130.397 203.815C130.421 206.433 130.776 216.735 128.005 217.735C125.993 218.449 115.999 219.091 113.655 219.139C111.429 219.162 106.859 219.472 105.462 217.33C104.396 215.712 104.751 210.025 104.751 207.86C104.751 191.347 105.248 174.548 105.533 157.987C106.054 125.675 106.622 93.3619 107.285 61.0731C107.356 58.8364 107.522 45.6543 108.777 44.5598C111.5 42.1566 129.924 44.0125 132.268 42.228C133.855 41.0382 134.754 37.9688 138.188 38.9919C141.503 39.9675 142.498 47.201 140.272 48.6048C138.946 49.4376 136.104 49.3187 135.133 47.9624C133.878 46.2016 133.191 46.0588 130.8 46.154C126.064 46.3444 124.998 47.772 124.666 41.3952C124.382 35.0659 124.595 35.2086 118.178 34.6852C114.294 34.3996 93.8581 33.9713 91.2059 35.7321C89.4535 36.8742 89.122 38.8254 91.9399 39.1109C94.3317 39.3488 106.717 40.0151 108.066 38.635C109.842 36.7315 108.777 29.9501 111.334 29.0935C114.152 28.1179 128.432 26.262 130.421 28.2131C132.102 29.9263 132.505 30.997 135.512 30.7353C138.591 30.4736 139.798 27.0948 139.846 24.3822C139.917 21.1938 134.944 16.9108 133.428 20.1706C132.173 22.8594 133.76 23.4542 128.74 23.5732C125.306 23.6684 104.633 23.478 103.496 24.3108C102.501 25.0247 101.578 28.8793 97.2681 27.0472C91.0164 24.3822 93.6449 13.77 99.2099 17.8626C102.454 20.2896 101.246 20.3372 105.533 20.0755C108.185 19.9089 112.471 20.1944 113.347 16.9346C113.963 14.46 113.987 13.6034 114.2 10.9622C114.294 9.86769 114.65 2.65801 115.265 2.13454C116.141 1.39691 122.559 0.0882251 123.127 1.96798C124.24 5.60851 124.785 28.0941 123.056 30.0691C121.399 31.9488 115.313 29.9977 114.697 32.8054C113.797 36.9218 114.058 52.3405 114.058 57.4087C114.129 75.1355 114.129 92.8147 114.294 110.494C114.318 114.301 114.673 131.124 113.134 133.432C111.476 135.859 106.077 136.001 103.378 136.358C76.074 140.546 61.2973 160.367 68.9461 187.564L69.1356 188.254C70.7459 193.893 74.6768 206.932 71.6694 212.286C70.1538 214.975 66.7675 212.571 71.4326 210.763C74.6768 209.502 77.187 211.715 79.4366 213.88C86.1145 220.638 85.3331 226.277 84.8831 235.01C84.5516 241.957 83.6281 255.615 79.9339 261.445C76.2161 266.537 67.3596 271.32 61.4157 267.394C58.432 265.252 59.4976 262.397 64.3521 266.085C71.8589 271.796 67.7621 281.361 65.6072 288.666C60.7527 305.56 59.4266 316.172 70.1302 331.329C78.3947 342.941 90.1165 348.199 104.23 348.009C108.043 347.985 112.234 347.723 113.679 343.702C116.236 336.754 115.076 312.674 115.005 303.632C114.65 253.569 113.655 203.577 113.3 153.538C113.276 151.848 113.276 150.159 113.276 148.47C113.276 147.066 113.016 141.926 114.626 141.76L121.848 141.022C121.067 110.946 122.369 80.3227 121.612 51.1032C120.357 51.0794 119.386 51.0081 118.107 51.1032C117.207 126.674 118.746 201.436 120.641 276.983C120.712 279.671 120.807 282.265 121.091 284.954C126.963 285.216 139.135 283.431 142.024 290.474C144.819 297.327 134.447 304.37 139.798 306.416C146.524 309.034 155.641 291.331 168.57 299.302C175.532 303.609 173.212 310.437 168.902 315.648C162.224 323.786 147.092 335.54 154.172 347.533C159.122 355.932 173.804 355.813 182.471 355.932C189.101 356.027 195.779 355.813 202.457 355.647C217.186 355.314 235.5 346 248.5 366.5C261.5 387 319 405 333 387" stroke="#543F3A" strokeWidth="2" strokeMiterlimit="10" style={{ visibility: "hidden" }} />
                        </svg>
                    </div>
                    <div className="basis-full md:basis-4/5 order-1 md:order-2 mb-10 md:mb-0">
                        <form onSubmit={handleSubmit} className="w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        className="w-full bg-[#FFFFFF] rounded-[15px] border border-[#EBE5E4] placeholder:text-[#543F3A]/40 text-[#543F3A] px-4 py-3 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        className="w-full bg-[#FFFFFF] rounded-[15px] border border-[#EBE5E4] placeholder:text-[#543F3A]/40 text-[#543F3A] px-4 py-3 focus:outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Your Phone"
                                        className="w-full bg-[#FFFFFF] rounded-[15px] border border-[#EBE5E4] placeholder:text-[#543F3A]/40 text-[#543F3A] px-4 py-3 focus:outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <textarea
                                        name="message"
                                        rows={8}
                                        placeholder="Your Message"
                                        className="w-full bg-[#FFFFFF] rounded-[15px] border border-[#EBE5E4] placeholder:text-[#543F3A]/40 text-[#543F3A] px-4 py-3 focus:outline-none"
                                    />
                                </div>
                            </div>
                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                                    ✅ Your message has been sent successfully! We&apos;ll get back to you soon.
                                </div>
                            )}
                            {submitStatus === 'error' && (
                                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                    ❌ {errorMessage}
                                </div>
                            )}
                            
                            <div className="flex justify-center mt-6">
                                <Button 
                                    className="min-w-[149px] cursor-pointer" 
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}