import React, { useEffect, useState } from 'react'
import {useRecoilState} from 'recoil';
import {storeState, menuState, mobileState, menuMobileState, dropState, headState, loadingState, currenManagerState} from '../atom/modalAtom';
import { useNavigate } from 'react-router-dom';



export default function Header() {
    const [store, setStore] = useRecoilState(storeState);
    const [menuPos, setMenuPos] = useRecoilState(menuState);
    const [menuPosMob, setMenuPosMob] = useRecoilState(menuMobileState);
    const [mobState, setMobState] = useRecoilState(mobileState);
    const [drop, setDrop] = useRecoilState(dropState);
    const [lineHead, setLineHead] = useRecoilState(headState);
    const [loading, setLoading] = useRecoilState(loadingState);
    const [currenManager, setCurrenManager] = useRecoilState(currenManagerState);
    
    const navigate = useNavigate();

    const updateMenuPos = () => {
        if (mobState) {
            setMenuPosMob(!menuPosMob)
        } else {
            setMenuPos(!menuPos);
            fetch('/menu-pos');
        }
    }


  return (
    <div className='bg-til-900 h-[60px] sticky top-0 w-full z-10 flex items-center justify-between px-2'>
        <div className='flex items-center space-x-3 rtl:space-x-reverse'>
            <button className='hoverEffect p-2' onClick={updateMenuPos}>
                <svg className='w-[18px]' viewBox="0 -53 384 384" xmlns="http://www.w3.org/2000/svg">
                    <path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"></path>
                    <path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"></path>
                    <path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"></path>
                </svg>
            </button>
            <div onClick={() => navigate('/')} className='flex space-x-2 rtl:space-x-reverse items-center cursor-pointer'>
                <img src={loading ? '/images/load-back.gif' : '/images/icon.png'} className='w-9' alt='logo' />
                <h2 className='text-xl text-blc truncate font-semibold'>
                    {store.business_name}
                </h2>
            </div>
        </div>
        
        <div className='flex space-x-1 rtl:space-x-reverse'>
            <div id='bank' className='flex space-x-1 rtl:space-x-reverse'>
                {lineHead.map((item, i) => 
                    <div key={i} style={item.style} onClick={item.func} className={item.class != null ? item.class : "bg-green-700 w-[38px] h-[38px] rounded-full flex items-center justify-center text-white text-lg hoverEffect shadow"}>
                        {item.icon}
                    </div>
                )}
            </div>
            <div id='letterBut' className='w-[38px] h-[38px] rounded-full flex items-center justify-center text-white text-lg hoverEffect shadow'
                style={{backgroundColor: currenManager.setting.color}}
                onClick={() => setDrop(!drop)}
            >
                {currenManager.info.name.slice(0, 1)}
            </div>
        </div>
    </div>
  )
}
