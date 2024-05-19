import { SizeEnum } from '@/app'
import { Checkbox } from '@nextui-org/react'
import React from 'react'

interface CommonCheckBoxInterface {
  size?: SizeEnum
}

export const CommonCheckBox = (props: CommonCheckBoxInterface) => {
  const { size } = props
  return <Checkbox defaultSelected size={size} />
}
