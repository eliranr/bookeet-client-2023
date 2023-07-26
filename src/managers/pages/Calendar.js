import React, { useEffect, useState } from 'react'
import {useRecoilState} from 'recoil';
import {headState, bubState} from '../../atom/modalAtom';


export default function Calendar() {
  const [lineHead, setLineHead] = useRecoilState(headState);
  const [bub, setBub] = useRecoilState(bubState);
  const [num, setNum] = useState(0)

  useEffect(() => {
    setLineHead([]);
  }, [])


  const boten = () => {
    setNum(num + 1)
    setBub({
      bol: true,
      text: 'שינויים בוצעו בהצלחה ' + num
    })
  }


  return (
    <div>
      <h1>calendar</h1>
      <button onClick={boten}>click me</button>
    </div>
  )
}
