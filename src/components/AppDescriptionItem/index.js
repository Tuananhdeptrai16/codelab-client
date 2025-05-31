import React from 'react'

const AppDescriptionItem = ({title, content}) => {
  return (
    <div className="site-description-item-profile-wrapper">
        <p  style={{marginTop : 10}}>{title}:</p>
        <p style={{marginTop : 10, fontSize : 16}}><strong>{content}</strong></p>
       
    </div>
  )
}

export default AppDescriptionItem