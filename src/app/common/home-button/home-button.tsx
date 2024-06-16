import React from 'react'

import './home-button.css'
interface HomeButtonInterface {
  label: string
}
export const HomeButton = (props: HomeButtonInterface) => {
  const { label } = props
  return <div className='home-button-text-style'>{label}</div>
}
