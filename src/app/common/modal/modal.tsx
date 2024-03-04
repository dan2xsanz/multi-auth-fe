import React, { Fragment } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react'

interface CommonModalInterface {
  title?: string
  isOpen?: boolean
  onClose?: () => void
  children?: React.ReactNode
  primaryBtnTxt?: string
  secondaryBtnTxt?: string
}

export const CommonModal = (props: CommonModalInterface) => {
  const { isOpen, onClose, children, title, primaryBtnTxt, secondaryBtnTxt } =
    props

  return (
    <Modal
      backdrop='blur'
      isOpen={isOpen}
      onClose={onClose}
      style={{ maxWidth: '30vw', height: '70vh' }}
    >
      <ModalContent>
        {(onClose) => (
          <Fragment>
            <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button variant='light' onPress={onClose}>
                {secondaryBtnTxt}
              </Button>
              <Button onPress={onClose}>{primaryBtnTxt}</Button>
            </ModalFooter>
          </Fragment>
        )}
      </ModalContent>
    </Modal>
  )
}
