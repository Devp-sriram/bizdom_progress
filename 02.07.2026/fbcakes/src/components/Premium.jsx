import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import useDeviceDetect from '../hooks/useDevice';
import './Premium.css'
import 'swiper/css';
import { MdHeight } from 'react-icons/md';
function Premium() {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const decvice = useDeviceDetect()
  const slideImg = [
    {
      id: 1,
      url: 'https://bizdomfs.blob.core.windows.net/post-image/0fc72433-0a56-4518-955c-17d2882177b9.webp',
      name: 'Nutella Delight',
      qty: "1 kg + 1 kg FREE -",
      price: " ₹ 1390 "
    },
    {
      id: 2,
      url: 'https://bizdomfs.blob.core.windows.net/post-image/23f7d20d-7886-4a99-9d5e-a9218a223acd.webp',
      name: 'Dead By Chocolate',
      qty: "1 kg + 1 kg FREE -",
      price: " ₹ 1390 "
    },
    {
      id: 3,
      url: 'https://bizdomfs.blob.core.windows.net/post-image/23f7d20d-7886-4a99-9d5e-a9218a223acd.webp',
      name: 'Red Velvet',
      qty: "1 kg + 1 kg FREE -",
      price: " ₹ 1299 "
    },
    {
      id: 1,
      url: 'https://bizdomfs.blob.core.windows.net/post-image/0fc72433-0a56-4518-955c-17d2882177b9.webp',
      name: 'Nutella Delight',
      qty: "1 kg + 1 kg FREE - ",
      price: " ₹ 1390 "
    },
    {
      id: 2,
      url: 'https://bizdomfs.blob.core.windows.net/post-image/23f7d20d-7886-4a99-9d5e-a9218a223acd.webp',
      name: 'Dead By Chocolate',
      qty: "1 kg + 1 kg FREE - ",
      price: " ₹ 1390 "
    },
    {
      id: 3,
      url: 'https://bizdomfs.blob.core.windows.net/post-image/23f7d20d-7886-4a99-9d5e-a9218a223acd.webp',
      name: 'Red Velvet',
      qty: "1 kg + 1 kg FREE -",
      price: " ₹ 1299 "
    }
  ]
  return (
    <div>
      <p className="special">special offer</p>
      <h1 className="text-bold">PREMIUM PRODUCTS</h1>
      <p>Each slice of our premium cakes is a masterpiece, combining rich flavors and the finest ingredients <br />to elevate your celebrations. Whether it's a birthday, anniversary, or any special occasion, indulge in <br /> the sweetness of perfection and make your moments unforgettable!</p>
      <Swiper
        spaceBetween={50}
        slidesPerView={decvice === 'Mobile Screen' ? 1 : 4}
        loop={true}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
        }}
      >
        {slideImg.map(img => {
          return <SwiperSlide key={img.id} className='pre-slide'>
            <img src={img.url} />
            <h4 className='my-1'>{img.name}</h4>
            <div className='d-flex gap-2 priceText'>
              <p>{img.qty}</p>
              <p>{img.price}</p>
            </div>
          </SwiperSlide>
        })}

      </Swiper>
    </div>
  )
}

export default Premium
