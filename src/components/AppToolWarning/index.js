import { useEffect } from 'react';

const DevToolsWarning = () => {
  useEffect(() => {
    // In cảnh báo vào console khi component mount (tức là khi reload)
    console.log(
      '%cCẢNH BÁO!',
      'color: red; font-size: 40px; font-weight: bold; text-shadow: 1px 1px 0 black;'
    );
    console.log(
      '%cBạn đang mở tính năng của nhà phát triển. Vui lòng không can thiệp vào mã nguồn. Nếu bạn cố tình can thiệp vào mã nguồn tài khoản bạn sẽ bị khóa',
      'color: orange; font-size: 20px;'
    );

  }, []);

  return null; // Không hiển thị gì trên UI
};

export default DevToolsWarning;
