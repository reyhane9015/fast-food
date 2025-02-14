import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

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
        <Image
          src="/assets/peperoni.webp"
          width={450}
          height={450}
          alt="pizza"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/assets/plato.webp" width={480} height={480} alt="pizza" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/assets/pizza.webp" width={440} height={440} alt="pizza" />
      </SwiperSlide>
    </Swiper>
  );
}

export default HomeSwiper;
