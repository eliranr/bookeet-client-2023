import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {useRecoilValue, useRecoilState} from 'recoil';
import {wordstState, langState} from '../../atom/modalAtom';
import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';

export default function Register() {
  const [currentLang, setCurrentLang] = useRecoilState(langState);
  const [regLevel, setRegLevel] = useState(0)
  const [errText, setErrText] = useState('')
  const [load, setLoad] = useState(false);

  
  ///// FIRST /////
  useEffect(() => {
    if (regLevel == 0) {
      const input = document.querySelector("#phone");
      intlTelInput(input, {
        initialCountry: "auto",
        geoIpLookup: function(callback) {
          fetch("https://ipinfo.io/json?token=b317072c24fe2f").then(
            (response) => response.json()
          ).then(
            (jsonResponse) => {
              //console.log(jsonResponse.timezone, jsonResponse.country);
              callback(jsonResponse.country);
            }
          )
        },
      });
    }
  }, [])
  useEffect(() => {
    if (currentLang == 'heb' && regLevel == 0) {
      const flag = document.querySelector('.iti__selected-flag');
      flag.setAttribute('style', 'flex-direction: row-reverse;')
    }
  }, [currentLang])
  const onSubmit = (e) => {
    e.preventDefault();
    setLoad(true);
    const country = '+' + document.querySelector('.iti__selected-flag').getAttribute('title').replace( /^\D+/g, '');
    var obj = {
      area_code: country
    };

    listInps.forEach((item) => {
      obj[item] = e.target.elements[item].value;
    })

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };
    fetch('/reg-first', requestOptions)
        .then(response => response.json())
        .then(data => {
          setLoad(false);
          if (data === true) {
            setRegLevel(1)
          } else {
            console.log('err');
          }
        });

  }
  const listInps = ['name', 'email', 'birth', 'phone', 'gender', 'business_name', 'url']
  ///// \FIRST /////
  ///// TWO /////
  const onSubmitTwo = (e) => {
    e.preventDefault();
    setLoad(true);
    var obj = {};

    listInpsTwo.forEach((item) => {
      obj[item] = e.target.elements[item].value;
    })

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };
    fetch('/reg-two', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data === true) {
            window.location.reload(true);
          } else {
            setLoad(false);
            setErrText(words[data.mess]);
            e.target.elements[data.ids].setAttribute('class', 'inps inps-err')
          }
        });
    
  }
  const listInpsTwo = ['code', 'pass0', 'pass1']

  const rest_inp = (e) => {
    if (e.target.getAttribute('class').includes('inps-err')) {
      e.target.setAttribute('class', 'inps');
      setErrText('')
    }
  }

  ///// \TWO /////
  const navigate = useNavigate();
  const words = useRecoilValue(wordstState);
  if (regLevel == 0)
    return (
      <div className='flex flex-col items-center justify-center min-h-[100vh] bg-gray-50 shadow'>
        <div className='container sm:w-[600px] p-[35px]'>
          <div className='flex items-center'>
            <img src="/images/long.png" alt="image" className='mr-auto mb-5 w-[150px] cursor-pointer' onClick={() => navigate('/')}/>
          </div>
          <form className='my-0' onSubmit={onSubmit} autoComplete="off">

            <div className="sm:flex sm:space-x-5 sm:rtl:space-x-reverse justify-between w-full">
              <div className='w-full mb-6'>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.fullName}</label>
                <input type="text" id="name"  className="inps" placeholder="jonatan chohen" required />
              </div>
              <div className='w-full mb-6'>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.email}</label>
                <input type="email" id="email" className="inps" placeholder="name@mail.com" required />
              </div>
            </div>

            <div className="sm:flex sm:space-x-5 sm:rtl:space-x-reverse w-full">
              <div className='w-full mb-6'>
                <label htmlFor="birth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.birth}</label>
                <input type="Date" id="birth"  className="inps" placeholder="jonatan chohen" required />
              </div>
              <div className='w-full mb-6'>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.gender}</label>
                <div className='flex space-x-5 rtl:space-x-reverse relative top-3'>
                  <div className="flex items-center mb-4">
                    <input id="male" type="radio" name="gender" value="0" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" checked={true} onChange={e => {}} />
                    <label htmlFor="male" className="block ltr:ml-2 rtl:mr-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {words.male}
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input id="female" type="radio" name="gender" value="1" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="female" className="block ltr:ml-2 rtl:mr-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {words.female}
                    </label>
                  </div>
                </div>
              </div>
            </div>


            <div className="sm:flex sm:space-x-5 sm:rtl:space-x-reverse w-full">
              <div className='w-full mb-6'>
                <label htmlFor="business_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.business_Name}</label>
                <input type="text" id="business_name"  className="inps" placeholder="my makeup" required />
              </div>
              <div className='w-full mb-6'>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.phone}</label>
                <input type="text" dir='ltr' id="phone" className="inps" placeholder="54-000-0000" required />
              </div>
            </div>


            <div className="mb-6">
              <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.business_address}</label>
              <div className='flex rtl:flex-row-reverse'>
                <input dir='ltr' type="text" id="url" className="inps rounded-tr-none rounded-br-none" placeholder="makeup" required />
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  {words.url}
                </span>
              </div>
            </div>

            <div className='flex items-center'>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {words.have}
                {' '}<Link className='font-medium text-blue-700 hover:underline dark:text-primary-500' to="/login">{words.login}</Link>
              </p>
              {load ? 
                <button type="submit" className={`ltr:ml-auto rtl:mr-auto text-white text-md font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${load ? 'animate-pulse' : ''}`} disabled>{words.next}</button>
              : <button type="submit" className="ltr:ml-auto rtl:mr-auto text-white text-md font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{words.next}</button>
              }
              
            </div>
          </form>
        </div>

      </div>
    )
  if (regLevel == 1)
    return (
      <div className='flex flex-col items-center justify-center min-h-[100vh] bg-gray-50 shadow'>
        <div className='container sm:w-[450px] p-[35px]'>
          <div className='flex items-center'>
            <img src="/images/long.png" alt="image" className='mr-auto mb-5 w-[150px] cursor-pointer' onClick={() => navigate('/')}/>
          </div>
          <form className='my-0' onSubmit={onSubmitTwo} autoComplete="off">
            <div className="justify-between w-full">
              <div className='w-full mb-5'>
                <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.code}</label>
                <input onFocus={rest_inp} type="text" dir='ltr' id="code"  className="inps" placeholder="12345" required />
              </div>
              <div className='w-full mb-5'>
                <label htmlFor="pass0" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.pass0}</label>
                <input onFocus={rest_inp} type="password" dir='ltr' id="pass0" className="inps" placeholder="••••••••" required />
              </div>
              <div className='w-full mb-5'>
                <label htmlFor="pass1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.pass1}</label>
                <input onFocus={rest_inp} type="password" dir='ltr' id="pass1"  className="inps" placeholder="••••••••" required />
              </div>
            </div>

 

            <div className='flex items-center'>
              <p className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">
                {errText}
              </p>
              


              {load ? 
                <button type="submit" className={`ltr:ml-auto rtl:mr-auto text-white text-md font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${load ? 'animate-pulse' : ''}`} disabled>{words.signup}</button>
              : <button type="submit" className="ltr:ml-auto rtl:mr-auto text-white text-md font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{words.signup}</button>
              }
            </div>
          </form>
        </div>
      </div>
    )
}

