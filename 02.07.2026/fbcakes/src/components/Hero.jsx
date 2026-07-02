import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react'
import 'swiper/css';
import './Hero.css'

import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function Hero() {
    const [swiperInstance, setSwiperInstance] = useState(null);

    const slideImg = [
        {
            id: 1,
            url: 'https://bizdomfs.blob.core.windows.net/post-image/9b3cee35-ba47-44f8-9a38-f5a19d3cc4b3.png'
        },
        {
            id: 2,
            url: 'https://bizdomfs.blob.core.windows.net/post-image/0834e8bc-c28d-4ec2-9f59-1d9d5c7c5321.png'
        },
    ];

    return (
        <section className='fullwidth posiiton-relative'>
            <Swiper
                slidesPerView={1}
                loop={true}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => {
                    console.log(swiper);
                    setSwiperInstance(swiper);
                }}
                className='position-relative'
            >
                {slideImg.map(img => {
                    return <SwiperSlide key={img.id}>
                        <div className='slide position-relative' style={{ backgroundImage: `url(${img.url})` }}>
                            <div className='hero position-absolute w-50 text-center'>
                                <p className='lato'>Welcome to FB</p>
                                <h1 className='herotext'>FRUITS AND BAKES</h1>
                                <button className='brand-btn p-2 px-3 text-white'>SHOP NOW</button>
                            </div>
                        </div>
                    </SwiperSlide>
                })}

            </Swiper>
            <button
                className='left position-absolute'
                onClick={() => swiperInstance?.slidePrev()}
            >
                <MdOutlineKeyboardArrowLeft />
            </button>

            <button
                className='right position-absolute'
                onClick={() => swiperInstance?.slideNext()}
            >
                <MdOutlineKeyboardArrowRight />
            </button>
        </section>
    )
}
