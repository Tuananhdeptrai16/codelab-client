import React, { createContext, useContext, useEffect, useState } from 'react';
import instanceCore from '../../services/setUpAxios';
import { toast } from 'react-toastify';
import useCallApi from '../../services/useCallAPi';
import API from '../../services/shared/api';
import { getToken, removeLongToken, removeToken, saveLongToken, saveToken } from '../../services/shared/constant';

const authState = createContext();
export const useAuthState = () => useContext(authState);
const authAction = createContext();
export const useAuthAction = () => useContext(authAction);
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null , isLoading : true});
  const token = getToken()
  const { send  } = useCallApi({
    callApi: () => {
      return instanceCore.get(API.API_ME)
    },
    success: (data) => {
      setAuth({
        user: data?.data,
        isLoading: false,
        token: token,
      });

    },
    error: () => {
      toast.error('Vui lòng đăng nhập lại')
    },
  });
  useEffect(() => {
    const getAuthUser = () => {
      if (!token) {
        setAuth({
          user: undefined,
          isLoading: false,
          token: null,
        });
        return
      }
      send()
    }
    getAuthUser()
  }, []);
  const signInUser = (success, error) => {
    if (success) {
      toast.success('Đăng nhập thành công')
      const userInfo = success;
      const token = userInfo?.accessToken;
      if (token) {
        saveToken(token)
        saveLongToken(userInfo?.refreshToken)
      }
      setAuth({
        user: userInfo,
        isLoading: false,
        token: userInfo?.accessToken || null,
      });
    } else if (error) {
      removeToken()
      setAuth({
        user: null,
        isLoading: false,
        token: null,
      });
    }
  };


  const signUpUser = (success, error) => {
    if (success) {
      toast.success('Đăng ký thành công ! Vui lòng kiểm tra Email để xác thực tài khoản');
    } else if (error) {
      console.error(error);
    }
  };
  const logoutUser = () => {
    removeToken() 
    removeLongToken()
    setAuth({
      user: null,
      isLoading: false,
      token: null,
    });
  };
  
  return (
    <authState.Provider value={{auth }}>
      <authAction.Provider value={{ setAuth, signInUser ,signUpUser, logoutUser}}>
        {children}
      </authAction.Provider>
    </authState.Provider>
  );
};

export default AuthProvider;
