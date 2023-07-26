import React, {useEffect} from 'react'
import { Link } from "react-router-dom";

import { HomeIcon, PresentationChartLineIcon, WrenchScrewdriverIcon, BellIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { CalendarDaysIcon, BeakerIcon } from '@heroicons/react/24/solid'

import {useRecoilState} from 'recoil';
import {menuState, menuMobileState, mobileState} from '../atom/modalAtom';


export default function MenuPanel({param}) {
  const [menuPos, setMenuPos] = useRecoilState(menuState);
  const [menuPosMob, setMenuPosMob] = useRecoilState(menuMobileState);
  const [mobState, setMobState] = useRecoilState(mobileState);

  return (
    <div className={`bg-til-100 h-[calc(100vh-61px)] overflow-hidden w-[245px] z-10
    ${mobState ? 
      `fixed opacity-90 ${!menuPosMob ? 'hidden' : ''}`
    : `${!menuPos ? 'sm:hidden' : 'sticky top-[60px]'}`}
    `
    }>
      <ul className=''>
        {pages.map((page, i) => (
          <Link key={i} to={`/${page.link}`} className='hover:no-underline'>
            <li className={`hover:bg-til-900 text-xl px-4 h-[54px] flex items-center space-x-3 rtl:space-x-reverse text-blc duration-100 ease-out
            ${param === page.link ? 'bg-til-200' : ''}`}>
              {page.icon}
              <span className='hover:no-underline'>{page.text}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}


const pages = [
  {
    text: 'ראשי',
    link: 'home',
    icon: <HomeIcon className='menu-icon' />
  },
  {
    text: 'יומן',
    link: 'calendar',
    icon: <CalendarDaysIcon className='menu-icon' />
  },
  {
    text: 'התראות',
    link: 'home',
    icon: <BellIcon className='menu-icon' />
  },
  {
    text: 'דוחות',
    link: 'reports',
    icon: <PresentationChartLineIcon className='menu-icon' />
  },
  {
    text: 'לקוחות',
    link: 'home',
    icon: <UserGroupIcon className='menu-icon' />
  },
  {
    text: 'שעות פתיחה',
    link: 'opening',
    icon: <ClockIcon className='h-6 w-6' />
  },
  {
    text: 'שירותים',
    link: 'services',
    icon: <BeakerIcon className='h-6 w-6' />
  },
  {
    text: 'הגדרות',
    link: 'setting',
    icon: <WrenchScrewdriverIcon className='h-6 w-6' />
  },
]