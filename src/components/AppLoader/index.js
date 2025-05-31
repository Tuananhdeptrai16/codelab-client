import React from 'react'
import './index.style.scss'
import { Skeleton } from 'antd'
const AppLoader = () => {
  return (
    <div className='app-loader'>
        <Skeleton active></Skeleton>
    </div>
  )
}

export default AppLoader