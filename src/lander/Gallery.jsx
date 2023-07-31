import React from 'react'
import { Carousel } from 'flowbite-react';


export default function Gallery() {
  const list = [1,2,3,4]
  return (
    <div className='h-[650px] bg-[#e5e5e5] flex items-center justify-center'>
      <div className='h-[92%] w-[320px]'>
        <Carousel slideInterval={3000}>
          {
            list.map((item, i) => (
              <img
                key={i}
                className='rounded-xl'
                alt="screenshot"
                src={`/images/bom${item}.png`}
              />
            ))
          }
        </Carousel>
      </div>
    </div>
  )
}
