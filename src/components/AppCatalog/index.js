import React from 'react'
import { useContextAction, useContextProvider } from '../../ProviderContext/AppContextProvider';

const AppCatalog = () => {
  const {showCatalog} = useContextProvider();
  const {setShowCatalog} = useContextAction();
  return (
    <div className="catalog">
          <div className="row catalog__wrap">
            <div className="col-7 col-xl-12">
              <h2 className="catalog__heading">
                Chào mừng các bạn đến với Website học trực tuyến CodeLab
              </h2>
              <p className="catalog__desc">
                CodeLab hi vọng với những khóa học hữu ích tại hệ thống CodeLab
                sẽ giúp các bạn nắm vững kiến thức trên con đường trở thành lập
                trình viên chuyên nghiệp
              </p>
              <div className="catalog__btn">
                {/* <button className="catalog__button">
                  Nhận 10 sao ngày hôm nay
                </button> */}
              </div>
            </div>
            <div className="col-5 col-xl-12 catalog__img">
              <img
                src={`${process.env.PUBLIC_URL}/images/catalog/catalog.gif`}
                alt="catalog__icon"
                className="catalog__icon"
              />
            </div>
          </div>
          <button
            onClick={() => {
              setShowCatalog(!showCatalog);
            }}
            className="catalog__cancel"
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/icon/cancel.svg`}
              alt="cancel"
              className="catalog__icon--cancel"
            />
          </button>
        </div>
  )
}

export default AppCatalog