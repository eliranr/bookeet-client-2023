import React, { useEffect, useState } from 'react'
import {useRecoilState} from 'recoil';
import {dropState, managerState, storeState, langState, workersState, currenManagerState} from '../atom/modalAtom';
import { useNavigate } from 'react-router-dom';

import { PencilSquareIcon } from '@heroicons/react/24/solid'

export default function DropMenu() {
    const [drop, setDrop] = useRecoilState(dropState);
    const [manager, setManager] = useRecoilState(managerState);
    const [store, setStore] = useRecoilState(storeState);
    const [currentLang, setCurrentLang] = useRecoilState(langState);
    const navigate = useNavigate();
    const [workers, setWorkers] = useRecoilState(workersState);
    const [currenManager, setCurrenManager] = useRecoilState(currenManagerState);

    const changeWorker = (worker_uid) => {
        if (manager.level <= 1) {
            const index = workers.findIndex((element) => element.uid  === worker_uid);
            setCurrenManager(workers[index]);
            setDrop(false);
        } else {
            // אין לך את ההרשאות
        }
    }
    

    useEffect(() => {
        window.addEventListener("click", (e) => {
            if (drop) {
                if (e.target.id !== 'letterBut') {
                    const bol = isDropPop(e.target);
                    if (!bol) {
                        setDrop(false)
                    }
                }
            }
          
        });
    });
    const isDropPop = (element) => {
        var coni = true;
        while (coni) {
            if (element.id === 'dropPop') {
                coni = false;
            } else {
                element = element.parentElement;
                if (element === null) {
                    coni = false
                }
            }
        }
        if (element == null) {
            return false
        }
        return true
    }

    const logout = () => {
        fetch('/logout').then(
            response => response.json()
          ).then(
            data => {
              if (data === true) {
                window.location.reload(true);
              }
            }
          )
    }
    

    if (drop)
        return (
            <div id='dropPop' className={`bg-white absolute top-2 ${currentLang === 'heb' ? 'left-2' : 'right-2'} w-[210px] h-auto rounded-lg border shadow-xl flex flex-col items-center py-5`}>
                <div className='w-[60px] h-[60px] rounded-full flex items-center justify-center text-[28px] text-white font-semibold' style={{backgroundColor: currenManager.setting.color}}>
                    {currenManager.info.name.slice(0, 1)}
                </div>
                <div className='font-bold text-lg'>
                    {currenManager.info.name}
                </div>
                <a className='' href={`${store.url}.localhost:3000`} target='_blank'>{store.url}.bookeet.net</a>
                <ul className='w-full my-2'>
                    {workers.map((worker) => {
                        var bg = worker.uid === currenManager.uid ? 'bg-gray-100' : '';
                        var cursor = manager.level >= 2 ? 'cursor-auto' : '';
                        if (workers.length === 1) return <></>;
                        return (
                            <li className={`li-user ${bg} ${cursor}`} key={worker.uid} onClick={() => changeWorker(worker.uid)}>
                            <div className={`text-white rounded-full w-8  h-8 flex justify-center items-center`}
                                style={{backgroundColor: worker.setting.color}}
                            >
                                {worker.info.name.slice(0, 1)}
                            </div>
                            <span className='font-bold'>{worker.info.name}</span>
                        </li>
                        )
                    }
                    )}
                    <li className='li-user font-bold' onClick={() => {navigate('/managers'); setDrop(false);}}>
                        <div className=' text-white rounded-full w-8  h-8 flex justify-center items-center'>
                            <PencilSquareIcon className='w-7 h-7 text-green-700' />
                        </div>
                        <span className='font-bold'>ניהול עובדים</span>
                    </li>
                </ul>
                <div className='flex space-x-1 rtl:space-x-reverse'>
                    <button className='but border-[#059669] text-[#059669] hover:bg-[#059669]'>שלח משוב</button>
                    <button className='but border-red-700 text-red-700 hover:bg-red-700' onClick={logout}>התנתק</button>
                </div>
            </div>
    )
}
