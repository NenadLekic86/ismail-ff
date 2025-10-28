"use client";

import React from 'react';
import Image from 'next/image';
import { ButtonLink } from "./Buttons";
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function VideoLib() {
    return (
        <section className="video-lib-section mx-auto max-w-7xl px-4 sm:px-6 mt-32 mb-20 md:my-40 relative">
            <h2 className="text-4xl md:text-5xl font-semibold text-center md:text-start mb-10 md:hidden">Video Library Highlight</h2>

            {/* Tablet/Desktop View */}
            <div className="video-lib-container-desktop hidden md:block">
                <div className="flex flex-row items-center justify-between mb-10">
                    <div className="video-lib-title-desktop hidden md:block">
                        <h2 className="text-4xl md:text-5xl font-semibold text-center md:text-start">Video Library Highlight</h2>
                    </div>
                    <div className="video-lib-content">
                        <ButtonLink href="#" className="min-w-[185px]">
                            See More
                        </ButtonLink>
                    </div>
                </div>

                <div className="video-lib-content-desktop">
                    <div className="flex flex-row flex-wrap align-start justify-center gap-5">
                        <div className="basis-[48.5%]">
                            <div className="blog-video-bg relative rounded-xl w-full h-[362px]" style={{ backgroundImage: "url('/video-lib-img1.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <Link href="/"><Image src="/play-btn.svg" alt="Image" width={95} height={95} className="transition-all duration-300 hover:scale-110 hover:rotate-120" /></Link>
                                </div>
                            </div>
                            <div className="video-lib-content-desktop-item-text mt-5 mb-2">
                                <h4 className="text-2xl font-medium mb-2">Tutorial Title Here</h4>
                                <p className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices tortor, vel lobortis nunc aliquet posuere...</p>
                            </div>
                        </div>
                        <div className="basis-[48.5%]">
                            <div className="blog-video-bg relative rounded-xl w-full h-[362px]" style={{ backgroundImage: "url('/video-lib-img2.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <Link href="/"><Image src="/play-btn.svg" alt="Image" width={95} height={95} className="transition-all duration-300 hover:scale-110 hover:rotate-120" /></Link>
                                </div>
                            </div>
                            <div className="video-lib-content-desktop-item-text mt-5 mb-2">
                                <h4 className="text-2xl font-medium mb-2">Tutorial Title Here</h4>
                                <p className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices tortor, vel lobortis nunc aliquet posuere...</p>
                            </div>
                        </div>
                        <div className="basis-[48.5%]">
                            <div className="blog-video-bg relative rounded-xl w-full h-[362px]" style={{ backgroundImage: "url('/video-lib-img3.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <Link href="/"><Image src="/play-btn.svg" alt="Image" width={95} height={95} className="transition-all duration-300 hover:scale-110 hover:rotate-120" /></Link>
                                </div>
                            </div>
                            <div className="video-lib-content-desktop-item-text mt-5 mb-2">
                                <h4 className="text-2xl font-medium mb-2">Tutorial Title Here</h4>
                                <p className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices tortor, vel lobortis nunc aliquet posuere...</p>
                            </div>
                        </div>
                        <div className="basis-[48.5%]">
                            <div className="blog-video-bg relative rounded-xl w-full h-[362px]" style={{ backgroundImage: "url('/video-lib-img4.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <Link href="/"><Image src="/play-btn.svg" alt="Image" width={95} height={95} className="transition-all duration-300 hover:scale-110 hover:rotate-120" /></Link>
                                </div>
                            </div>
                            <div className="video-lib-content-desktop-item-text mt-5 mb-2">
                                <h4 className="text-2xl font-medium mb-2">Tutorial Title Here</h4>
                                <p className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices tortor, vel lobortis nunc aliquet posuere...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Mobile View */}
            <div className="video-lib-container md:hidden">
                <Swiper 
                    slidesPerView={1}
                    spaceBetween={20}
                    className="video-lib-swiper"
                >
                    <SwiperSlide>
                        <div className="blog-video-bg relative rounded-xl w-full h-[214px]" style={{ backgroundImage: "url('/video-lib-img1.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Link href="/"><Image src="/play-btn.svg" alt="Image" width={48} height={48} /></Link>
                            </div>
                        </div>
                        <div className="video-lib-content-desktop-item-text mt-5 mb-2">
                            <h4 className="text-2xl font-medium mb-2">Tutorial Title Here</h4>
                            <p className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices tortor, vel lobortis nunc aliquet posuere...</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="blog-video-bg relative rounded-xl w-full h-[214px]" style={{ backgroundImage: "url('/video-lib-img2.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Link href="/"><Image src="/play-btn.svg" alt="Image" width={48} height={48} /></Link>
                            </div>
                        </div>
                        <div className="video-lib-content-desktop-item-text mt-5 mb-2">
                            <h4 className="text-2xl font-medium mb-2">Tutorial Title Here</h4>
                            <p className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices tortor, vel lobortis nunc aliquet posuere...</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="blog-video-bg relative rounded-xl w-full h-[214px]" style={{ backgroundImage: "url('/video-lib-img3.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Link href="/"><Image src="/play-btn.svg" alt="Image" width={48} height={48} /></Link>
                            </div>
                        </div>
                        <div className="video-lib-content-desktop-item-text mt-5 mb-2">
                            <h4 className="text-2xl font-medium mb-2">Tutorial Title Here</h4>
                            <p className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices tortor, vel lobortis nunc aliquet posuere...</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="blog-video-bg relative rounded-xl w-full h-[214px]" style={{ backgroundImage: "url('/video-lib-img4.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Link href="/"><Image src="/play-btn.svg" alt="Image" width={48} height={48} /></Link>
                            </div>
                        </div>
                        <div className="video-lib-content-desktop-item-text mt-5 mb-2">
                            <h4 className="text-2xl font-medium mb-2">Tutorial Title Here</h4>
                            <p className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices tortor, vel lobortis nunc aliquet posuere...</p>
                        </div>
                    </SwiperSlide>
                </Swiper>

                <div className="video-lib-content mt-6 text-center">
                    <ButtonLink href="#" className="min-w-[185px]">
                        See More
                    </ButtonLink>
                </div>
            </div>
        </section>
    );
}