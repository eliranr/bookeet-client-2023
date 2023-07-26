import React, { useEffect, useState } from 'react'
import {useRecoilState} from 'recoil';
import { choosenemp, choosentor, choosenworker, clientState0, refreshState0 } from '../../atom/costumersAtom';

export default function Confirm() {
    const [choosenEmp, SetChoosenEmp] = useRecoilState(choosenemp);
    const [choosenTor, setChoosenTor] = useRecoilState(choosentor);
    const [choosenWorker, SetChoosenWorker] = useRecoilState(choosenworker);
    const [client, setClient] = useRecoilState(clientState0);
    const [refresh, setRefresh] = useRecoilState(refreshState0);
    const [loadingBut, setLoadingBut] = useState(false);

    const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]

    var empTime = new Date(choosenEmp)
    
    const uploadTor = () => {
        //console.log(choosenEmp)
        //console.log(choosenTor.index)
        //console.log(choosenWorker.uid)
        setLoadingBut(true);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                empTime: choosenEmp,
                choosenTorIndex: choosenTor.index,
                workerID: choosenWorker.uid
            })
        };
    
        fetch('/upload_tor', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    
                    setRefresh(refresh + 1);
                }
            });
    }

    return (
        <div className='flex flex-col space-y-4 text-[21px] items-start'>
            <div className='flex flex-col'>
                <p><span className='font-semibold'>תור ל</span>{choosenTor.name}</p>
                {
                    choosenTor.managers.length > 1
                    && <p><span className='font-semibold'>מאת </span>{choosenWorker.info.name}</p>
                }
                <p><span className='font-semibold'>בתאריך </span>{getSteDate(empTime)}</p>
                <div className='flex space-x-2 space-x-reverse'>
                    <p><span className='font-semibold'>ביום </span>{days[empTime.getDay()]}</p>
                    <p><span className='font-semibold'>בשעה </span>{addZero(empTime.getHours())}:{addZero(empTime.getMinutes())}</p>
                </div>
            </div>
            {
                client == null
                ?
                <button onClick={() => {}} className='bg-blue-600 rounded-[15px] mx-auto py-2 text-white font-bold w-[200px] hover:brightness-90'>כניסה למערכת</button>
                :
                <button onClick={uploadTor} className={`rounded-[15px] mx-auto py-2 text-white font-bold w-[180px] ${loadingBut ? 'bg-blue-400 ' : 'bg-blue-600 hover:brightness-90'}`} disabled={loadingBut}>הזמן תור</button>
            }
        </div>
    )
}




const addZero = (str) => {  // 08:00
    str = str.toString()
    if (str.length === 1) {
      return str = '0' + str;
    }
    return str;
}

const getSteDate = (date) => {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
}