import { Button, Image, Modal } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PayCourse = ({ courses, payCourse, setPayCourse }) => {
  const naviagte = useNavigate();
  const handleCancel = () => {
    setPayCourse(false);
  };
  const hanldPay = () => {
    return naviagte("/pay");
  };
  return (
    <>
      <Modal
        open={payCourse}
        onCancel={handleCancel}
        footer={null}
        width={1000}
        title={"Phiếu thanh toán"}
      >
        <div className="checkout">
          <div className="checkout__content">
            <div className="checkout__left">
              <Image
                src={courses.courseImage}
                alt={`Hinh an ${courses.courseImage}`}
                className="detail__img"
              />
              <h1 className="checkout__title">{courses.title}</h1>
              <p className="checkout__description">{courses.description}</p>
              <p level={2} className="checkout__subtitle">
                Bạn nhận được gì từ khóa học này?
              </p>
              <ul className="checkout__benefits">
                {courses.lessonInfo.content}
              </ul>
            </div>

            <div className="checkout__right">
              <div className="checkout__box">
                <h2 className="checkout__box-title">Chi tiết tahnh táon</h2>
                <div className="checkout__item">
                  <span>Khóa học HTML CSS Pro</span>
                  <div className="checkout__price">
                    {/* <span className="checkout__price-original">2.500.000đ</span> */}
                    <span className="checkout__price-sale">
                      {courses.price.amount} {courses.price.currency}
                    </span>
                  </div>
                </div>

                <div className="checkout__discount">
                  <input type="text" placeholder="Nhập mã giảm giá" />
                  <Button type="primary">Áp dụng</Button>
                </div>

                <Link to="" className="checkout__view-codes">
                  Xem danh sách mã giảm giá
                </Link>

                <div className="checkout__total">
                  <span>Tổng</span>
                  <span>
                    {courses.price.amount} {courses.price.currency}
                  </span>
                </div>

                <Button onClick={hanldPay} type="primary">
                  Tiếp tục thanh toán
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PayCourse;
