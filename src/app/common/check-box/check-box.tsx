import { CommonTypography, SizeEnum, TypographySizeEnum } from '@/app'
import { Checkbox } from '@nextui-org/react'
import React from 'react'

interface CommonCheckBoxInterface {
  key: string
  label: string
  size?: SizeEnum
}

export const CommonCheckBox = (props: CommonCheckBoxInterface) => {
  const { size, key, label } = props
  return (
    <div style={{ display: 'flex'}}>
      <Checkbox key={key} size={size} color='danger' />
      <CommonTypography label={label} size={TypographySizeEnum.smaller} />
    </div>
  )
}
