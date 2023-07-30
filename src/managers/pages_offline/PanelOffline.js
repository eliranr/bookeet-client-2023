import React, { useEffect } from 'react'
import Login from './Login'
import Home from './Home'
import Register from './Register'
import Land from '../../lander/Land'

export default function PanelOffline({param, toShow}) {
  return (
    <div className={`transition-opacity ease-out duration-900 ${toShow ? 'opacity-100' : 'opacity-40'}`}>
      {pages[param]}
    </div>
  )
}


const pages = {
    home: <Land />,
    login: <Login />,
    register: <Register />,
}