import './otp-validation-style.css'

import {
  CreateAccountInterface,
  createAccountDefaultValues,
} from '../create-account/data'
import { otpValidationDefaultValues } from './data'
import React, { useEffect, useState } from 'react'
import {
  OtpVerificationRequest,
  ButtonColorTypeEnum,
  checkRequiredFields,
  TypographySizeEnum,
  CommonInputField,
  CommonLinkButton,
  CommonTypography,
  ButtonTypeEnum,
  LinkSizeEnum,
  CommonButon,
  RadiusEnum,
  SizeEnum,
  openSuccessNotification,
  openErrorNotification,
  CreateAccountRequest,
  openInfoNotification,
} from '@/app'
import { ResponseInterface } from '@/config/config'
import { useStore } from '@/app/store'
import { useRouter } from 'next/navigation'

interface OtpValidationModalInterface {
  setVerifyOtp: (data: boolean) => void
  accountDetails: CreateAccountInterface
  setProceedSignUp?: (data: boolean) => void
  setAccountDetails: (data: CreateAccountInterface) => void
}

export const OtpValidation = (props: OtpValidationModalInterface) => {
  // LOADING SCREEN STORE
  const { setIsLoading } = useStore()

  // OTP VALIDATION PROPS
  const { setVerifyOtp, accountDetails, setAccountDetails, setProceedSignUp } =
    props

  // ERROR KEY FIEDLS HANDLER
  const [errorFields, setErrorFields] = useState<string[]>([])

  // RESEND OTP DISABLER
  const [isDisabled, setIsDisabled] = useState(false)

  // RESEND OTP TIMER
  const [timer, setTimer] = useState(0)

  // PATH ROUTHER
  const router = useRouter()

  // ON CHANGE FIELDS
  const onChangeFields = (data: CreateAccountInterface) => {
    setAccountDetails({ ...accountDetails, ...data })
  }

  // ON CLICK VERIFICATION OTP
  const onClickVerifyOtp = async () => {
    setIsLoading(true)
    const errorFields: string[] = checkRequiredFields(
      createAccountDefaultValues,
      accountDetails,
    )
    setErrorFields(errorFields)
    if (errorFields.length === 0 || errorFields[0] == 'isForgotPass') {
      await OtpVerificationRequest(accountDetails)
        .then((response: ResponseInterface) => {
          if (response.isSuccess) {
            openSuccessNotification({
              description: 'OTP Verified successfully.',
              placement: 'bottomRight',
            })
            if (accountDetails.isForgotPass) {
              router.push('/home')
            } else {
              setProceedSignUp && setProceedSignUp(true)
              setVerifyOtp(false)
            }
          }
        })
        .catch((error: any) => {
          openErrorNotification({
            description: error.response.data.message,
            placement: 'bottomRight',
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  // RESEND OTP
  const onClickResendOtp = async () => {
    setIsLoading(true)
    await CreateAccountRequest({ ...accountDetails, otp: undefined })
      // RETURN SUCCESS MESSAGE
      .then((response: ResponseInterface) => {
        if (response.isSuccess && response.resultData) {
          openInfoNotification({
            description: `OTP resend successfully to ${accountDetails.email}.`,
            placement: 'bottomRight',
          })
        }
      })
      // RETURN ERROR MESSAGE
      .catch((error: any) => {
        openErrorNotification({
          description: error.response.data.message,
          placement: 'bottomRight',
        })
      })
      .finally(() => {
        setIsLoading(false)
        if (!isDisabled) {
          setIsDisabled(true)
          setTimer(60) // 60 SECONDS TO RESEND OTP
        }
      })
  }

  // RESEND OTP TIMER
  useEffect(() => {
    if (isDisabled) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(interval)
            setIsDisabled(false)
            return 0
          }
          return prevTimer - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isDisabled])

  return (
    <div className='otp-validation-main-container'>
      <div className='otp-validation-title-container'>
        <CommonTypography
          label={'OTP Verification'}
          size={TypographySizeEnum.xxlarge}
        />
      </div>
      <div className='back-to-create-container'>
        <div>
          <CommonTypography
            size={TypographySizeEnum.note}
            label={'Already have an account?'}
          />
        </div>
        <div>
          <CommonLinkButton
            label='Back to Sign Up'
            size={LinkSizeEnum.xsmall}
            onClick={() => setVerifyOtp(false)}
          />
        </div>
      </div>
      <div className='otp-note-container'>
        <CommonTypography
          style={{ color: 'gray' }}
          size={TypographySizeEnum.note}
          label={
            `NOTE: A One Time Password has been sent to ${accountDetails.email}. ` +
            'Please enter the OTP above to verfify your Email Address. ' +
            'If you cannot see in the email in your inbox, make sure you check your SPAM folder.'
          }
        />
      </div>
      <CommonInputField
        key={'otp'}
        type={'otp'}
        label={'OTP'}
        required={true}
        size={SizeEnum.small}
        isError={errorFields.includes('otp')}
        value={otpValidationDefaultValues?.otp}
        onChange={(data) =>
          onChangeFields({ ...accountDetails, otp: data.target.value })
        }
      />
      <CommonButon
        fullWidth={true}
        buttonTxt='Verify OTP'
        size={SizeEnum.medium}
        radius={RadiusEnum.small}
        onClick={onClickVerifyOtp}
        type={ButtonTypeEnum.submit}
        buttonColorType={ButtonColorTypeEnum.primary}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CommonTypography
          size={TypographySizeEnum.note}
          label={"Didn't receive OTP?"}
        />
        <CommonLinkButton
          label={`Resend OTP ${isDisabled ? (timer === 60 ? `(1min)` : `(${timer}s)`) : ''}`}
          size={LinkSizeEnum.xsmall}
          onClick={onClickResendOtp}
          isDisable={isDisabled}
        />
      </div>
    </div>
  )
}
