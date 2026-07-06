import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react'
import 'swiper/css';
import './Hero.css'

import banner1 from '../assets/banners/1.jpg';
import banner2 from '../assets/banners/2.jpg';
import banner3 from '../assets/banners/3.jpg';
import banner4 from '../assets/banners/4.jpg';
import banner5 from '../assets/banners/5.jpg';

import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
    const [swiperInstance, setSwiperInstance] = useState(null);
    const navigate = useNavigate()
    const slideImg = [
        {
            id: 1,
            url: banner1
        },
        {
            id: 2,
            url: banner2
        },
         {
            id: 3,
            url: banner3
        },
         {
            id: 4,
            url: banner4
        },
         {
            id: 5,
            url: banner5
        },
    ];

    return (
        <section className='mt-5'>
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
                                <button onClick={()=>navigate('/products')} className='btn btn-primary p-2 px-3 text-white'>SHOP NOW</button>
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
