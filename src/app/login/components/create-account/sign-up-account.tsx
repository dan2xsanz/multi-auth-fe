import './sign-up-account.css'

import { CreateAccountInterface, createAccountDefaultValues } from './data'
import { OtpValidation } from '../otp-validation/otp-validation'
import { ResponseInterface } from '@/config/config'
import { useStore } from '@/app/store'
import { useState } from 'react'
import {
  openSuccessNotification,
  openErrorNotification,
  openInfoNotification,
  CreateAccountRequest,
  checkRequiredFields,
  ButtonColorTypeEnum,
  TypographySizeEnum,
  CommonInputField,
  CommonLinkButton,
  CommonTypography,
  ButtonTypeEnum,
  LinkSizeEnum,
  CommonButon,
  RadiusEnum,
  SizeEnum,
} from '@/app'

interface CreateAccountModalInterface {
  setOpenSignUpForm: (data: boolean) => void
}

export const SignUpAccount = (props: CreateAccountModalInterface) => {
  // SIGN UP FORM PROPS
  const { setOpenSignUpForm } = props

  // LOADING SCREEN STORE
  const { setIsLoading } = useStore()

  // CREATE ACCOUNT DETAILS
  const [accountDetails, setAccountDetails] = useState<CreateAccountInterface>(
    createAccountDefaultValues,
  )

  // ERROR KEY FIEDLS HANDLER
  const [errorFields, setErrorFields] = useState<string[]>([])

  // VERIFY EMAIL OTP
  const [isVerifyOtp, setVerifyOtp] = useState<boolean>(false)

  // VERIFY EMAIL OTP
  const [isProceedSignUp, setProceedSignUp] = useState<boolean>(false)

  // ON CHANGE FIELDS
  const onChangeFields = (data: CreateAccountInterface) => {
    setAccountDetails({ ...accountDetails, ...data })
  }

  // ON CLICK SIGN UP BUTTON
  const createAccountRequest = async () => {
    setIsLoading(true)
    try {
      const response: ResponseInterface =
        await CreateAccountRequest(accountDetails)
      // RETURN SUCCESS MESSAGE
      if (response.isSuccess && response.resultData) {
        if (!response.resultData.otp) {
          setVerifyOtp(true)
          openInfoNotification({
            description: 'Please Verify OTP.',
            placement: 'bottomRight',
          })
        } else {
          openSuccessNotification({
            description: 'Sign up successfully.',
            placement: 'bottomRight',
          })
          onChangeFields(createAccountDefaultValues)
          setOpenSignUpForm(false)
        }
      }
    } catch (error: any) {
      // RETURN ERROR MESSAGE
      openErrorNotification({
        description: error.response?.data?.message || 'An error occurred',
        placement: 'bottomRight',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // ON CLICK SIGN UP BUTTON
  const onClickSignUpButton = () => {
    // VALIDATE REQUIRED FIELDS
    const errorFields: string[] = checkRequiredFields(
      createAccountDefaultValues,
      accountDetails,
    )
    setErrorFields(errorFields)
    if (
      errorFields.length === 0 ||
      errorFields[0] == 'otp' ||
      errorFields[0] == 'isForgotPass' ||
      errorFields[1] == 'isForgotPass'
    ) {
      createAccountRequest()
    }
  }

  return isVerifyOtp ? (
    <OtpValidation
      setProceedSignUp={setProceedSignUp}
      setVerifyOtp={setVerifyOtp}
      accountDetails={accountDetails}
      setAccountDetails={setAccountDetails}
    />
  ) : (
    <div className={'sign-up-main-container'}>
      <div className='sign-up-title-container'>
        <CommonTypography label={'Sign Up'} size={TypographySizeEnum.xxlarge} />
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
            onClick={() => setOpenSignUpForm(false)}
          />
        </div>
      </div>
      <CommonInputField
        key={'fName'}
        type={'fName'}
        required={true}
        label={'First Name'}
        size={SizeEnum.small}
        value={accountDetails.fName}
        isError={errorFields.includes('fName')}
        onChange={(data) => {
          onChangeFields({ ...accountDetails, fName: data.target.value })
        }}
      />
      <CommonInputField
        key={'lName'}
        type={'lName'}
        required={true}
        label={'Last Name'}
        size={SizeEnum.small}
        value={accountDetails.lName}
        isError={errorFields.includes('lName')}
        onChange={(data) => {
          onChangeFields({ ...accountDetails, lName: data.target.value })
        }}
      />
      <CommonInputField
        key={'email'}
        type={'email'}
        required={true}
        label={'Email'}
        size={SizeEnum.small}
        value={accountDetails.email}
        isError={errorFields.includes('email')}
        onChange={(data) => {
          onChangeFields({ ...accountDetails, email: data.target.value })
        }}
      />
      <CommonInputField
        key={'password'}
        type={'password'}
        required={true}
        label={'Password'}
        size={SizeEnum.small}
        value={accountDetails.password}
        isError={errorFields.includes('password')}
        onChange={(data) => {
          onChangeFields({ ...accountDetails, password: data.target.value })
        }}
      />
      <CommonInputField
        required={true}
        type={'password'}
        key={'verifyPassword'}
        label={'Verify Password'}
        size={SizeEnum.small}
        value={accountDetails.verifyPassword}
        isError={errorFields.includes('verifyPassword')}
        onChange={(data) => {
          if (data.target.value !== accountDetails.password) {
            console.log('im here') // TODO HERERE
          }
          onChangeFields({
            ...accountDetails,
            verifyPassword: data.target.value,
          })
        }}
      />
      <div className='button-container'>
        <CommonButon
          fullWidth={true}
          buttonTxt={isProceedSignUp ? 'Continue Signing Up' : 'Sign Up'}
          disabled={isVerifyOtp}
          size={SizeEnum.medium}
          radius={RadiusEnum.small}
          type={ButtonTypeEnum.submit}
          onClick={onClickSignUpButton}
          buttonColorType={ButtonColorTypeEnum.primary}
        />
      </div>
    </div>
  )
}
