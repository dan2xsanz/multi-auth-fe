'use client'
import { accountDetailStore, logInStore } from '../store'
import { ProfileTab } from './components/profile-tab'
import { SnzLogo } from '../common/logo/snz-logo'
import { useRouter } from 'next/navigation'
import React, { Fragment, useState } from 'react'
import { HomeTab } from './components/home-tab'

export default function HomePage() {
  // ACOUNT MASTER DETAILS
  const { firstName, lastName } = accountDetailStore()

  const [headerButton, setHeaderButton] = useState<number>(1)

  // ROUTER
  const router = useRouter()

  // ON CLICK LOGOUT
  const onClickLogoutHandler = () => {
    router.push('/login')
  }

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
              Group
            </div>
            <div className='header-icon' onClick={() => setHeaderButton(3)}>
              Notification
            </div>
            <div className='header-icon' onClick={() => setHeaderButton(4)}>
              Messages
            </div>
            <div
              className='header-icon'
              onClick={() => setHeaderButton(5)}
            >{`Hi, ${firstName} ${lastName}`}</div>
            <div className='header-icon' onClick={onClickLogoutHandler}>
              Logout
            </div>
          </div>
        </div>
      </div>
      <div className='body-container'>
        {headerButton === 1 && <HomeTab />}
        {headerButton === 2 && <></>}
        {headerButton === 3 && <></>}
        {headerButton === 4 && <></>}
        {headerButton === 5 && <ProfileTab />}
      </div>
    </Fragment>
  )
}
