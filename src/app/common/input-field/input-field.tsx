import './input.css'

import { Input, InputProps } from '@nextui-org/react'
import React from 'react'
import { SizeEnum, TypographySizeEnum } from '../../constant/enums'
import { CommonTypography } from '..'

export interface InputFieldInterface extends InputProps {
  value: any
  type: string
  label: string
  size: SizeEnum
  isError?: boolean
  required?: boolean
  onChange?: (data: any) => void
  onKeyDown?: (data: any) => void
}

export const CommonInputField = (props: InputFieldInterface) => {
  const {
    size,
    type,
    label,
    style,
    value,
    isError,
    required,
    onChange,
    onKeyDown,
    maxLength,
    ...rest
  } = props
  return (
    <>
      <Input
        {...rest}
        size={size}
        type={type}
        radius='none'
        style={style}
        value={value && value}
        maxLength={maxLength && maxLength}
        label={label && `${required ? '* ' : ''}${label} `}
        onChange={(data) => onChange && onChange(data)}
        onKeyDown={(data) => onKeyDown && onKeyDown(data)}
        className={isError && !value ? 'input-field-error' : 'input-field'}
      />
      {isError && !value && (
        <CommonTypography
          isError={true}
          size={TypographySizeEnum.note}
          label={`${label} field is required`}
          style={{ marginTop: '-5px', color: 'black' }}
        />
      )}
    </>
  )
}
