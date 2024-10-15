'use client'
import websocketService from '../service/web-socket-service/web-socket-service'
import React, { Fragment, useEffect, useState } from 'react'
import { accountDetailStore } from '../store'
import { useRouter } from 'next/navigation'
import {
  NotificationTab,
  FavoritesTab,
  ProfileTab,
  HomeTab,
  SnzLogo,
  CommonDrawer,
} from '@/index'
import { MessagesTab } from './components/messages-tab/messages-tab'

export default function HomePage() {
  // ACOUNT MASTER DETAILS
  const { firstName, lastName, accountId } = accountDetailStore()

  // HEADER BUTTON TAGS
  const [headerButton, setHeaderButton] = useState<number>(1)

  // OPEN NOTIFIICATION DRAWER
  const [openNotification, setOpenNotification] = useState<boolean>(false)

  // OPEN NOTIFIICATION DRAWER
  const [openMessages, setOpenMessages] = useState<boolean>(false)

  // ROUTER
  const router = useRouter()

  // ON CLICK LOGOUT
  const onClickLogoutHandler = () => {
    router.push('/login')
  }

  useEffect(() => {
    websocketService.setCurrentLoggedInUser(accountId)
  }, [accountId, headerButton])

  return (
    <Fragment>
      <div className='header-container'>
        <div className='header-menu-container'>
          <SnzLogo />
          <div className='header-icon-container'>
            <div className='header-icon' onClick={() => setHeaderButton(1)}>
              Home
            </div>
            <div className='header-icon' onClick={() => setHeaderButton(2)}>
              Favorites
            </div>
            <div
              className='header-icon'
              onClick={() => setOpenNotification(true)}
            >
              Notification
            </div>
            <div className='header-icon' onClick={() => setOpenMessages(true)}>
              Messages
            </div>
            <div
              className='header-icon'
              onClick={() => setHeaderButton(3)}
            >{`Hi, ${firstName} ${lastName}`}</div>
            <div className='header-icon' onClick={onClickLogoutHandler}>
              Logout
            </div>
          </div>
        </div>
      </div>
      <div className='body-container'>
        {headerButton === 1 && <HomeTab />}
        {headerButton === 2 && <FavoritesTab />}
        {headerButton === 3 && <ProfileTab />}
      </div>
      <CommonDrawer
        openDrawer={openNotification}
        setOpenDrawer={setOpenNotification}
        children={<NotificationTab />}
      />
      <CommonDrawer
        openDrawer={openMessages}
        setOpenDrawer={setOpenMessages}
        children={<MessagesTab />}
      />
    </Fragment>
  )
}
