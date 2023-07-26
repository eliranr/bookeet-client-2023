import React, { useEffect, useState } from 'react'
import MenuPanel from '../../components/MenuPanel'
import Header from '../../components/Header';

import Calendar from './Calendar';
import Reports from './Reports'
import Setting from './Setting'
import Home from './Home'
import Managers from './Managers';
import DropMenu from '../../components/DropMenu';

import BubMes from '../../components/BubMes';
import Services from './Services';
import Opening from './Opening';











export default function Panel({param, toShow}) {

  return (
    <div className={`flex flex-col min-h-[100vh] transition-opacity ease-out duration-900 ${toShow ? 'opacity-100' : 'opacity-40'}`}>
        <Header />
        <div className='grow relative flex'>
          <MenuPanel param={param}/> 
          <div className='bg-gray-50 grow'>
            {pages[param]}       
            <DropMenu />
          </div>
        </div>
        <BubMes />
    </div>
  )
}


const pages = {
    home: <Home />,
    calendar: <Calendar />,
    reports: <Reports />,
    setting: <Setting />,
    managers: <Managers />,
    services: <Services />,
    opening: <Opening />
}
