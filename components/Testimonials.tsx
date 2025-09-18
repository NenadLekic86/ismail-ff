"use client";

 import React from 'react';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function Testimonials() {
    return (
        <section className="testimonials-section mx-auto max-w-7xl px-4 sm:px-6 my-20 lg:my-44 relative">
            <h2 className="text-4xl md:text-5xl font-semibold text-center lg:text-start mb-10">Testimonials</h2>

            <div className="testimonials-container relative">
	                <div className="absolute top-auto left-1/2 -bottom-20 -translate-x-1/2 lg:bottom-auto lg:translate-x-0 lg:left-auto lg:-top-22 lg:right-0 z-10 flex items-center gap-3">
	                    <button type="button" aria-label="Previous testimonial" className="testimonials-prev cursor-pointer p-2">
	                        <Image src="/long-arrow-r.svg" alt="Previous" width={64} height={32} className="w-16 h-8 rotate-180" />
	                    </button>
	                    <button type="button" aria-label="Next testimonial" className="testimonials-next cursor-pointer p-2">
	                        <Image src="/long-arrow-r.svg" alt="Next" width={64} height={32} className="w-16 h-8" />
	                    </button>
	                </div>
                <Swiper
                    spaceBetween={24}
                    loop={true}
                    centeredSlides={true}
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 16 },
                        1024: { slidesPerView: 3, spaceBetween: 20 },
                    }}
	                    navigation={{ nextEl: '.testimonials-next', prevEl: '.testimonials-prev' }}
                    modules={[Navigation]}
                    className="testimonials-swiper"
                >
                    <SwiperSlide>
                        <div className="testimonial-card">
                            <div className="testimonial-card-content px-5 pt-9 pb-14 rounded-[37px] bg-[#F3EFEE] shadow-[7px_28px_50px_23px_rgba(0,0,0,0.1)]">
                                <div className="testimonial-stars flex flex-row flex-nowrap gap-1">
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                </div>
                                <p className="testimonial-card-text text-base my-7">
                                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum nunc nullam rutrum sed sollicitudin euismod nisl phasellus sit. Odio felis, pellentesque viverra amet habitasse.”
                                </p>    
                                <div className="testimonial-card-author">
                                    <div className="testimonial-card-author-info">
                                        <h3 className="testimonial-card-author-name">User Name</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="testimonial-card">
                            <div className="testimonial-card-content px-5 pt-9 pb-14 rounded-[37px] bg-[#F3EFEE] shadow-[7px_28px_50px_23px_rgba(0,0,0,0.1)]">
                                <div className="testimonial-stars flex flex-row flex-nowrap gap-1">
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                </div>
                                <p className="testimonial-card-text text-base my-7">
                                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum nunc nullam rutrum sed sollicitudin euismod nisl phasellus sit. Odio felis, pellentesque viverra amet habitasse.”
                                </p>    
                                <div className="testimonial-card-author">
                                    <div className="testimonial-card-author-info">
                                        <h3 className="testimonial-card-author-name">User Name</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="testimonial-card">
                            <div className="testimonial-card-content px-5 pt-9 pb-14 rounded-[37px] bg-[#F3EFEE] shadow-[7px_28px_50px_23px_rgba(0,0,0,0.1)]">
                                <div className="testimonial-stars flex flex-row flex-nowrap gap-1">
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/fade-star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                </div>
                                <p className="testimonial-card-text text-base my-7">
                                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum nunc nullam rutrum sed sollicitudin euismod nisl phasellus sit. Odio felis, pellentesque viverra amet habitasse.”
                                </p>    
                                <div className="testimonial-card-author">
                                    <div className="testimonial-card-author-info">
                                        <h3 className="testimonial-card-author-name">User Name</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="testimonial-card">
                            <div className="testimonial-card-content px-5 pt-9 pb-14 rounded-[37px] bg-[#F3EFEE] shadow-[7px_28px_50px_23px_rgba(0,0,0,0.1)]">
                                <div className="testimonial-stars flex flex-row flex-nowrap gap-1">
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                </div>
                                <p className="testimonial-card-text text-base my-7">
                                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum nunc nullam rutrum sed sollicitudin euismod nisl phasellus sit. Odio felis, pellentesque viverra amet habitasse.”
                                </p>    
                                <div className="testimonial-card-author">
                                    <div className="testimonial-card-author-info">
                                        <h3 className="testimonial-card-author-name">User Name</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="testimonial-card">
                            <div className="testimonial-card-content px-5 pt-9 pb-14 rounded-[37px] bg-[#F3EFEE] shadow-[7px_28px_50px_23px_rgba(0,0,0,0.1)]">
                                <div className="testimonial-stars flex flex-row flex-nowrap gap-1">
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                </div>
                                <p className="testimonial-card-text text-base my-7">
                                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum nunc nullam rutrum sed sollicitudin euismod nisl phasellus sit. Odio felis, pellentesque viverra amet habitasse.”
                                </p>    
                                <div className="testimonial-card-author">
                                    <div className="testimonial-card-author-info">
                                        <h3 className="testimonial-card-author-name">User Name</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="testimonial-card">
                            <div className="testimonial-card-content px-5 pt-9 pb-14 rounded-[37px] bg-[#F3EFEE] shadow-[7px_28px_50px_23px_rgba(0,0,0,0.1)]">
                                <div className="testimonial-stars flex flex-row flex-nowrap gap-1">
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                    <Image src="/fade-star-icon.svg" alt="Star" width={20} height={20} className="testimonial-star" />
                                </div>
                                <p className="testimonial-card-text text-base my-7">
                                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum nunc nullam rutrum sed sollicitudin euismod nisl phasellus sit. Odio felis, pellentesque viverra amet habitasse.”
                                </p>    
                                <div className="testimonial-card-author">
                                    <div className="testimonial-card-author-info">
                                        <h3 className="testimonial-card-author-name">User Name</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
}