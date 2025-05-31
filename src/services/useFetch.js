import { useState, useEffect, useCallback, useRef } from 'react';
import instanceCore from './setUpAxios';

const useFetch = (url, options = {}) => {
  const { keepData = true } = options;
  const isFirstLoad = useRef(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(0);

  const refetch = useCallback(() => {
    setReloadFlag((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (!keepData || isFirstLoad.current) {
      setData(null);
    }
    setError(null);
    
    setLoading(true);
    instanceCore.get(url, { signal })
      .then(res => {
        if (res?.data?.data) setData(res.data.data);
        else if (res?.data?.content) setData(res.data.content);
        else setData(res.data);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError('Đã xảy ra lỗi.');
        }
      })
      .finally(() => {
        setLoading(false);
        isFirstLoad.current = false;
      });

    return () => {
      controller.abort();
    };
  }, [url, reloadFlag, keepData]);

  return { data, loading, error, refetch };
};

export default useFetch;
