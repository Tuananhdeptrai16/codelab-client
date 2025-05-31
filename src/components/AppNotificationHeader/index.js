import React, { forwardRef } from 'react'
import AppModalNotification from '../AppModalNotification'

const AppNotificationHeader = forwardRef(({notification, setNotification}, bellRef) => {
    return (
        <div className="header__notification">
            <button onClick={() => setNotification(!notification)}>
                <img
                    src={`${process.env.PUBLIC_URL}/images/icon/notification.svg`}
                    alt="notification"
                    className="header__notification--icon icon"
                />
            </button>
            <span className="header__number--notification">1</span>
            {notification && (
                <AppModalNotification ref={bellRef} />
            )}
        </div>
    )
}
)
export default AppNotificationHeader