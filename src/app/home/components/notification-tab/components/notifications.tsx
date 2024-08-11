import { readNotificationOperation } from '../operations'
import { accountDetailStore, useStore } from '@/app/store'
import {
  CommentsIconReact,
  HighlightedHeartReact,
  WebSocketTopic,
} from '@/index'
import { NoticationInterface } from '../data'
import { Image as AntdImage } from 'antd'
import '../notifications.css'
import React, { useState } from 'react'

interface NoticationsProps {
  notificationDetails: NoticationInterface
  setOpenDetailModal: (data: boolean) => void
  setNotificationDetails: (data: NoticationInterface) => void
}

export const Notications = (props: NoticationsProps) => {
  // NOTIFICATION PROPS
  const { notificationDetails, setOpenDetailModal, setNotificationDetails } =
    props

  // LOADING SCREEN STORE
  const { setIsLoading } = useStore()

  // ACOUNT MASTER DETAILS
  const { accountId } = accountDetailStore()

  // IS NOTIFICATION ALRAEDY READ
  const [isRead, setIsRead] = useState<boolean>(false)

  // ON CLICK NOTIFICATION
  const readNotification = () => {
    setIsRead(true)
    setOpenDetailModal(true)
    setNotificationDetails(notificationDetails)
    readNotificationOperation(setIsLoading, notificationDetails)
  }

  const iconNotification = (): React.JSX.Element => {
    let icon: React.JSX.Element = <></>
    switch (notificationDetails.notificationTopic) {
      case WebSocketTopic.HeartReact:
        icon = <HighlightedHeartReact />
        break
      case WebSocketTopic.Comment:
        icon = <CommentsIconReact />
        break
    }
    return icon
  }

  return (
    accountId === notificationDetails.notifiedAccountMasterId && (
      <div
        className={
          notificationDetails.isRead || isRead
            ? 'notification-container-read'
            : 'notification-container'
        }
        onClick={readNotification}
      >
        <AntdImage
          width={50}
          height={50}
          preview={false}
          src={`${`data:image/jpeg;base64,`}${notificationDetails.notificationImage}`}
        />
        {iconNotification()}
        <div className='notification-details'>
          <div className='notification-subject-container'>
            <div className='notification-name'>{`${notificationDetails.notificationSubject} `}</div>
            <div> {`${notificationDetails.notificationDetails}`}</div>
          </div>
          <div>{`${'3 hours ago'}`}</div>
        </div>
      </div>
    )
  )
}
