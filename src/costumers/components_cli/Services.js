import React, { useEffect, useState } from 'react'
import Box from './Box'
import { motion } from "framer-motion";
import {useRecoilValue, useRecoilState} from 'recoil';
import {wordstState} from '../../atom/modalAtom'
import {storeState0, workersState0, choosentor, choosenworker, choosenemp, weekstart, currentime0, finshOrder0} from '../../atom/costumersAtom';
import { ArrowUturnRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import ChooseWorker from './ChooseWorker';
import Schedule from './Schedule';
import Confirm from './Confirm';


export default function Services() {
    const words = useRecoilValue(wordstState);
    const [store, setStore] = useRecoilState(storeState0);
    const [choosenTor, setChoosenTor] = useRecoilState(choosentor);
    const [choosenWorker, SetChoosenWorker] = useRecoilState(choosenworker);
    const [choosenEmp, SetChoosenEmp] = useRecoilState(choosenemp);
    const [weekStart, setWeekStart] = useRecoilState(weekstart);
    const [currenTime, setCurrenTime] = useRecoilState(currentime0);
    const [finshOrder, setFinshOrder] = useRecoilState(finshOrder0);

    
    return (
    <div className='relative flex flex-col text-center  min-h-[400px] justify-start items-center space-y-[20px] py-[100px]'>
        {choosenTor !== null 
        ? 
            choosenWorker != null 
            ?
                choosenEmp != null
                ?
                    finshOrder
                    ? 
                    <div className='container bg-gray-50 py-11'>
                        <h1 className='text-[30px] font-bold mb-6'>הזמנתך התקבלה בהצלחה!</h1>
                        <button 
                            onClick={() => {
                                setChoosenTor(null)
                                SetChoosenWorker(null)
                                SetChoosenEmp(null)
                                setFinshOrder(false)
                            }} 
                            className='bg-blue-600 rounded-[15px] mx-auto py-3 text-white font-bold w-[200px] hover:brightness-90'
                        >
                                חזור אחורה
                        </button>
                    </div>
                    :
                    <div className='flex flex-col items-center w-full'>
                        <div className='flex items-center space-x-3 space-x-reverse'>
                            <div onClick={() => {
                                    SetChoosenEmp(null);
                                }} 
                                className="bg-blue-400 w-[38px] h-[38px] rounded-full flex items-center justify-center text-white text-lg hoverEffect shadow"
                            >
                                <ArrowUturnRightIcon className="h-5 w-5 text-white"/>
                            </div>
                            <h2 className='text-[27px]'>אישור הזמנה</h2>
                        </div>
                        <div className='container bg-gray-50 py-5 mt-5 flex flex-col items-center'>
                            <Confirm />
                        </div>
                    </div>
                :
                    <>
                        <div className='flex items-center space-x-3 space-x-reverse'>
                            <div onClick={() => {
                                SetChoosenWorker(null);
                                setWeekStart(setToSun(new Date(currenTime)));
                                if (choosenTor.managers.length === 1) {
                                    setChoosenTor(null);
                                }
                                }} 
                                className="bg-blue-400 w-[38px] h-[38px] rounded-full flex items-center justify-center text-white text-lg hoverEffect shadow"
                            >
                                <ArrowUturnRightIcon className="h-5 w-5 text-white"/>
                            </div>
                            <h2 className='text-[27px]'>יומן תורים</h2>
                        </div>
                        <Schedule />
                    </>
            :
                <>  
                    <div className='flex items-center space-x-3 space-x-reverse'>
                        <div onClick={() => {
                            setChoosenTor(null)
                            }} 
                            className="bg-blue-400 w-[38px] h-[38px] rounded-full flex items-center justify-center text-white text-lg hoverEffect shadow"
                        >
                            <ArrowUturnRightIcon className="h-5 w-5 text-white"/>
                        </div>
                        <h2 className='text-[27px]'>בחר עובד</h2>
                    </div>
                    
                    
                    <div className='w-[100%] sm:w-[600px] md:w-[700px] flex justify-center items-center'>
                        <ChooseWorker />
                    </div>
                </>
        : 
            <>
            <h2 className='text-[27px]'>{words.services}</h2>
            <div className='w-[100%] sm:w-[600px] md:w-[700px] flex justify-center items-center'>
                
                <div className='flex justify-center flex-wrap'>
                    {store.services.map((item, i) => {
                        if (item.managers.length !== 0) {
                            return (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0.2 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: false }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Box item={{...item, index: i}} link={"icon"} />
                                </motion.div>
                            )
                        }
                    })}
                </div>
            </div>
            </>
        }
    </div>
    )
}


function setToSun(date) {
    date.setDate(date.getDate() - date.getDay())
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0);
    return date.getTime();
}
