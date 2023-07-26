import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import {useRecoilValue, useRecoilState} from 'recoil';
import {choosentor, choosenworker, workersState0} from '../../atom/costumersAtom'
import {wordstState} from '../../atom/modalAtom'

export default function Box({item, link}) {
    const words = useRecoilValue(wordstState);
    const [click, setClick] = useState(false);
    const [card, setCard] = useState(false);
    const [choosenTor, setChoosenTor] = useRecoilState(choosentor);
    const [choosenWorker, SetChoosenWorker] = useRecoilState(choosenworker);
    const [workers, setWorkers] = useRecoilState(workersState0);

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const boten = async () => {
        await delay(0);
        setCard(!card);
    }

    const chooseTor = () => {
        setChoosenTor(item);
        if (item.managers.length === 1) {
            SetChoosenWorker(workers.find((wor) => wor.uid === item.managers[0]));
        }
    }


    const variants = {
        open: { opacity: 1, rotateY: [90, 0] },
        closed: { opacity: 1,  rotateY: [90, 0] },
    }
    return (
        <motion.div 
            onClick={(e) => {
                if (e.target.tagName === 'BUTTON') {
                    // YESSS !!
                } else {
                    setClick(!click); 
                    boten()
                }
            }} 
            className='m-3 w-[150px] h-[150px] md:w-[180px] md:h-[180px] hover:bg-gray-200 cursor-pointer bg-gray-100 md:m-5 rounded-xl flex flex-col justify-center items-center'
            animate={!click ? 'open' : "closed"}
            variants={variants}
            transition={{ duration: 0.5 }}
        >
            {card 
            ? <div className='flex flex-col justify-between h-[85%]'>
                <h2 className='font-bold'>{item.name}</h2>
                <span className='text-md text-gray-700 mt-[2px] rotateY-[20px]'>{words.time}: {item.time} {words.minutes}</span> 
                <span className='text-md text-gray-700 mt-[2px] rotateY-[20px]'>{words.cost}: {item.price} ש"ח</span> 
                <button onClick={() => chooseTor()} className='bg-blue-600 rounded-[15px] py-2 text-white font-bold w-full hover:brightness-90'>{words.book}</button>
            </div>
            : <>
                <div className='flex flex-col items-center space-y-1'>
                    <img className='w-[65%]' src={`${process.env.PUBLIC_URL}/images/${link}.png`} alt="" />
                    <span className='text-lg text-gray-700'>{item.name}</span>
                </div>
            </>}
        </motion.div>
    )
}

