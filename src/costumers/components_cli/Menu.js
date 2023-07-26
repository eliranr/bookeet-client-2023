import React from 'react'
import {useRecoilValue} from 'recoil';
import {wordstState} from '../../atom/modalAtom'

export default function Menu({client}) {
    const words = useRecoilValue(wordstState);
  return (
    <>
    <div className='flex justify-end md:justify-center bg-white sticky top-0 px-2 sm:px-9 z-10'>
        <div className='flex justify-start  h-9 w-[255px] md:w-[279px]'>
            <div className='border-t-[5px] border-blue-800 w-[85px] md:w-[93px]'>

            </div>
        </div>
    </div>
    <div className='flex justify-between px-2 sm:px-9 items-center sticky top-1 py-2 bg-white z-10'>
        <div className='w-full'>
            <img className='w-9' src='/images/icon.png' alt='logo' />
        </div>
        <ul className='flex w-full justify-end md:justify-center'>
            <li className='hoverEffect2'>{words.ABOUT}</li>
            <li className='hoverEffect2'>{words.BOOK}</li>
            {client ? (
            <li className='hoverEffect2'>{words.QUEUES}</li>
            ) :
            <li className='hoverEffect2'>{words.LOGIN}</li>
            }
            
        </ul>
        <div className='hidden md:flex space-x-5 lg:space-x-10 rtl:space-x-reverse  w-full justify-end'>
            <a href='#' className='hoverEffect' alt=''>
            <img className='w-6 m-2' src='https://cdn.iconscout.com/icon/free/png-256/instagram-1795679-1524222.png' />
            </a>
            <a href='#' className='hoverEffect' alt=''>
            <img className='w-6 m-2 hoverEffect0' src='https://cdn.iconscout.com/icon/free/png-256/facebook-3660042-3094476.png' />
            </a>
            <a href='#' className='hoverEffect' alt=''>
            <img className='w-6 m-2 hoverEffect0' src='https://cdn.iconscout.com/icon/free/png-256/waze-5716792-4785175.png' />
            </a>
        </div>
    </div>
    </>
  )
}
