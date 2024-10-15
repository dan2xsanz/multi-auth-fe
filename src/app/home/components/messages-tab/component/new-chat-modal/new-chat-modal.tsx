'use-client'
import {
  ButtonColorTypeEnum,
  ButtonTypeEnum,
  CommonButon,
  CommonInputField,
  CommonTypography,
  SizeEnum,
  TypographySizeEnum,
} from '@/index'
import { CommonModal } from '@/app/common/modal/modal'
import React, { useEffect, useRef, useState } from 'react'
import { Select } from 'antd'

import '../../messages-tab.css'
import { DefaultOptionType } from 'antd/es/select'

const { Option } = Select

interface NewChatModalInterface {
  width: string
  title: string
  height: string
  isOpen: boolean
  isShowLogo: boolean
  isShowFooterButtons: boolean
  setIsOpen: (data: boolean) => void
}

interface OptionType {
  value: string
  label: string
}

export const NewChatModal = (props: NewChatModalInterface) => {
  const {
    width,
    title,
    height,
    isOpen,
    setIsOpen,
    isShowLogo,
    isShowFooterButtons,
  } = props

  const [options, setOptions] = useState<OptionType[]>([
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ])

  // AUTO FOCUS FIELD
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [userToChatOn, setUserToChatOn] = useState<OptionType[]>([])

  const onChangeInputField = (value: string) => {
    const filteredOptions: OptionType[] = options.filter(
      (data) => data.label?.toLowerCase() === value?.toLowerCase(),
    )
    setOptions(filteredOptions)
  }

  const onClickSendMessage = () => {}

  useEffect(() => {
    console.log(userToChatOn)
    setUserToChatOn(userToChatOn)
  }, [userToChatOn])

  return (
    <CommonModal
      width={width}
      title={title}
      height={height}
      isOpen={isOpen}
      isShowLogo={isShowLogo}
      onCancel={() => setIsOpen(!isOpen)}
      isShowFooterButtons={isShowFooterButtons}
    >
      <div className='search-input-divider'>
        <CommonTypography size={TypographySizeEnum.large} label={'To:'} />
        <Select<OptionType>
          showSearch
          mode='multiple'
          placeholder='Search'
          optionFilterProp='children'
          className='search-input-style'
          onChange={(data) => onChangeInputField(data.label)}
          onSelect={(value, label) => {
            // if (selected) {
            //   let data: OptionType = {
            //     value: selected.value,
            //     label: selected.label,
            //   }
            //   if (userToChatOn.length > 0) {
            //     setUserToChatOn([...userToChatOn, data])
            //   } else {
            //     setUserToChatOn([data])
            //   }

            //   setOptions([
            //     { value: 'apple', label: 'Apple' },
            //     { value: 'banana', label: 'Banana' },
            //     { value: 'cherry', label: 'Cherry' },
            //   ])
            // }
            console.log(value, label)
            // if (selected) {
            //   let data: OptionType = {
            //     value: selected.value,
            //     label: selected.label,
            //   }

            //   // Check for duplicates before adding
            //   if (!userToChatOn.some((user) => user.value === data.value)) {
            //     setUserToChatOn([...userToChatOn, data])
            //   }

            //   // Set new options
            //   setOptions([
            //     { value: 'apple', label: 'Apple' },
            //     { value: 'banana', label: 'Banana' },
            //     { value: 'cherry', label: 'Cherry' },
            //   ])
            // }
          }}
          onDeselect={(data: OptionType) => {
            console.log(data)
            setOptions([
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
              { value: 'cherry', label: 'Cherry' },
            ])
          }}
        >
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </div>
      <div
        style={{
          marginTop: '10px',
          height: '150px',
          width: '100%',
          marginBottom: '5px',
        }}
      ></div>

      {/* <CommonInputField
        value={undefined}
        type={''}
        placeholder='Message Here'
        size={SizeEnum.small}
        label={''}
      /> */}
      <textarea
        ref={textareaRef}
        value={undefined}
        placeholder='Write a message here'
        className='message-input-field'
        onChange={(data) => {}}
      />
      <CommonButon
        buttonTxt={'Send Message'}
        onClick={() => {}}
        style={{ width: '100%', marginTop: '5px' }}
        size={SizeEnum.small}
        type={ButtonTypeEnum.submit}
        buttonColorType={ButtonColorTypeEnum.primary}
      />
    </CommonModal>
  )
}
