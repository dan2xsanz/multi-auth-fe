'use client'
import { ProfileTab } from './components/profile-tab'
import React, { Fragment, useState } from 'react'
import { SnzLogo } from '../common/logo/snz-logo'
import { HomeTab } from './components/home-tab'
import { accountDetailStore } from '../store'
import { useRouter } from 'next/navigation'
import { FavoritesTab } from '@/index'

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
            <div
              className='header-icon'
              onClick={() => {
                setHeaderButton(1)
                window.history.pushState({}, '', '/home')
              }}
            >
              Home
            </div>
            <div
              className='header-icon'
              onClick={() => {
                setHeaderButton(2)
                window.history.pushState({}, '', '/favorites')
              }}
            >
              Favorites
            </div>
            <div
              className='header-icon'
              onClick={() => {
                setHeaderButton(3)
                window.history.pushState({}, '', '/notifications')
              }}
            >
              Notification
            </div>
            <div
              className='header-icon'
              onClick={() => {
                setHeaderButton(4)
                window.history.pushState({}, '', '/messages')
              }}
            >
              Messages
            </div>
            <div
              className='header-icon'
              onClick={() => {
                setHeaderButton(5)
                window.history.pushState({}, '', '/profile')
              }}
            >{`Hi, ${firstName} ${lastName}`}</div>
            <div className='header-icon' onClick={onClickLogoutHandler}>
              Logout
            </div>
          </div>
        </div>
      </div>
      <div className='body-container'>
        {headerButton === 1 && <HomeTab />}
        {headerButton === 2 && <FavoritesTab/>}
        {headerButton === 3 && <></>}
        {headerButton === 4 && <></>}
        {headerButton === 5 && <ProfileTab />}
      </div>
    </Fragment>
  )
}
