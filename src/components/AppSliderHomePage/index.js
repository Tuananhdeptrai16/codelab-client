import React, { useRef } from 'react'
import Slider from 'react-slick'
import { SETTING_SLIDE } from '../../services/settingConfig';
import { IconArrowLeft, IconArrowRight } from '../../assets/icon';

const AppSliderHomePage = ({slides}) => {
     const slideRef = useRef(null);
      const handleNextSlide = () => {
        if (slideRef.current) {
          slideRef.current.slickNext();
        }
      };
      const handlePrevSlide = () => {
        if (slideRef.current) {
          slideRef.current.slickPrev();
        }
      };
  return (
    <div className="slide">
    <div className="slider-container">
      <Slider ref={slideRef} {...SETTING_SLIDE}>
        {slides.map((slider) => (
          <div key={slider.id} className="slide__item">
            <figure className="slide__image">
              <img
                src={`${process.env.PUBLIC_URL}${slider.img}`}
                alt=""
                className="slide__image--img"
              />
            </figure>
          </div>
        ))}
      </Slider>
    </div>
  
    <div className="slide__action">
      <button
        onClick={handlePrevSlide}
        className="slide__button slide__prev"
      >
        <IconArrowLeft/>
      </button>
      <button
        onClick={handleNextSlide}
        className="slide__button slide__next"
      >
        <IconArrowRight/>
      </button>
    </div>
  </div>
  )
}

export default AppSliderHomePage