'use client'
import React, { Fragment } from 'react'
import { Modal } from 'antd'
import "../../messages-tab.css"

interface ChatBoxModalInterface {
  accountMasterId: number | undefined
  setAccountmasterId: (data: number | undefined) => void
}
export const ChatBoxModal = (props: ChatBoxModalInterface) => {
  const { accountMasterId, setAccountmasterId } = props
  return (
    <Fragment>
      <Modal
        title='Dan Lester Sanz'
        // className='custom-modal' // TODO
        open={accountMasterId != undefined}
        onOk={() => setAccountmasterId(undefined)}
        onCancel={() => setAccountmasterId(undefined)}
        centered
        footer={null}
      >
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </Modal>
    </Fragment>
  )
}
