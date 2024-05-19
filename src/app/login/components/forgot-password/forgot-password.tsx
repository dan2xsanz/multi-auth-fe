import './forgot-password-style.css'

import { ForgotPasswordInterface, forgotPasswordDefaultValues } from './data'
import { ForgotPasswordRequest } from '@/app/service'
import { ResponseInterface } from '@/config/config'
import { checkRequiredFields } from '@/app/utils'
import { OtpValidation } from '../otp-validation'
import { useStore } from '@/app/store'
import { useState } from 'react'
import {
  openErrorNotification,
  openInfoNotification,
  CommonInputField,
  CommonLinkButton,
  CommonTypography,
  CommonButon,
} from '@/app/common'
import {
  createAccountDefaultValues,
  CreateAccountInterface,
} from '../create-account'
import {
  ButtonColorTypeEnum,
  TypographySizeEnum,
  ButtonTypeEnum,
  LinkSizeEnum,
  RadiusEnum,
  SizeEnum,
} from '@/app/constant'

interface ForgotPasswordModalInterface {
  setOpenForgotPass: (data: boolean) => void
}

export const ForgotPassword = (props: ForgotPasswordModalInterface) => {
  // FORGOT PASSWORD PROPS
  const { setOpenForgotPass } = props

  // LOADING SCREEN STORE
  const { setIsLoading } = useStore()

  // VERIFY EMAIL OTP
  const [isVerifyOtp, setVerifyOtp] = useState<boolean>(false)

  // ERROR KEY FIEDLS HANDLER
  const [errorFields, setErrorFields] = useState<string[]>([])

  // CREATE ACCOUNT DETAILS
  const [accountDetails, setAccountDetails] = useState<CreateAccountInterface>(
    createAccountDefaultValues,
  )

  // FORGOT PASSWORD FIELDS
  const [forgotPasswordDatails, setForgotPasswordDetails] =
    useState<ForgotPasswordInterface>(forgotPasswordDefaultValues)

  // ON CLICK SIGN UP BUTTON
  const onClickSendOtpButton = () => {
    setIsLoading(true)
    const errorFields: string[] = checkRequiredFields(
      forgotPasswordDefaultValues,
      forgotPasswordDatails,
    )
    setErrorFields(errorFields)
    if (errorFields.length === 0) {
      // TODO HERE
      ForgotPasswordRequest(forgotPasswordDatails)
        .then((data: ResponseInterface) => {
          if (data.isSuccess) {
            setAccountDetails(data.resultData)
            setVerifyOtp(true)
            openInfoNotification({
              description: `OTP send successfully to ${forgotPasswordDatails.email}.`,
              placement: 'bottomRight',
            })
          }
        })
        .catch((error: any) => {
          openErrorNotification({
            description: error.response?.data?.message || 'An error occurred',
            placement: 'bottomRight',
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  // ON CHANGE FIELDS
  const onChangeFields = (data: ForgotPasswordInterface) => {
    setForgotPasswordDetails({ ...forgotPasswordDatails, ...data })
  }

  return isVerifyOtp ? (
    <OtpValidation
      setVerifyOtp={setVerifyOtp}
      setAccountDetails={setAccountDetails}
      accountDetails={{ ...accountDetails, isForgotPass: true }}
    />
  ) : (
    <div className='forgot-pass-main-container'>
      <div className='forgot-pass-title-container'>
        <CommonTypography
          label={'Forgot Password'}
          size={TypographySizeEnum.xxlarge}
        />
      </div>
      <div className='back-to-login-container'>
        <div>
          <CommonTypography
            size={TypographySizeEnum.note}
            label={'Already have an account?'}
          />
        </div>
        <div>
          <CommonLinkButton
            label='Back to Log In'
            size={LinkSizeEnum.xsmall}
            onClick={() => setOpenForgotPass(false)}
          />
        </div>
      </div>
      <CommonInputField
        key={'email'}
        type={'email'}
        required={true}
        size={SizeEnum.small}
        label={'Email Address'}
        isError={errorFields.includes('email')}
        value={forgotPasswordDefaultValues?.email}
        onChange={(data) => {
          onChangeFields({ ...forgotPasswordDatails, email: data.target.value })
        }}
      />
      <CommonButon
        fullWidth={true}
        buttonTxt='Send OTP'
        size={SizeEnum.medium}
        radius={RadiusEnum.small}
        type={ButtonTypeEnum.submit}
        onClick={onClickSendOtpButton}
        buttonColorType={ButtonColorTypeEnum.primary}
      />
    </div>
  )
}
