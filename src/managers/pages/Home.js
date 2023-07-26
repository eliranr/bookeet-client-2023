import React, { useEffect } from 'react'
import {useRecoilState} from 'recoil';
import {headState} from '../../atom/modalAtom';


export default function Home() {
  const [lineHead, setLineHead] = useRecoilState(headState);
  useEffect(() => {
    setLineHead([]);
  }, [])

  return (
    <div className='text-3xl font-bold underline'>Home</div>
  )
}
