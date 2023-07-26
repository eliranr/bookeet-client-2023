import React, { useEffect, useState } from 'react'
import {useRecoilState} from 'recoil';
import {headState, refreshState, currenManagerState, loadingState, bubState} from '../../atom/modalAtom';
import Switch from '@mui/material/Switch';
import { XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'
//import Time from "../../components/Time";
import TimeInp from '../../components/TimeInp';



export default function Opening() {
  const [lineHead, setLineHead] = useRecoilState(headState);
  const [currenManager, setCurrenManager] = useRecoilState(currenManagerState);
  const [opening, setOpening] = useState(currenManager.defaultOpen)
  const [refresh, setRefresh] = useRecoilState(refreshState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [bub, setBub] = useRecoilState(bubState);

  
  useEffect(() => {
    const isSame  = isSameList(currenManager.defaultOpen, opening)
    setLineHead(
      loading 
      ? [
          {
            icon: <ArrowUpTrayIcon className="h-5 w-5 text-white"/>,
            func: () => {},
            style: {backgroundColor: "darkgray"},
            class: "w-[38px] h-[38px] rounded-full flex items-center justify-center text-white text-lg shadow"
          }
        ]
      : isSame 
        ? [
            {
              icon: <ArrowUpTrayIcon className="h-5 w-5 text-white"/>,
              func: () => {
                uploadHours();
              },
            }
          ] 
        : []
    );
  }, [opening, loading])

  useEffect(() => {
    setOpening(currenManager.defaultOpen);
  }, [currenManager])

  const updateCheck = (i) => {
    setOpening(
      opening.map((item, r) => 
          r === i 
          ? {...item, check : !item.check} 
          : item 
      )
    )
  }

  const updateHours = (day, range, str, value) => {
    console.log(value);
    setOpening(
      opening.map((item, i) => {
        var rana = [...item["range"]];
        if (i === day ) {
          rana = rana.map((ran, z) => {
            if (z === range) {
              return {...ran, [str]: isNaN(strToUnix(value)) ? "05:00" : strToUnix(value)}
            }
            return ran;
          })
        }
        return (
          i === day 
          ? {...item, "range" : rana}
          : item 
        ) 
      })
    )
  }

  const addrange = (day) => {
    setOpening(
      opening.map((item, r) => 
          r === day
          ? {...item, range : 
              [...item.range, 
                {
                  start: 0,
                  end: 3600000
                }
              ]
            } 
          : item 
      )
    )
  }

  const remHours = (day, range) => {
    var newList = opening.map((item, r) => {
      if (r === day) {
        var list = item.range.filter((li, i) => {
          if (i !== range) {
            return li;
          }
        })
        return {...item, range: list}
      } else {
        return item
      }
    })
    setOpening(newList);
  }

  const isSameList = (list0, list1) => {
    var bol = false;
    try {
      for (var i=0; i<7; i++) {
        if (list0[i].check !== list1[i].check) {
          bol = true;
        }
        if (list0[i].range.length != list1[i].range.length) {
          bol = true;
        }

        list0[i].range.map((item, z) =>  {
          if (list0[i].range[z].start !== list1[i].range[z].start) {
            bol = true;
          }
          if (list0[i].range[z].end !== list1[i].range[z].end) {
            bol = true;
          }
        })
      }
    } catch (error) {
      bol = true;
    }
    return bol;
  }

  const uploadHours = () => {
    setLoading(true);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({uid: currenManager.uid, openHours: opening})
    };

    fetch('/update-open-hours', requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data) {
                setRefresh(refresh + 1);
                //setOpening(currenManager.defaultOpen)
            } else {
                setBub({
                    bol: true,
                    text: 'אירעה שגיאה, אנא נסה שנית'
                })
                setLoading(false);
            }
        });
}

  return (
    <div className='flex flex-col items-center'>
      <div className='container px-[12px] py-[5px] my-5 max-w-[800px] relative flex flex-col'>
        <div className='flex flex-col mx-2'>
          {opening.map((day, i) => (
            <div key={i} className={`${i==6 ? "" : "border-b"} py-2`}>
              <div className="flex items-center justify-between pb-1">
                  <span className='text-lg font-semibold'>{day.name}</span> 
                  <Switch 
                    checked={day.check}
                    onChange={() => updateCheck(i)}
                  />
              </div>
              {day.check ? (
                <div className=''>
                  <div className='space-y-1 mx-1'>

                    {day.range.map((st, t) => (
                      <div key={t} className="flex items-center space-x-1">
                        
                        <input type="time" value={unixToStr(st.start)} onChange={(e) => updateHours(i, t, "start", e.target.value)} />
                        <input type="time" value={unixToStr(st.end)} onChange={(e) => updateHours(i, t, "end", e.target.value)} />
                        {day.range.length > 1 && (
                          <XMarkIcon 
                            className="h-8 w-8 hoverEffect p-1"
                            onClick={() => remHours(i, t)}
                          />
                        )}
                      </div>
                    ))}

                  </div>
                  {
                    day.range.length !== 3 ? (
                      <div className='py-3'>
                        <span onClick={() => addrange(i)} className='text-blue-500 cursor-pointer hover:underline'>+ הוסף טווח שעות</span>
                      </div>
                    ) : (
                      <div className='py-2'>
                      </div>
                    )
                  }
                  
                </div>
              ) : (
                <div className={`pb-2`}>
                  <span className='font-medium mx-1'>סגור</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


const strToUnix = (str) => {  // 08:00
  var [hour, minutes] = str.split(":");
  hour = Number(hour) * 3600000;
  minutes = Number(minutes) * 60000
  return minutes + hour;
}

const unixToStr = (num) => {  // 08:00
  var hour = Math.round(num / 3600000)
  var minutes = ( ( num - (hour * 3600000) ) / 60000 );
  hour = addZero(hour.toString()); 
  minutes = addZero(minutes.toString());

  return hour + ':' + minutes;
}

const addZero = (str) => {  // 08:00
  if (str.length === 1) {
    return str = '0' + str;
  }
  return str;
}
