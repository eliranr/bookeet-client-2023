import React, {useState} from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {wordstState} from '../../atom/modalAtom';


export default function Login() {
  const navigate = useNavigate();
  const words = useRecoilValue(wordstState);
  const [load, setLoad] = useState(false);
  const [errText, setErrText] = useState('')

  const onSubmit = (e) => {
    e.preventDefault();
    setLoad(true);

    const obj = {
      phone: e.target.elements.phone.value,
      pass: e.target.elements.pass.value
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };
    fetch('https://test-eight-sigma-86.vercel.app/login', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data === true) {
            window.location.reload(true);
          } else {
            setErrText(words[data.mess]);
            e.target.elements[data.ids].setAttribute('class', 'inps inps-err');
            setLoad(false);
          }
        });
    
  }

  const rest_inp = (e) => {
    if (e.target.getAttribute('class').includes('inps-err')) {
      e.target.setAttribute('class', 'inps');
      setErrText('')
    }
  }


  return (
    <div className='flex flex-col items-center justify-center min-h-[100vh] bg-gray-50 shadow'>
      <div className='container sm:w-[450px] p-[35px]'>
        {/* <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          {words['title_log']}
        </h1> */}
        <img src="/images/long.png" alt="image" className='mx-auto w-[190px] cursor-pointer' onClick={() => navigate('/')}/>
        <form className='my-5' onSubmit={onSubmit}  autoComplete="off">
          <div className="mb-6">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words['phone_number']}</label>
            <input type="text" id="phone" onFocus={rest_inp} dir="ltr" className="inps" placeholder="+972540000000" required />
          </div>
          <div className="mb-6">
            <label htmlFor="pass" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words['your_password']}</label>
            <input type="password" id="pass" onFocus={rest_inp} dir="ltr" className="inps" placeholder='••••••••' required />
          </div>
          <div className="flex mb-6 justify-between items-center">
            <p className="block text-sm font-medium text-red-700 dark:text-red-500">
                {errText}
            </p>
            <a href="#" className="text-sm font-medium text-blue-700 hover:underline dark:text-primary-500">{words['forgot']}</a>
          </div>
          {load ? 
            <button type="submit" className={`text-white text-md font-medium bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${load ? 'animate-pulse' : ''}`} disabled>{words['submit']}</button>
          : <button type="submit" className="text-white text-md font-medium bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:bg-blue-800">{words['submit']}</button>
          }
          
        </form>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            {words['dont_have']}
            {' '}<Link className='font-medium text-blue-700 hover:underline dark:text-primary-500' to="/register">{words['sign_up']}</Link>
        </p>
      </div>
    </div>
  )
}
