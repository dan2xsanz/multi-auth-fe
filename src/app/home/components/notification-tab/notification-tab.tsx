'use client'
import { accountDetailStore, useStore } from '@/app/store'
import React, { Fragment, useEffect, useState } from 'react'
import { listOfNotificationOperation } from './operations'
import { NoticationInterface } from './data'
import { Notications } from './components'
import { ProductDetailsModal } from '@/index'

export const NotificationTab = () => {
  // SELECTED NOTIFICATIONDETAILS
  const [notificationDetails, setNotificationDetails] =
    useState<NoticationInterface>()

  // OPEN DETAIL MODAL
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false)

  // ACCOUNT DETAILS
  const { accountId } = accountDetailStore()

  // LOADING SCREEN STORE
  const { setIsLoading } = useStore()

  // NOTIFICATION LIST
  const [notificationList, setNotificationList] =
    useState<NoticationInterface[]>()

  // GET ALL LIST OF NOTIFICATION
  useEffect(() => {
    listOfNotificationOperation(setIsLoading, accountId, setNotificationList)
  }, [])

  return (
    <div>
      {notificationList?.length && (
        <Fragment>
          {notificationList?.map((notifications, index) => (
            <Notications
              key={index}
              notificationDetails={notifications}
              setOpenDetailModal={setOpenDetailModal}
              setNotificationDetails={setNotificationDetails}
            />
          ))}
        </Fragment>
      )}
      {notificationDetails && (
        <ProductDetailsModal
          openDetailModal={openDetailModal}
          setOpenDetailModal={setOpenDetailModal}
          productMasterId={notificationDetails.productMasterId}
        />
      )}
    </div>
  )
}
