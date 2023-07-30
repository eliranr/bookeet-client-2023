import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Menu() {
    const navigate = useNavigate();
  return (
    <div className='flex justify-center h-[87px] bg-[#0db9b9] px-[20px]'>
        <div className='flex items-center justify-between w-full max-w-[1050px]'>
            <div className='invisible sm:visible'>
                <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-5 rounded-full">
                    הרשמה
                </button>
                <button class=" text-white font-bold py-4 px-5 rounded-full" 
                    onClick={() => {
                        navigate('/login');
                    }}
                >
                    כניסה
                </button>
            </div>
            <div className='flex items-center space-x-3'>
                <span className='text-white font-semibold text-2xl'>Bookeet</span>
                <img className='w-[45px]' src='/images/icon.png' alt='logo' />
            </div>
        </div>
    </div>
  )
}
