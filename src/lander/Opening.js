import React from 'react'

export default function Opening() {
  return (
    <div className='flex justify-center text-[#343a40] px-[20px] my-5'>
        <div className='flex flex-col-reverse sm:flex-row space-y-reverse space-y-6 sm:space-y-0 text-center sm:text-right items-center justify-between w-full max-w-[800px] pb-0 sm:pb-[70px] py-[70px]'>
            <img className='h-[575px]' src='/images/mob0.png' alt='' />
            <div className="flex flex-col items-center sm:items-start space-y-5" dir="rtl">
                <h1 className='text-[35px] font-semibold leading-[45px]'>
                    נהל את העסק שלך<br />
                    בדרך בנוחה ביותר!
                </h1>
                <p className='text-lg'>
                    Bookeet ניהול תורים ולקוחות,<br />
                    מעקב אחר העסק שלך,<br />
                    לעשות את הכל פשוט יותר.
                </p>
                <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 w-[150px] rounded-full">
                    נסה עכשיו!
                </button>
            </div>
        </div>
    </div>
  )
}
