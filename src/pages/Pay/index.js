import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../../ProviderContext/AppContextProvider";

const Pay = () => {
  const [timeLeft, setTimeLeft] = useState(600);
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const { targetCourses } = useContextProvider();
  const [courses, setCourses] = useState(null);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          navigate("/home");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [navigate]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BACKEND_URL}/courses?populate=lessonInfo`
        );
        const foundCourses = res.data.data.find(
          (item) => item._id === targetCourses
        );
        setCourses(foundCourses);
      } catch (error) {
        if (error.message === "Network Error") {
          console.log("Không có mạng");
        }
        console.error("Error fetching courses:", error);
      }
    };

    if (targetCourses) {
      getCourses();
    }
  }, [targetCourses]);

  // Format thời gian countdown
  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `00:${min}:${sec}`;
  };

  // Nếu courses chưa tải, hiển thị loading
  if (!courses) {
    return <div>Đang tải...</div>;
  }

  const priceCourse = courses?.price?.amount;
  const contentCourse = courses?._id;

  return (
    <div className="payment">
      <div className="payment__timer">
        <span>
          Đơn hàng sẽ bị huỷ sau:{" "}
          <span className="payment__countdown">{formatTime(timeLeft)}</span>
        </span>
      </div>

      <div className="payment__content">
        <h2>Quét mã QR để thanh toán</h2>
        <p>
          Mở app ngân hàng và quét mã QR. Đảm bảo nội dung chuyển khoản là{" "}
          <strong className="highlight">{contentCourse}</strong>.
        </p>

        <div className="payment__qr">
          <img
            alt="QR code"
            src={`https://qr.sepay.vn/img?acc=VQRQACFYO2408&bank=MBBank&amount=${2000}&des=${contentCourse}`}
          />
        </div>

        <div className="payment__info">
          <div className="info-item">
            <span className="label">Ngân hàng</span>
            <span className="value">
              <strong>MBBank</strong>
            </span>
          </div>

          <div className="info-item">
            <span className="label">Số tài khoản</span>
            <span className="value">0123456789</span>
          </div>

          <div className="info-item">
            <span className="label">Tên tài khoản</span>
            <span className="value">CodeLab</span>
          </div>

          <div className="info-item">
            <span className="label">Số tiền</span>
            <span className="value">{formatPrice(priceCourse)}</span>
          </div>

          <div className="info-item">
            <span className="label">Nội dung</span>
            <span className="value highlight">{contentCourse}</span>
          </div>
        </div>
      </div>

      <p className="payment__note">
        Lưu ý: Nếu đơn hàng của bạn không tự động kích hoạt sau khi chuyển khoản
        5 phút, vui lòng liên hệ với CodeLab để được hỗ trợ.
      </p>
    </div>
  );
};

export default Pay;
