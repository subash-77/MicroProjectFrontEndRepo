import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "./Residencies.css";
import data from "../utils/slider.json";
import { sliderSettings } from "../utils/common";

const Residencies = () => {
  return (
    <section className="r-wrapper" id="services">
      <div className="paddings innerWidth r-container">
        <div className="r-head  justify-center text-center">
          <div className="justify-center text-center">
          <span className="orangeText " role="H1">Empowering You to Access Quality Psychiatric Care</span>
          </div>
          <br></br>
          <span className="secondaryText " role="H2">Our telepsychiatry services management systems provide a seamless and convenient way to receive psychiatric care remotely. With features such as appointment scheduling, electronic health records (EHR), and patient engagement tools, we aim to improve access to mental health care and overcome barriers to seeking help.</span>
        </div>
        <Swiper {...sliderSettings}>
            <SliderButtons/> 
          {data.map((card, i) => (
            <SwiperSlide key={i}>
              <div className="flexColStart r-card ">
                <img src={card.image} alt="home" />

                <span className="secondaryText r-price">
                  {/* <span style={{ color: "orange" }}>$</span>
                  <span>{card.price}</span> */}
                </span>
                <span className="primaryText">{card.name}</span>
                <span className="secondaryText">{card.detail}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Residencies;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className=" flexCenter r-buttons">
      <button onClick={()=> swiper.slidePrev()}>&lt;</button>
      <button onClick={()=> swiper.slideNext()}>&gt;</button>
    </div>
  );
};
