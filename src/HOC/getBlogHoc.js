import React from 'react';
import useFetch from '../services/useFetch';
import AppLoader from '../components/AppLoader';
import API from '../services/shared/api';

const getBlogHoc = (WrappedComponent) => {
  return (props) => {
    const { setBlog } = props
    const {data, loading} = useFetch(API.API_GET_BLOG)
    if(data) {
      setBlog(data)
    }
    if(loading) {
        return <AppLoader/>
    }
    
    return <WrappedComponent {...props} />;
  };
};

export default getBlogHoc;
