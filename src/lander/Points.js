import React from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { ClockIcon, BellAlertIcon } from '@heroicons/react/24/solid'

export default function Points() {
    var boxStyle = "flex flex-col items-center space-y-6 px-5 md:w-[33%] "; //border-4 border-indigo-600
    var pStyle = "leading-[38px] px-3";



    return (
    <div className='flex flex-col md:flex-row text-xl space-y-[70px] md:space-y-0 text-center justify-center  text-white bg-blue-500 py-[100px] relative bottom-[250px] sm:bottom-0'>
        <div className={`${boxStyle} pt-2`}>
            <div className='flex bg-white rounded-full w-[65px] h-[65px]'>
                <CheckIcon className="relative left-1 top-1 h-[55px] w-[55px] text-blue-500" />
            </div>
            <span className='text-3xl text-[28px] font-bold'>ממשק נוח וקל לתפעול</span>
            <p className={pStyle}>
            מבוסס על פלפורמת web המאפשרת גישה לממשק מכל מכשיר ללא צורך באפליקציה. 
            </p>
        </div>
        <div className={boxStyle}>
            <BellAlertIcon className="w-[80px]" />
            <span dir='rtl' className='text-3xl text-[28px] font-bold max-w-[470px]'>מערכת התראות שמשאירה את כולם בעיניינים!</span>
            <p className={pStyle}>
            הלקוחות יקבלו תזכורת באסמס  לפני התור ובעל העסק יקבל התראות ישירות לאפליקציה לגבי כל פעילות, הרשמה של לקוח חדש, הזמנת תור או ביטול תור.
            </p>
        </div>
        <div className={boxStyle}>
            <ClockIcon className="w-[80px]" />
            <span className='text-3xl text-[28px] font-bold'>חסכון בזמן</span>
            <p className={pStyle}>
            על ידי קביעה ראשונית של שעות הפעילות, וסוגי השירותים המוצעים, הלקוח יוכל להזמין תור דרך קישור העסק שלכם, אין יותר צורך לדבר עם לקוחות טלפונית או להתכתב איתם, פשוט לתת להם לבחור! 
            </p>
        </div>
    </div>
  )
}
