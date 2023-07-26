import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import {useRecoilState, useRecoilValue} from 'recoil';
import {storeState0, langState0, clientState0, workersState0, currentime0, weekstart, choosenday, choosenworker, existtors, refreshState0, finshOrder0} from '../atom/costumersAtom';
import {wordstState} from '../atom/modalAtom'
import Menu from './components_cli/Menu';
import About from './components_cli/About';
import Services from './components_cli/Services'
import Login from './components_cli/Login';
import Queues from './components_cli/Queues';


export default function AppCostumersApp({sub}) {
  const [store, setStore] = useRecoilState(storeState0);
  const [currentLang, setCurrentLang] = useRecoilState(langState0);
  const [client, setClient] = useRecoilState(clientState0);
  const [workers, setWorkers] = useRecoilState(workersState0);
  const words = useRecoilValue(wordstState);
  const [currenTime, setCurrenTime] = useRecoilState(currentime0);
  const [weekStart, setWeekStart] = useRecoilState(weekstart);
  const [choosenDay, setChoosenDay] = useRecoilState(choosenday);
  const [choosenWorker, SetChoosenWorker] = useRecoilState(choosenworker);
  const [exisrTors, SetExisrTors] = useRecoilState(existtors);
  const [refresh, setRefresh] = useRecoilState(refreshState0);
  const [finshOrder, setFinshOrder] = useRecoilState(finshOrder0);


  useEffect(() => {
    setCurrentLang('heb');
  }, [])

  useEffect(() => {
    setWeekStart(setToSun(new Date(currenTime)));
  }, [currenTime])

  useEffect(() => {
    setChoosenDay0();
}, [weekStart, choosenWorker])


  
  useEffect(() => {
    if (currentLang == "heb") {
      document.querySelector("body").dir = "rtl";
    } else {
      document.querySelector("body").dir = "ltr";
    }
  }, [currentLang]);

  const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
  const setChoosenDay0 = () => {
    if (choosenWorker != null) {
      var first_day = null;
      days.map((dayName, d) => {
          if (choosenWorker.defaultOpen[d].check)
              if (first_day == null) {
                  first_day = d;
              }
      })
      setChoosenDay(first_day)
    }
}

  
  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({sub: sub})
    };
    fetch('/get-data-clients', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (!data) {
            document.location.href = "http://localhost:3000/"; 
          } else {
            setWorkers(data.workers);
            setStore(data.store);
            setClient(data.costumer);
            setCurrenTime(data.currenTime);
            SetExisrTors(data.list_tors)
          }
        });
        if (refresh>0) {
          setFinshOrder(true);
        }
  }, [refresh]);








  if (store == null)
    return <LoadingScreen />
  
  if (store) {
    return (
      <div className='flex justify-center'>
        <div className='w-[95%] sm:w-[1100px]'>
          
          <Menu client={client} />

          <About store={store} client={client} />

          <Services store={store} />

          {client ? (
            <Queues />
          ) : (
            <Login store={store} />
          )}


          <div className="h-[80px] flex justify-center text-[17px] items-center text-gray-700">
            <span>
              © 2022 - Bookeet
            </span>
          </div>
          

        </div>
      </div>
    )
  }
  
}


function setToSun(date) {
  date.setDate(date.getDate() - date.getDay())
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0);
  return date.getTime();
}