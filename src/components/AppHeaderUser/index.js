import { Avatar } from 'antd'
import React, { forwardRef } from 'react'
import { useThemeState } from '../../ProviderContext/AppThemeContext.js'
import AppModalUserInfo from '../AppModalUserInfo'
import { useAuthState } from '../../ProviderContext/AppAuthJWTContext.js/index.js'

const AppHeaderUser = forwardRef(({ doSignOut, showUser, setShowUser, notification, handleChangeTheme }, userRef) => {
  const { auth } = useAuthState()
  const { theme } = useThemeState();
  return (
    <div
      onClick={() => setShowUser(!showUser)}
      className="header__avatar"
    >
      <Avatar src={auth?.user?.avatar} size={50} style={{ backgroundColor: "#fde3cf", color: "#f56a00", userSelect: 'none' }}>
        {auth?.user?.display_name?.slice(0, 1).toUpperCase() || 'C'}
      </Avatar>
      {showUser && notification === false && (
        <AppModalUserInfo
          ref={userRef}
          theme={theme}
          handleChangeTheme={handleChangeTheme}
          doSignOut={doSignOut}
        />
      )}
    </div>
  )
})

export default AppHeaderUser