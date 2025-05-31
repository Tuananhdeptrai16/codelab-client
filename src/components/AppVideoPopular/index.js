import React from 'react'
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { SETTING_POPULAR } from '../../services/settingConfig';

const AppVideoPopular = ({videos}) => {
  return (
    <div className="popular">
    <div className="popular__top">
      <div className="popular__top--left">
        <h2 className="popular__heading">Video thịnh hành</h2>
        <p className="popular__desc">
          Khám phá video giải trí về lập trình để nâng cao kiến thức và kỹ
          năng một cách hiệu quả."
        </p>
      </div>
    </div>
    <div className="popular__list">
      <div className="slider-container">
        <Slider {...SETTING_POPULAR}>
          {videos.map((video) => {
            return (
              <div key={video.id} className="popular__item">
                <div className="popular__item--wrap">
                  <div className="popular__pictures">
                    <a
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="popular__img"
                      />
                    </a>
                  </div>
                  <div className="popular__content">
                    <div className="popular__date">
                      <span>{video.date}</span>
                    </div>
                    <div className="separate"></div>
                    <Link to={video.link}>
                      <p className="popular__title line-clamp">
                        {video.title}
                      </p>
                    </Link>
                    <div className="popular__link">
                      <img
                        src={`${process.env.PUBLIC_URL}/images/icon/link.svg`}
                        alt="link"
                        className="popular__link--icon icon"
                      />
                      <p className="popular__text">youtube.com</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  </div>
  )
}

export default AppVideoPopular