import React from 'react';
import useFetch from '../services/useFetch';
import AppLoader from '../components/AppLoader';
import API from '../services/shared/api';
// import AppLoader from '../components/AppLoader';

const getCourseHoc = (WrappedComponent) => {
  return (props) => {
    const { setCourses } = props
    const {data, loading} = useFetch(`${process.env.REACT_APP_BASE_URL_API_LOCAL}${API.API_GET_COURSES}`)
    if(data) {
        setCourses(data)
    }
    if(loading) {
        return <AppLoader/>
    }
    
    return <WrappedComponent {...props} />;
  };
};

export default getCourseHoc;
