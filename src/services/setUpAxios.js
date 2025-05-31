import axios from 'axios';
import { toast } from 'react-toastify';
import { AUTH_KEY_STORAGE, getLongToken, saveToken } from './shared/constants/Key';

const instanceCore = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_API_LOCAL || '', // base URL từ biến môi trường
  timeout: 10000, // Timeout sau 10s
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor request: gắn token nếu có
instanceCore.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_KEY_STORAGE); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instanceCore.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response &&  (error.response.status === 410 || error.response.status === 401) && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu yêu cầu đã retry
      try {
        // Gọi API refresh token để lấy token mới
        const refreshToken = getLongToken();
        console.log('check refresh Token', refreshToken);
        if (!refreshToken) {
          return Promise.reject(error); // Nếu không có refresh token, không thể refresh
        }

        // Gửi yêu cầu refresh token (giả sử endpoint refresh token là /api/refresh-token)
        const response = await axios.put(`${process.env.REACT_APP_BASE_URL_API_LOCAL}/v1/users/refresh_token`, { refreshToken : refreshToken });

        // Lưu token mới vào localStorage
        const newToken = response.data.accessToken;
        saveToken(newToken)

        // Cập nhật lại header Authorization với token mới
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        // Thực hiện lại yêu cầu ban đầu với token mới
        return instanceCore(originalRequest);
      } catch (err) {
        toast.error('Vui lòng đăng nhập lại')
        window.location.href = 'http://localhost:3000/login'; 
        return Promise.reject(error);
      }
    }

    return Promise.reject(error); 
  }
);

export default instanceCore;
