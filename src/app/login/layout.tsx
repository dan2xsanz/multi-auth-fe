'use client'
import { useStore } from '../store'
import './login.css'
import { Spin } from 'antd'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading } = useStore()

  return (
    <div className='main-background-login'>
      {isLoading && (
        <div className='overlay'>
          <Spin size='large' />
        </div>
      )}
      <div className={`main-container ${isLoading ? 'unclickable' : ''}`}>
        {children}
      </div>
    </div>
  )
}
