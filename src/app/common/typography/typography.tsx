import { TypographySizeEnum } from '@/app'
import './typography.css'
import { CSSProperties } from 'react'

interface CommonTypographyInterface {
  isError?: boolean
  size: TypographySizeEnum
  label: string | undefined
  className?: string | undefined
  style?: CSSProperties | undefined
}

export const CommonTypography: React.FC<CommonTypographyInterface> = (
  props,
) => {
  const { size, label, style, className, isError } = props

  let typographyComponent: JSX.Element | null = null

  switch (size) {
    case TypographySizeEnum.smaller:
      typographyComponent = (
        <label style={style} className='typography-smaller'>
          {label}
        </label>
      )
      break
    case TypographySizeEnum.small:
      typographyComponent = (
        <label style={style} className='typography-small'>
          {label}
        </label>
      )
      break
    case TypographySizeEnum.xsmall:
      typographyComponent = (
        <label style={style} className='typography-x-small'>
          {label}
        </label>
      )
      break
    case TypographySizeEnum.xxsmall:
      typographyComponent = (
        <label style={style} className='typography-xx-small'>
          {label}
        </label>
      )
      break
    case TypographySizeEnum.medium:
      typographyComponent = (
        <label style={style} className='typography-medium'>
          {label}
        </label>
      )
      break
    case TypographySizeEnum.large:
      typographyComponent = (
        <label style={style} className='typography-large'>
          {label}
        </label>
      )
      break
    case TypographySizeEnum.xlarge:
      typographyComponent = (
        <label style={style} className='typography-x-large'>
          {label}
        </label>
      )
      break
    case TypographySizeEnum.xxlarge:
      typographyComponent = (
        <label style={style} className='typography-xx-large'>
          {label}
        </label>
      )
      break
    case TypographySizeEnum.note:
      typographyComponent = (
        <label
          style={style}
          className={isError ? 'typography-note-error' : 'typography-note'}
        >
          {label}
        </label>
      )
      break
    default:
      typographyComponent = (
        <label style={style} className='typography-small'>
          {label}
        </label>
      )
      break
  }

  return (
    <div className={className} style={style}>
      {typographyComponent}
    </div>
  )
}
