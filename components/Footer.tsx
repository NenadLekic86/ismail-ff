"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-[#543F3A]/[.07]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex flex-row flex-wrap md:flex-nowrap items-start justify-start">
                    <div className="basis-full md:basis-1/4 border border-[#543F3A]/[.07] p-3">
                        <Image className="mx-auto" src="/logo.svg" alt="logo" width={140} height={51} />
                    </div>
                    <div className="basis-full md:basis-4/5">
                        <div className="flex flex-row flex-wrap items-stretch justify-start">
                            <div className="basis-1/2 md:basis-1/4 border-r border-l border-b md:border-b-0 border-[#543F3A]/[.07] py-5 md:pb-14 px-3 md:px-8">
                                <h3 className="text-[18px] md:text-[20px] font-bold mb-4">Product Features</h3>
                                <ul className="flex flex-col gap-4 mt-2 list-none">
                                    <li>
                                        <Link className="text-[14px] md:text-[16px] text-[#543F3A]/[.7]" href="/">Music On The Go</Link>
                                    </li>
                                    <li>
                                        <Link className="text-[14px] md:text-[16px] text-[#543F3A]/[.7]" href="/">Collaborate</Link>
                                    </li>
                                    <li>
                                        <Link className="text-[14px] md:text-[16px] text-[#543F3A]/[.7]" href="/">(Un) sheet Music</Link>
                                    </li>
                                    <li>
                                        <Link className="text-[14px] md:text-[16px] text-[#543F3A]/[.7]" href="/">Practice and Perform</Link>
                                    </li>
                                    <li>
                                        <Link className="text-[14px] md:text-[16px] text-[#543F3A]/[.7]" href="/">Musync Intelligence</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="basis-1/2 md:basis-1/4 border-r border-l border-b md:border-b-0 border-[#543F3A]/[.07] py-5 md:pb-14 px-3 md:px-8">
                                <h3 className="text-[18px] md:text-[20px] font-bold mb-4">Company</h3>
                                <ul className="flex flex-col gap-4 mt-2 list-none">
                                    <li>
                                        <Link className="text-[14px] md:text-[16px] text-[#543F3A]/[.7]" href="/">About</Link>
                                    </li>
                                    <li>
                                        <Link className="text-[14px] md:text-[16px] text-[#543F3A]/[.7]" href="/">Why Musync</Link>
                                    </li>
                                    <li>
                                        <Link className="text-[14px] md:text-[16px] text-[#543F3A]/[.7]" href="/">Contact</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="basis-1/2 md:basis-1/4 border-r border-l border-b md:border-b-0 border-[#543F3A]/[.07] py-5 md:pb-14 px-3 md:px-8">
                                <h3 className="text-[18px] md:text-[20px] font-bold mb-4">Help</h3>
                                <ul className="flex flex-col gap-4 mt-2 list-none">
                                    <li>
                                        <Link className="text-[14px] md:text-[16px] text-[#543F3A]/[.7]" href="/">Tutorial Videos</Link>
                                    </li>
                                    <li>
                                        <Link className="text-[14px] md:text-[16px] text-[#543F3A]/[.7]" href="/">Wiki</Link>
                                    </li>
                                    <li>
                                        <Link className="text-[14px] md:text-[16px] text-[#543F3A]/[.7]" href="/">FAQ</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="basis-1/2 md:basis-1/4 border-r border-l border-b md:border-b-0 border-[#543F3A]/[.07] py-5 md:pb-14 px-3 md:px-8">
                                <h3 className="text-[18px] md:text-[20px] font-bold mb-4">Pricing</h3>
                                {/* <ul className="flex flex-col gap-2 mt-2 list-none">
                                    <li>
                                        <Link href="/">Music On The Go</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Collaborate</Link>
                                    </li>
                                    <li>
                                        <Link href="/">(Un) sheet Music</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Practice and Perform</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Musync Intelligence</Link>
                                    </li>
                                </ul> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-[#543F3A]/[.07]" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex flex-row flex-wrap items-center justify-center md:justify-between py-5 md:py-10">
                    <div className="basis-full md:basis-1/2">
                        <p className="text-sm text-[#543F3A]/[.5] text-center md:text-left mb-4 md:mb-0">© 2025 Musync. All rights reserved.</p>
                    </div>
                    <div className="basis-full md:basis-1/2">
                        <ul className="flex flex-row items-center justify-center md:justify-end gap-4">
                            <li className="cursor-pointer bg-[#543F3A] rounded-full p-2 hover:bg-[#543F3A]/[.7] transition-all duration-300 hover:scale-110 flex items-center justify-center w-[32px] h-[32px]">
                                <Link href="/"><Image src="/facebook.svg" alt="facebook" width={10} height={10} /></Link>
                            </li>
                            <li className="cursor-pointer bg-[#543F3A] rounded-full p-2 hover:bg-[#543F3A]/[.7] transition-all duration-300 hover:scale-110 flex items-center justify-center w-[32px] h-[32px]">
                                <Link href="/"><Image src="/twitterX.svg" alt="twitterX" width={16} height={16} /></Link>
                            </li>
                            <li className="cursor-pointer bg-[#543F3A] rounded-full p-2 hover:bg-[#543F3A]/[.7] transition-all duration-300 hover:scale-110 flex items-center justify-center w-[32px] h-[32px]">
                                <Link href="/"><Image src="/youtube.svg" alt="youtube" width={16} height={16} /></Link>
                            </li>
                            <li className="cursor-pointer bg-[#543F3A] rounded-full p-2 hover:bg-[#543F3A]/[.7] transition-all duration-300 hover:scale-110 flex items-center justify-center w-[32px] h-[32px]">
                                <Link href="/"><Image src="/linkedin.svg" alt="linkedin" width={16} height={16} /></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}