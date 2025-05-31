import React, { forwardRef } from 'react'

const AppModalNotification = forwardRef((props, bellRef) => {
    return (
      <div className="header__bell" ref={bellRef}>
      <div className="header__bell--wrap">
        <div className="header__bell--top">
          <h3 className="header__bell--title">Thông báo</h3>
          <span className="header__flag">
            Đánh dấu đọc tất cả
          </span>
        </div>
        <div className="header__bell--list">
          <div className="header__bell--item">
            <div className="header__bell--avatar">
              <img
                src={`${process.env.PUBLIC_URL}/images/layout/avatar.png`}
                alt=""
                className="header__bell--img"
              />
            </div>
            <div className="header__bell--content">
              <p className="header__bell--notification">
                Bài học
                <strong>
                  Mở event đua TOP trả lời câu hỏi
                </strong>
                mới được thêm vào.
              </p>
              <p className="header__bell--date">
                9 ngày trước
              </p>
            </div>
          </div>
          <div className="header__bell--item">
            <div className="header__bell--avatar">
              <img
                src={`${process.env.PUBLIC_URL}/images/layout/avatar.png`}
                alt=""
                className="header__bell--img"
              />
            </div>
            <div className="header__bell--content">
              <p className="header__bell--notification">
                Bài học
                <strong>
                  Mở event đua TOP trả lời câu hỏi{" "}
                </strong>
                mới được thêm vào.
              </p>
              <p className="header__bell--date">
                9 ngày trước
              </p>
            </div>
          </div>
          <div className="header__bell--item">
            <div className="header__bell--avatar">
              <img
                src={`${process.env.PUBLIC_URL}/images/layout/avatar.png`}
                alt=""
                className="header__bell--img"
              />
            </div>
            <div className="header__bell--content">
              <p className="header__bell--notification line-clamp">
                Bài học
                <strong>
                  Mở event đua TOP trả lời câu hỏi{" "}
                </strong>
                mới được thêm vào.
              </p>
              <p className="header__bell--date">
                9 ngày trước
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  })

export default AppModalNotification