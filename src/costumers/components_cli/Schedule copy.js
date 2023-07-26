import React, { useEffect, useState } from 'react';
import {useRecoilState} from 'recoil';
import {currentime0, weekstart, choosentor, choosenworker, choosenemp, choosenday} from '../../atom/costumersAtom';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Schedule() {
    const [currenTime, setCurrenTime] = useRecoilState(currentime0);
    const [weekStart, setWeekStart] = useRecoilState(weekstart);
    const [weekEnd, setWeekEnd] = useState(0);
    const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
    const mon = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]

    const [choosenTor, setChoosenTor] = useRecoilState(choosentor);
    const [choosenWorker, SetChoosenWorker] = useRecoilState(choosenworker);
    const [choosenEmp, SetChoosenEmp] = useRecoilState(choosenemp);
    const [choosenDay, setChoosenDay] = useRecoilState(choosenday);
    const [empTor, setEmpTor] = useState([]);
    
    useEffect(() => {
        setEmpList()
    }, [choosenDay])

    const setChoosenDay0 = () => {
        var first_day = null;
        days.map((dayName, d) => {
            if (choosenWorker.defaultOpen[d].check)
                if (first_day == null) {
                    first_day = d;
                }
        })
        console.log(first_day);
        setChoosenDay(first_day)
    }


    const setEmpList = () => {
        setEmpTor([])
        if (choosenDay != null) {
            var finAr = [];
            var dayStart = weekStart + 86400000*choosenDay
            choosenWorker.defaultOpen[choosenDay].range.map((range) => {
                var statePos = range.start + dayStart;
                while ((statePos + choosenTor.time * 60000) <= (range.end + dayStart)) {
                    if (statePos > currenTime) {
                        finAr.push(statePos);
                    }
                    statePos += (10 * 60000);
                }
                finAr.push(false);
            })
            setEmpTor(finAr)
        }
    }
  return (
    <div className='flex flex-col  w-[100%] items-center space-y-3'>
        <div className='flex justify-between w-full lg:w-[90%]'>
            <div onClick={() => {
                    if (setToSun(new Date(currenTime)) <= weekStart - 86400000 * 7) {
                        setWeekStart(weekStart - 86400000 * 7)
                        setChoosenDay0();
                    }
                }}
                className={`${setToSun(new Date(currenTime)) <= weekStart - 86400000 * 7 ? "bg-blue-600 hoverEffect" : "bg-gray-400"} " w-[38px] h-[38px] rounded-full flex items-center justify-center text-white text-lg  shadow"`}
                
            >
                <ArrowRightIcon className="h-6 w-6 text-white" />
            </div>
            <h2 className='text-[22px]'>
                {mon[new Date(weekStart).getMonth()]}
            </h2>
            <div onClick={() => {
                    setWeekStart(weekStart + 86400000 * 7)
                    setChoosenDay0();
                }}
                className="bg-blue-600 w-[38px] h-[38px] rounded-full flex items-center justify-center text-white text-lg hoverEffect shadow"
            >
                <ArrowLeftIcon className="h-6 w-6 text-white"/>
            </div>
        </div>
        <div className='flex justify-center space-x-2 space-x-reverse flex-wrap w-[100%]'>
            {
                choosenDay != null
                ?
                    days.map((dayName, d) => {
                        var dayStart = weekStart + 86400000*d
                        var dayEnd = dayStart + 86400000
                        
                        if (choosenWorker.defaultOpen[d].check && dayEnd > currenTime)
                            return (
                                <div 
                                    key={d}
                                    className={`my-1 hoverEffect hover:!bg-red-600 px-6 py-2 ${d == choosenDay ? 'bg-red-700' : 'bg-red-400'}`}
                                    onClick={() => {
                                        setChoosenDay(d);
                                        //setEmpList();
                                    }}
                                >
                                    <span>{dayName} {new Date(dayStart).getDate()}</span>
                                </div>
                            )
                    })
                :
                <h1>לא קיימים תורים לשבוע זה</h1>
            }
        </div>
        <div className='flex justify-center w-[100%] sm:w-[80%] md:w-[65%] flex-wrap '>
            {empTor.map((emp, e) => {
                if (emp == false)
                    return (
                        <div key={e} className='w-[100%]'>
                        </div>
                    )
                var empTime = new Date(emp)
                return (
                    <div 
                        key={e}
                        className={`m-1 hoverEffect w-[75px] bg-blue-200 border  hover:border-gray-400 py-2`}
                        onClick={() => {
                            SetChoosenEmp(emp)
                        }}
                    >
                        <span>{addZero(empTime.getHours())}:{addZero(empTime.getMinutes())}</span>
                    </div>
                )
            })}
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

const addZero = (str) => {  // 08:00
    str = str.toString()
    if (str.length === 1) {
      return str = '0' + str;
    }
    return str;
  }
  