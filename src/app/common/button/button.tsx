import {
  ButtonColorTypeEnum,
  ButtonTypeEnum,
  RadiusEnum,
  SizeEnum,
} from '@/app'
import './button.css'
import { Button, ButtonProps } from '@nextui-org/react'

interface CommonButtonInterface extends ButtonProps {
  size: SizeEnum
  buttonTxt?: string
  radius?: RadiusEnum
  fullWidth?: boolean
  type: ButtonTypeEnum
  onClick?: () => void
  disabled?: boolean
  buttonColorType?: ButtonColorTypeEnum
}

export const CommonButon = (props: CommonButtonInterface) => {
  const {
    type,
    size,
    radius,
    onClick,
    disabled,
    fullWidth,
    buttonTxt,
    buttonColorType,
    ...rest
  } = props

  const classNameType = (): string => {
    return buttonColorType === ButtonColorTypeEnum.primary
      ? 'button-primary-backgroud'
      : buttonColorType === ButtonColorTypeEnum.secondary
        ? 'button-secondary-backgroud'
        : 'button-tertiary-backgroud'
  }

  return (
    <Button
      {...rest}
      size={size}
      type={type}
      radius={radius}
      onClick={onClick}
      fullWidth={fullWidth}
      isDisabled={disabled}
      className={classNameType()}
    >
      {buttonTxt}
    </Button>
  )
}
