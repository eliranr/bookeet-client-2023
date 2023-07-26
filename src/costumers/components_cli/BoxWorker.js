import React, { useEffect, useState } from 'react'
import {choosenworker, choosenday, currentime0, weekstart} from '../../atom/costumersAtom';
import {useRecoilState} from 'recoil';

export default function BoxWorker({item, link}) {
    const [choosenWorker, SetChoosenWorker] = useRecoilState(choosenworker);
    const [currenTime, setCurrenTime] = useRecoilState(currentime0);
    const [weekStart, setWeekStart] = useRecoilState(weekstart);

    return (
        <div 
            className='m-3 w-[150px] h-[150px] md:w-[180px] md:h-[180px] hover:bg-gray-200 cursor-pointer bg-gray-100 md:m-5 rounded-xl flex flex-col justify-center items-center'
            onClick={() => {
                SetChoosenWorker(item)
                setWeekStart(setToSun(new Date(currenTime)));
            }}
            >
            <div className='flex flex-col items-center space-y-1'>
                <img className='w-[110px]' src={`${process.env.PUBLIC_URL}/images/${link}.png`} alt="" />
                <span className='text-lg text-gray-700'>{item.info.name}</span>
            </div>
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
