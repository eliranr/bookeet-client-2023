import React, { useEffect, useState } from 'react'
import {useRecoilState, useRecoilValue} from 'recoil';
import { UserPlusIcon } from '@heroicons/react/24/outline'
import { headState, wordstState, popState, popHtml, regState, workersState, refreshState, loadingState, managerState } from '../../atom/modalAtom';
import Worker from '../../components/Worker';

export default function Managers() {
  const [lineHead, setLineHead] = useRecoilState(headState);
  const [open, setOpen] = useRecoilState(popState);
  const [html, setHtml] = useRecoilState(popHtml);
  const words = useRecoilValue(wordstState);
  const [rePos, setRegPos] = useRecoilState(regState);
  const [workers, setWorkers] = useRecoilState(workersState);
  const [manager, setManager] = useRecoilState(managerState);
  


  useEffect(() => {
    if (manager.level <= 1) {
      setLineHead([
        {
          icon: <UserPlusIcon className="h-6 w-6 text-white"/>,
          func: () => {
            setHtml(<RegWorker />)
            setOpen(true);
          }
        }
      ])
    } else {
      setLineHead([]);
    }
  }, [])





  return (
      <div className='flex flex-col items-center'>
        {workers.map((worker) => 
          <div key={worker.uid} className='container mt-5 max-w-[800px] relative flex flex-col'>
            <Worker worker={worker} />
          </div>
        )}
      </div>
  )
}


function RegWorker() {
  const words = useRecoilValue(wordstState);
  const [rePos, setRegPos] = useRecoilState(regState);
  const [open, setOpen] = useRecoilState(popState);
  const [errText, setErrText] = useState('');
  const [refresh, setRefresh] = useRecoilState(refreshState);
  const [loading, setLoading] = useRecoilState(loadingState);


  const rest_inp = (e) => {
    if (e.target.getAttribute('class').includes('inps-err')) {
      e.target.setAttribute('class', 'inps');
      setErrText('')
    }
  }

  const twoSub = (e) => {
    e.preventDefault();
    setLoading(true);
    const obj = {
      code: e.target.elements.code.value,
      pass0: e.target.elements.pass0.value,
      pass1: e.target.elements.pass1.value,
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };
    fetch('/reg-two-worker', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data === true) {
            setRefresh(refresh + 1)
            setRegPos(0);
          } else {
            setErrText(words[data.mess]);
            e.target.elements[data.ids].setAttribute('class', 'inps inps-err')
          }
          setOpen(false);
        });
  }

  const firstSub = (e) => {
    e.preventDefault();
    const obj = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      phone: e.target.elements.phone.value,
      level: e.target.elements.level.value,
      color: e.target.elements.color.value,
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };
    fetch('/reg-first-worker', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data === true) {
            setRegPos(1)  
          } else {
            console.log('err');
          }
        });
  }
  
  if (rePos === 0) {
    return (
      <form className='m-6' autoComplete="off" onSubmit={firstSub}>
          <div className="sm:flex sm:space-x-5 sm:rtl:space-x-reverse justify-between w-full">
            <div className='w-full mb-4'>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.fullName}</label>
              <input type="text" id="name"  className="inps" placeholder="jonatan chohen" required />
            </div>
            <div className='w-full mb-4'>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.email}</label>
              <input type="email" id="email" className="inps" placeholder="name@mail.com" required />
            </div>
          </div>

          <div className="sm:flex sm:space-x-5 sm:rtl:space-x-reverse w-full">
            <div className='w-full mb-4'>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.phone}</label>
              <input type="text" id="phone" className="inps" placeholder="54-000-0000" required />
            </div>
            <div className='w-full mb-4'>
              <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.permissions}</label>
              <select id="level" className='inps'>
                <option value="2">{words.limi}</option>
                <option value="1">{words.owner}</option>
              </select>
            </div>
          </div>


          <div className="sm:flex sm:space-x-5 sm:rtl:space-x-reverse w-full">
            <div className='w-full mb-4'>
              <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.color}</label>
              <input type="color" id="color"  className="inps h-[42px]" placeholder="my makeup" required />
            </div>
            <div className='w-full mb-4'>

            </div>
          </div>

          <div className='flex items-center'>
            <p className="text-red-500 ">
              {/* pop need TO */}
            </p>
            {false ? 
              <button type="submit" className={`ltr:ml-auto rtl:mr-auto text-white text-md font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-7 py-[9px] text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${false ? 'animate-pulse' : ''}`} disabled>{words.next}</button>
            : <button type="submit" className="ltr:ml-auto rtl:mr-auto text-white text-md font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-7 py-[9px] text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{words.next}</button>
            }
            
          </div>
        </form>
    )
  }
    if (rePos === 1) {
      return (
        <form className='m-6' autoComplete="off" onSubmit={twoSub}>
          <div className="sm:flex sm:space-x-5 sm:rtl:space-x-reverse justify-between w-full">
            <div className='w-full mb-4'>
              <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.code}</label>
              <input type="text" id="code" onFocus={rest_inp} className="inps" placeholder="12345" required />
            </div>
          </div>

          <div className="sm:flex sm:space-x-5 sm:rtl:space-x-reverse w-full">
            <div className='w-full mb-4'>
              <label htmlFor="pass0" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.pass0}</label>
              <input type="password" id="pass0" onFocus={rest_inp} className="inps" placeholder="••••••••" required />
            </div>
          </div>

          <div className="sm:flex sm:space-x-5 sm:rtl:space-x-reverse w-full">
            <div className='w-full mb-4'>
              <label htmlFor="pass1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.pass1}</label>
              <input type="password" id="pass1" onFocus={rest_inp} className="inps" placeholder="••••••••" required />
            </div>
          </div>

          <div className='flex items-center'>
            <p className="text-red-500 ">
            {errText}
            </p>
            {false ? 
              <button type="submit" className={`ltr:ml-auto rtl:mr-auto text-white text-md font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-7 py-[9px] text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${false ? 'animate-pulse' : ''}`} disabled>{words.next}</button>
            : <button type="submit" className="ltr:ml-auto rtl:mr-auto text-white text-md font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-7 py-[9px] text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{words.next}</button>
            }
            
          </div>
        </form>
      )
    }
      
}