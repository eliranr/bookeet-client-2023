import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function SoNow() {
  const navigate = useNavigate();
  return (
    <div dir='rtl' className='flex flex-col items-center justify-center space-y-7 h-[380px] bg-[#20b2aa]'>
        <h1 className='text-4xl text-white font-semibold'>אז למה לחכות? התחל מיד!</h1>
        <div className='space-x-2 space-x-reverse text-xl'>
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-7 rounded-2xl"
            onClick={() => {
              navigate('/register');
          }}
          >
            הירשם
          </button>
          <button class="bg-transparent hover:bg-blue-600 text-white font-semibold py-4 px-7 border border-white hover:border-transparent rounded-2xl"
            onClick={() => {
              navigate('/login');
          }}>
            התחבר
          </button>
        </div>
    </div>
  )
}
