import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // If you need autoplay styles

// import required modules
import { Navigation, Autoplay } from "swiper/modules";

const HomeBanner = () => {
  return (
    <div className="mt-3 bannerContainer">
      <div className="homeBannerSection">
        <Swiper
          slidesPerView={1}
          spaceBetween={15}
          navigation={true}
          loop={false}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper" // This className was in the image, you can style it in your CSS
        >
            <SwiperSlide>
            <div className="item w-400">
              {/* Replace with your actual image paths */}
              <img src="https://dosi-in.com/file/detailed/136/dosiin-126253380_437533484303849_900920589411862419_n136514.jpg?w=1200&h=500&fit=crop&fm=webp
" alt="" className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">
              {/* Replace with your actual image paths */}
              <img src="https://dosi-in.com/file/detailed/136/dosiin-126253380_437533484303849_900920589411862419_n136514.jpg?w=1200&h=500&fit=crop&fm=webp
" alt="" className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">
              <img src="https://dosi-in.com/file/detailed/136/dosiin-126253380_437533484303849_900920589411862419_n136514.jpg?w=1200&h=500&fit=crop&fm=webp
" alt="" className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">
              <img src="https://dosi-in.com/file/detailed/136/dosiin-126253380_437533484303849_900920589411862419_n136514.jpg?w=1200&h=500&fit=crop&fm=webp
" alt="" className="w-100" />
            </div>
          </SwiperSlide>
          {/* Add more SwiperSlide components for additional slides */}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeBanner;
