import React, { useEffect, useState } from 'react'
import BoxWorker from './BoxWorker';
import { motion } from "framer-motion";
import {useRecoilState} from 'recoil';
import {workersState0} from '../../atom/costumersAtom';
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function ChooseWorker() {
    const [workers, setWorkers] = useRecoilState(workersState0);


  return (


    <div className='flex justify-center flex-wrap'>
        {workers.map((worker) => (
            <motion.div
                key={worker.uid}
                initial={{ opacity: 0.2 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
            >
                <BoxWorker item={worker} link={"icon"} />
            </motion.div>
        ))}
    </div>


  )
}
