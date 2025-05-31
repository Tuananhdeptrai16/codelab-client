/*
  src/hooks/useCallApi.js

  Custom hook để gọi API khi có sự kiện (ví dụ click, load more, search,...)
  - Chỉ gọi khi bạn chủ động gọi send(params).
  - Tham số truyền vào:
      • callApi: hàm async trả về Promise của axios hoặc fetch
      • success: callback khi callApi thành công (nhận response.data, params)
      • error: callback khi callApi lỗi (nhận error, params)
*/
import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * useCallApi
 * @param {Object} options
 * @param {Function} options.callApi - Hàm async thực hiện request, nhận params, trả về Promise
 * @param {Function} [options.success] - Callback khi request thành công, nhận (data, params)
 * @param {Function} [options.error] - Callback khi request lỗi, nhận (error, params)
 * @param {Function} [options.finally] - Callback luôn gọi sau request (không nhận tham số)
 * @returns {{ loading: boolean, send: Function, cancel: Function }}
 */
const useCallApi = ({ callApi, success = () => {}, error = () => {}, finally: onFinally = () => {} }) => {
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);
  const abortController = useRef(null);

  useEffect(() => {
    // cleanup khi unmount
    return () => {
      isMounted.current = false;
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, []);

  /**
   * Gửi request
   * @param {Object} params - Tham số truyền vào callApi
   */
  const send = useCallback(
    async (params = {}) => {
      if (typeof callApi !== 'function') {
        console.warn('[useCallApi] callApi phải là một function');
        return;
      }
  
      setLoading(true);
      abortController.current = new AbortController();
  
      try {
        const response = await callApi(params, abortController.current.signal);
        if (response?.status >= 200 && response?.status < 300) {
          success(response.data, params);
        } else {
          throw response;
        }
      } catch (err) {
        setLoading(false);
        error(err, params);
      } finally {
        if (isMounted.current) {
          setLoading(false);
          onFinally();
        }
      }
    },
    [callApi, success, error, onFinally]
  );
  


  return {
    loading,
    send,
  };
};

export default useCallApi;
