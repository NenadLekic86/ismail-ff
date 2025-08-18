"use client";

import React from 'react';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/grid';
import { Scrollbar, Grid } from 'swiper/modules';

export default function OurSocialsSection() {
    return (
        <section className="our-socials-section mx-auto relative">
            <h2 className="text-4xl md:text-5xl font-semibold text-center mb-10">Our Socials</h2>

            <div className="our-socials-container relative">
                <Swiper
                    scrollbar={{
                        hide: true,
                    }}
                    modules={[Scrollbar, Grid]}
                    spaceBetween={2}
                    slidesPerView={1}
                    grid={{
                        rows: 2,
                        fill: 'row',
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                            grid: {
                                rows: 2,
                                fill: 'row',
                            },
                        },
                        1024: {
                            slidesPerView: 5,
                            grid: {
                                rows: 2,
                                fill: 'row',
                            },
                        },
                    }}
                    className="our-socials-swiper"
                >
                    <SwiperSlide>
                        <div className="our-socials-card">
                            <Image src="/image-6.webp" alt="Image1" width={285} height={285} className="w-full h-full object-cover" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="our-socials-card">
                           <Image src="/image-7.webp" alt="Image1" width={285} height={285} className="w-full h-full object-cover" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="our-socials-card">
                            <Image src="/image-8.webp" alt="Image1" width={285} height={285} className="w-full h-full object-cover" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="our-socials-card">
                            <Image src="/image-9.webp" alt="Image1" width={285} height={285} className="w-full h-full object-cover" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="our-socials-card">
                            <Image src="/image-5.webp" alt="Image1" width={285} height={285} className="w-full h-full object-cover" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="our-socials-card">
                            <Image src="/image.webp" alt="Image" width={285} height={285} className="w-full h-full object-cover" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="our-socials-card">
                            <Image src="/image-1.webp" alt="Image" width={285} height={285} className="w-full h-full object-cover" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="our-socials-card">
                            <Image src="/image-2.webp" alt="Image" width={285} height={285} className="w-full h-full object-cover" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="our-socials-card">
                            <Image src="/image-3.webp" alt="Image" width={285} height={285} className="w-full h-full object-cover" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="our-socials-card">
                            <Image src="/image-4.webp" alt="Image" width={285} height={285} className="w-full h-full object-cover" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
}