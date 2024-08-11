'use client'
import { useStore } from '@/app/store'
import { Drawer } from 'antd'
import React from 'react'

import './common-drawer.css'

interface CommonDrawerProps {
  openDrawer: boolean
  children?: React.JSX.Element
  setOpenDrawer: (data: boolean) => void
}
export const CommonDrawer = (props: CommonDrawerProps) => {
  // COMMON DRAWER PROPS
  const { openDrawer, setOpenDrawer, children } = props

  return (
    <Drawer
      destroyOnClose
      closeIcon={false}
      placement='right'
      open={openDrawer}
      className='custom-drawer-style'
      onClose={() => setOpenDrawer(!openDrawer)}
    >
      {children}
    </Drawer>
  )
}
