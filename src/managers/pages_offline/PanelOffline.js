import React, { useEffect } from 'react'
import Menu from '../../components/Menu'
import Login from './Login'
import Home from './Home'
import Register from './Register'

export default function PanelOffline({param, toShow}) {
  useEffect(() => {
    console.log(param)
    console.log(toShow)
  }, [])
  return (
    <div className={`transition-opacity ease-out duration-900 ${toShow ? 'opacity-100' : 'opacity-40'}`}>
      {pages[param]}
    </div>
  )
}


const pages = {
    home: <Home />,
    login: <Login />,
    register: <Register />,
}