'use client'
import { accountDetailStore, logInStore, useStore } from '../store'
import { ForgotPassword, SignUpAccount } from './components'
import { loginDefaultValue, LoginInterface } from './data'
import { ResponseInterface } from '@/config/config'
import React, { Fragment, useState } from 'react'
import { checkRequiredFields } from '../utils'
import { useRouter } from 'next/navigation'
import { LoginRequest } from '../service'
import {
  openSuccessNotification,
  openWarningNotification,
  CommonInputField,
  CommonLinkButton,
  CommonTypography,
  CommonButon,
} from '../common'
import {
  ButtonColorTypeEnum,
  TypographySizeEnum,
  ButtonTypeEnum,
  LinkSizeEnum,
  RadiusEnum,
  SizeEnum,
} from '../constant/enums'

export default function LoginPage() {
  // LOADING SCREEN STORE
  const { setAccountId, setFirstName, setLastName, setEmail } =
    accountDetailStore()
  const { setIsLoading } = useStore()
  const { setIsLogIn } = logInStore()

  // PATH ROUTHER
  const router = useRouter()

  // LOGIN OR SIGN UP FORM DISPLAY
  const [isOpenSignUpForm, setOpenSignUpForm] = useState<boolean>(false)

  // FORGOT PASSWORD FORM DISPLAYE
  const [isOpenForgotPass, setOpenForgotPass] = useState<boolean>(false)

  // ERROR KEY FIEDLS HANDLER
  const [errorFields, setErrorFields] = useState<string[]>([])

  // LOGIN DETAILS
  const [loginDetails, setLogInDetails] =
    useState<LoginInterface>(loginDefaultValue)

  // ON CHANGE FIELDS
  const onChangeFields = (data: LoginInterface) => {
    setLogInDetails({ ...loginDetails, ...data })
  }

  // ON ENTER FIELDS
  const onEnterFields = (data: { key: string }) => {
    if (data.key === 'Enter') onClickLogInButton()
  }

  // ON CLICK SIGN UP BUTTON
  const onClickSignUpButton = () => {
    setErrorFields([])
    setOpenSignUpForm(true)
    onChangeFields(loginDefaultValue)
  }

  // ON CLICK FORGOT PASS BUTTON
  const onClickForgotPassButton = () => {
    setErrorFields([])
    setOpenForgotPass(true)
    onChangeFields(loginDefaultValue)
  }

  const onSetAccountDetails = (response: ResponseInterface) => {
    setAccountId(response.resultData.id)
    setEmail(response.resultData.email)
    setLastName(response.resultData.lastName)
    setFirstName(response.resultData.firstName)
  }

  // LOG IN REQUEST
  const onClickLogInButton = () => {
    let errors = checkRequiredFields(loginDefaultValue, loginDetails)
    if (errors.length > 0) {
      setErrorFields(errors)
    } else {
      setIsLoading(true)
      LoginRequest(loginDetails)
        .then((response: ResponseInterface) => {
          if (response.isSuccess && response.resultData) {
            // LOGIN SUCCESSFUL
            openSuccessNotification({
              description: 'Logged in successfully.',
              placement: 'bottomRight',
            })
            // SET ACCOUNT DETAILS
            onSetAccountDetails(response)
            // REDIRECT TO HOME
            router.push('/home')
            setIsLogIn(true)
            onChangeFields(loginDefaultValue)
          }
        })
        .catch((error: any) => {
          // RETURN ERROR MESSAGE
          openWarningNotification({
            description: error.response?.data?.message || 'An error occurred',
            placement: 'bottomRight',
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  return (
    <Fragment>
      <div className='login-form-container'>
        {!isOpenSignUpForm && !isOpenForgotPass && (
          <div className='login-fields-container'>
            <div className='grid w-full'>
              <CommonTypography
                label={'Login'}
                size={TypographySizeEnum.xxlarge}
              />
              <div className='sign-up-container'>
                <div style={{ height: '27.8px' }}>
                  <CommonTypography
                    size={TypographySizeEnum.note}
                    label={"Doesn't have an account yet?"}
                  />
                </div>
                <div>
                  <CommonLinkButton
                    label='Sign Up'
                    size={LinkSizeEnum.xsmall}
                    onClick={onClickSignUpButton}
                  />
                </div>
              </div>
            </div>
            <CommonInputField
              type={'email'}
              key={'username'}
              label={'Username'}
              required={true}
              size={SizeEnum.small}
              onKeyDown={onEnterFields}
              value={loginDetails?.username}
              isError={errorFields.includes('username')}
              onChange={(data) =>
                onChangeFields({
                  ...loginDetails,
                  username: data.target.value,
                })
              }
            />
            <div className='forgot-password-container'>
              <div>
                <CommonTypography
                  size={TypographySizeEnum.note}
                  label={'Forgot Password?'}
                />
              </div>
              <div>
                <CommonLinkButton
                  label='Need Help Logging In'
                  size={LinkSizeEnum.xsmall}
                  onClick={onClickForgotPassButton}
                />
              </div>
            </div>
            <CommonInputField
              required={true}
              key={'password'}
              type={'password'}
              label={'Password'}
              size={SizeEnum.small}
              onKeyDown={onEnterFields}
              value={loginDetails?.password}
              isError={errorFields.includes('password')}
              onChange={(data) =>
                onChangeFields({
                  ...loginDetails,
                  password: data.target.value,
                })
              }
            />
            <div className='login-button-container'>
              <CommonButon
                fullWidth={true}
                buttonTxt='Login'
                size={SizeEnum.medium}
                radius={RadiusEnum.small}
                type={ButtonTypeEnum.submit}
                onClick={onClickLogInButton}
                buttonColorType={ButtonColorTypeEnum.primary}
              />
            </div>
          </div>
        )}
        {isOpenSignUpForm && (
          <SignUpAccount setOpenSignUpForm={setOpenSignUpForm} />
        )}
        {isOpenForgotPass && (
          <ForgotPassword setOpenForgotPass={setOpenForgotPass} />
        )}
      </div>
    </Fragment>
  )
}
