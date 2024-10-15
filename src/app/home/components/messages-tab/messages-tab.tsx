'use client'
import React, { useState } from 'react'
import { accountDetailStore } from '@/app/store'
import { AddIcon, CommonTypography, TypographySizeEnum } from '@/index'
import { ChatBoxModal } from './component/chat-box-modal/chat-box-modal'
import { NewChatModal } from './component/new-chat-modal/new-chat-modal'

export const MessagesTab = () => {
  // ACOUNT MASTER DETAILS
  const { firstName, lastName } = accountDetailStore()

  const [accountMasterId, setAccountmasterId] = useState<number | undefined>()

  const [isOpenNewChatModal, setOpenNewChatModal] = useState<boolean>(false)

  return (
    <div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CommonTypography
          size={TypographySizeEnum.smaller}
          label={`${firstName} ${lastName}`}
        />
        <AddIcon
          style={{ height: '30px', width: '30px' }}
          onClick={() => setOpenNewChatModal(true)}
        />
      </div>
      <ChatBoxModal
        accountMasterId={accountMasterId}
        setAccountmasterId={setAccountmasterId}
      />
      <NewChatModal
        height='300px'
        width='700px'
        title={'New Chat'}
        isShowLogo={true}
        isOpen={isOpenNewChatModal}
        isShowFooterButtons={false}
        setIsOpen={setOpenNewChatModal}
      />
    </div>
  )
}
