import React from 'react'

export default function LoadingScreen() {
  return (
    <div className='flex items-center justify-center h-[100vh] bg-gray-50'>
      <img className='w-[300px] animate-pulse transition' src='/images/long.png' alt='logo' />
    </div>
  )
}
