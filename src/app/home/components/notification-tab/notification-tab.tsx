import { accountDetailStore, useStore } from '@/app/store'
import React, { useEffect } from 'react'
import { listOfNotificationOperation } from './operations'

export const NotificationTab = () => {
  // ACCOUNT DETAILS
  const { accountId } = accountDetailStore()

  // LOADING SCREEN STORE
  const { setIsLoading } = useStore()

  useEffect(() => {
    listOfNotificationOperation(setIsLoading, accountId)
  }, [])

  return <div className='main-profile-container'></div>
}
