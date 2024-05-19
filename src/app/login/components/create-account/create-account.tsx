
import { CommonModal } from '@/app'
import React from 'react'

interface CreateAccountModalInterface {
  isOpenCreateModal: boolean
  setOpenCreateModal: (data: boolean) => void
}

export const CreateAccount = (props: CreateAccountModalInterface) => {
  const { isOpenCreateModal, setOpenCreateModal } = props
  return (
    <div>
      <CommonModal
        title={"Create New Account"}
        isOpen={isOpenCreateModal}
        onClose={() => setOpenCreateModal(false)}
        primaryBtnTxt="Save"
        secondaryBtnTxt="Cancel"
      >
        <></>
      </CommonModal>
    </div>
  )
}
