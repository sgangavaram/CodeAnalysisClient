import './RootLayout.css'
import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationBar from '../navigationBar/NavigationBar'

function RootLayout() {
  return (
    <div className='root-main'>
      <div className='root-nav'>
        <NavigationBar/>
      </div>
      <div className='root-outlet'>
        <Outlet/>
      </div>
    </div>
  )
}

export default RootLayout