import { LinkSizeEnum } from '@/app'
import './button-link.css'

import { Link } from '@nextui-org/react'
import React from 'react'

interface CommonLinkButtonInterface {
  size?: LinkSizeEnum
  label?: string
  onClick?: () => void
  isDisable?: boolean
}

export const CommonLinkButton = (props: CommonLinkButtonInterface) => {
  const { size, label, onClick, isDisable } = props
  switch (size) {
    case LinkSizeEnum.large: {
      return (
        <Link
          className='button-link'
          size={LinkSizeEnum.large}
          onClick={onClick}
          isDisabled={isDisable}
        >
          {label}
        </Link>
      )
      break
    }
    case LinkSizeEnum.medium: {
      return (
        <Link
          className='button-link'
          onClick={onClick}
          isDisabled={isDisable}
          size={LinkSizeEnum.medium}
        >
          {label}
        </Link>
      )
      break
    }
    case LinkSizeEnum.small: {
      return (
        <Link
          className='button-link'
          size={LinkSizeEnum.small}
          isDisabled={isDisable}
          onClick={onClick}
        >
          {label}
        </Link>
      )
      break
    }
    case LinkSizeEnum.xsmall: {
      return (
        <Link
          className='button-link-x-xmall'
          onClick={onClick}
          isDisabled={isDisable}
        >
          {label}
        </Link>
      )
      break
    }
  }
}
