'use client'
import { Button, Input, Link } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { LoginDefaultValue, LoginInterface } from './data/loginInterface'
import { LoginRequest } from '../service'
import { ResponseInterface } from '@/config/config'
import { CreateAccount } from './components'

export default function LoginPage() {
  // LOGIN DETAILS
  const [loginDetails, setLogInDetails] =
    useState<LoginInterface>(LoginDefaultValue)

  const [isInvalidInput, setInvalidInput] = useState<boolean>(false)

  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false)

  // PATH ROUTHER
  const router = useRouter()

  // ON CHANGE FIELDS
  const onChangeFields = (data: LoginInterface) => {
    setLogInDetails({ ...loginDetails, ...data })
  }

  const onClickLogInButton = () => {
    // SET LOADING HERE
    LoginRequest(loginDetails)
      .then((response: ResponseInterface) => {
        if (response.isSuccess && response.resultData) {
          router.push('/home')
        } else {
          setInvalidInput(true)
        }
      })
      .catch((error: ResponseInterface) => {
        setInvalidInput(true)
      })
      .finally(() => {
        // SET LOADING HERE
      })
  }

  return (
    <>
      <div style={{ width: '400px', height: '300px', padding: '20px' }}>
        <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
          <Input
            size='sm'
            required
            key={'email'}
            type='email'
            label='Email'
            disableAnimation={true}
            isInvalid={isInvalidInput}
            value={loginDetails?.userName}
            errorMessage={isInvalidInput ? 'Please enter a valid email' : ''}
            onChange={(data) => {
              setInvalidInput(false)
              onChangeFields({ ...loginDetails, userName: data.target.value })
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onClickLogInButton()
            }}
          />
          <Input
            size='sm'
            required
            key={'pasword'}
            type='password'
            label='Password'
            isInvalid={isInvalidInput}
            value={loginDetails?.password}
            onDragEnter={onClickLogInButton}
            errorMessage={isInvalidInput ? 'Please enter a valid password' : ''}
            onChange={(data) => {
              setInvalidInput(false)
              onChangeFields({ ...loginDetails, password: data.target.value })
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onClickLogInButton()
            }}
          />
          <Button
            size='lg'
            radius='sm'
            type='submit'
            fullWidth={true}
            onClick={onClickLogInButton}
          >
            Login
          </Button>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Link className={'cursor-pointer text-gray-400'} size='sm'>
              Forgot Password
            </Link>
            <Link
              className={'cursor-pointer text-gray-400'}
              size='sm'
              onClick={() => setOpenCreateModal(true)}
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
      <CreateAccount
        isOpenCreateModal={isOpenCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />
    </>
  )
}
