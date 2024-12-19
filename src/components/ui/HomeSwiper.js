

import Image from "next/image";

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';



function HomeSwiper() {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
        >
            <SwiperSlide className="flex justify-center items-center">
            <Image src="/Food.png" width={500} height={500} alt="pizza" />
            </SwiperSlide>
            <SwiperSlide>
            <Image src="/plato.png" width={450} height={450} alt="pizza" />
            </SwiperSlide>
            <SwiperSlide>
            <Image src="/pizza.png" width={400} height={400} alt="pizza" />
            </SwiperSlide>
      </Swiper>
    )
}


export default HomeSwiper;