import React, { useEffect } from 'react'
import {useRecoilValue} from 'recoil';
import {wordstState} from '../../atom/modalAtom'

export default function About({client, store}) {
    const words = useRecoilValue(wordstState);

    const logout = () => {
        fetch('/logout2').then(
            response => response.json()
          ).then(
            data => {
              if (data) {
                window.location.reload(true);
              }
            }
        )
    }

  return (
    <div className='flex flex-col space-y-3 sm:flex-row justify-center items-center sm:space-x-14 rtl:space-x-reverse min-h-[calc(100vh-150px)] '>
        <img className='h-[140px] w-[140px] sm:h-[270px] sm:w-[270px]' src='https://opensearch.org/assets/brand/PNG/Mark/opensearch_mark_default.png' alt='logo' />
        <div className='flex items-center sm:items-start flex-col justify-between h-[240px] sm:h-[280px] w-[280px] space-y-7'>
        <div className='flex flex-col items-center sm:items-start'>
            <h1 className='text-[35px] font-bold '>
                {store.business_name}
            </h1>
            <h1 className='text-[25px] font-bold text-blue-600'>
                {store.slogen}
            </h1>
        </div>

        <div className='flex md:hidden space-x-10 rtl:space-x-reverse'>
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

        {client ? (
            <div className='flex items-center space-x-2 rtl:space-x-reverse'>
            <h2 className='text-[23px] font-bold flex'>{words.welcome} {client.name}!</h2>
            <span className='bg-red-200 rounded-2xl p-2 hoverEffect' onClick={logout}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="23px" height="23px"><path d="M534.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L434.7 224 224 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-53 0-96 43-96 96l0 256c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>
            </span>
            </div>
        ) : (
            <div className='items-center space-x-2 rtl:space-x-reverse hidden md:flex'>
            <h2 className='text-[23px] font-bold flex'>{words.welcome} {words.Guest}!</h2>
            <span className='bg-blue-200 rounded-full p-2 hoverEffect'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="23px" height="23px"><path d="M352 96h64c17.7 0 32 14.3 32 32V384c0 17.7-14.3 32-32 32H352c-17.7 0-32 14.3-32 32s14.3 32 32 32h64c53 0 96-43 96-96V128c0-53-43-96-96-96H352c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-7.5 177.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H160v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z"/></svg>
            </span>
            </div>
        )}
        





        <div className='flex space-x-1 rtl:space-x-reverse w-full'>
            <button className='bg-blue-600 rounded-[15px] px-2 py-3 text-white font-bold w-full hover:brightness-90'>{words.book_now}</button>
            <button className='bg-green-500 rounded-[15px] px-2 py-3 text-white font-bold w-[70px] hover:brightness-90 hover:w-full flex justify-center' 
            onMouseOver={(e) => {
                if (e.target.tagName === 'BUTTON') {
                e.target.innerHTML = 
                    `<div class='flex space-x-2 rtl:space-x-reverse'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 512 512"><path fill="#FFFFFF" d="M0 32L144 0l80 144-83.8 67c36.1 68.4 92.3 124.6 160.8 160.8L368 288l144 80L480 512H448C200.6 512 0 311.4 0 64L0 32z"/></svg>
                    <span>${words.CALL}</span>
                    </div>`
                }
            }}
            onMouseLeave={(e) => e.target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 512 512"><path fill="#FFFFFF" d="M0 32L144 0l80 144-83.8 67c36.1 68.4 92.3 124.6 160.8 160.8L368 288l144 80L480 512H448C200.6 512 0 311.4 0 64L0 32z"/></svg>`}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 512 512"><path fill="#FFFFFF" d="M0 32L144 0l80 144-83.8 67c36.1 68.4 92.3 124.6 160.8 160.8L368 288l144 80L480 512H448C200.6 512 0 311.4 0 64L0 32z"/></svg>
            </button>
        </div>
        </div>
    </div>
  )
}
