'use client'
import React, { Fragment } from 'react'
import { SnzLogo } from '../common/logo/snz-logo'

import { ProfileTab } from './components/profile-tab'
import { accountDetailStore } from '../store'

export default function HomePage() {
  const { firstName, lastName } = accountDetailStore()
  
  return (
    <Fragment>
      <div className='header-container'>
        <div className='header-menu-container'>
          <SnzLogo />
          <div className='header-icon-container'>
            <div className='header-icon'>Home</div>
            <div className='header-icon'>Group</div>
            <div className='header-icon'>Notification</div>
            <div className='header-icon'>Messages</div>
            <div className='header-icon'>{`Hi, ${firstName} ${lastName}`}</div>
          </div>
        </div>
      </div>
      <div className='body-container'>
        {/* <HomeTab /> */}
        <ProfileTab />
      </div>
    </Fragment>
  )
}
