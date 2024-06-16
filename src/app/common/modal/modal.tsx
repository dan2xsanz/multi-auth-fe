import './modal.css'
import React from 'react'
import Modal from 'antd/es/modal'

interface CommonModalInterface {
  width?: string
  title?: string
  height?: string
  isOpen?: boolean
  onOkayText?: string
  onOkay?: () => void
  onCancel?: () => void
  onCancelText?: string
  children?: React.ReactNode
  isShowLogo?: boolean
}

export const CommonModal = (props: CommonModalInterface) => {
  const {
    isOpen,
    onOkay,
    title,
    width,
    height,
    onCancel,
    children,
    isShowLogo,
    onOkayText,
    onCancelText,
  } = props

  return (
    <Modal
      className='my-custom-modal'
      centered
      width={width}
      open={isOpen}
      closeIcon={false}
      footer={
        <div className='footer-buttons-container'>
          <div className='footer-cancel-button' onClick={onCancel}>
            {onCancelText}
          </div>
          <div className='footer-submit-button' onClick={onOkay}>
            {onOkayText}
          </div>
        </div>
      }
    >
      <div className='modal-main-container' style={{ height: height }}>
        {isShowLogo && (
          <div className='snz-modal-background-container'>
            <div>SNZ.</div>
          </div>
        )}
        <div className='modal-content'>
          <p className='modal-content-title'>{title}</p>
          {children}
        </div>
      </div>
    </Modal>
  )
}
