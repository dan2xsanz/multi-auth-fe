'use client'
import './home.css'
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='main-background'>
      <div className={`main-container`}>
        {children}
      </div>
    </div>
  )
}
