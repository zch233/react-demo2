import React from 'react';
import SwiperCore, { EffectFade, Keyboard, Lazy, Pagination, Scrollbar, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { Link } from 'react-router-dom';

SwiperCore.use([Pagination, Scrollbar, Virtual, Keyboard, Lazy, EffectFade]);
const Banner: React.FC = () => {
  return (
    <Swiper lazy virtual autoplay={{ delay: 3000 }} fadeEffect={{ crossFade: true }} pagination={{ clickable: true }}>
      <SwiperSlide>
        <Link to={'/user/vip'}>
          <img width={'100%'} src={require('../../assert/home/banner1.jpg')} alt="" />
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <img width={'100%'} src={require('../../assert/home/banner2.jpg')} alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img width={'100%'} src={require('../../assert/home/banner3.jpg')} alt="" />
      </SwiperSlide>
    </Swiper>
  );
};
export default Banner;
