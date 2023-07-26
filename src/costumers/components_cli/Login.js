import React, { useEffect, useState } from 'react'

import {useRecoilState, useRecoilValue} from 'recoil';
import {clientState0} from '../../atom/costumersAtom';
import {wordstState} from '../../atom/modalAtom'


export default function Login({store}) {
    const [reg, setReg] = useState(0)
    const [client, setClient] = useRecoilState(clientState0);
    const words = useRecoilValue(wordstState);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (reg === 0) submitOne(e);
        else if (reg === 1) submitTwo(e);
    }

    const submitOne = (e) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({phone: e.target.elements.phone.value})
        };
        fetch('/login-reg-clients', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data === false) {
                    setReg(1);
                } else {
                    setClient(data)
                }
        });
    }

    const submitTwo = (e) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: e.target.elements.code.value,
                name: e.target.elements.name.value
            })
        };
        fetch('/login-reg-clients-2', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data === false) {
                    alert('wrong code');
                } else {
                    setClient(data);
                }
                
        });
    }


    return (
        <div className='flex flex-col text-center min-h-[calc(100vh-50px)] justify-center items-center space-y-10'>
            <h2 className='text-[27px]'>{words.Login}</h2>
            <div className="mb-6 text-left w-[95%] sm:w-[400px]">
                <form onSubmit={handleSubmit} className='flex flex-col space-y-5' autoComplete='off'>

                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.phone_number}</label>
                        <div className='flex rtl:flex-row-reverse'>
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                {store.area_code}
                            </span>
                            <input dir='ltr' type="text" id="phone" className="inps rounded-tl-none rounded-bl-none disabled:bg-gray-300" placeholder="501234567" disabled={reg !== 0} required />
                        </div>
                    </div>


                    {reg === 1 && (
                        <>
                        <div>
                            <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.code}</label>
                            <input type="text" id="code" dir="ltr" className="inps" placeholder='XXXXX' required />
                        </div>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.fullName}</label>
                            <input type="text" id="name" dir="ltr" className="inps" placeholder='Alona Tal' required />
                        </div>
                        </>
                    )}


                    <button type='submit' className='bg-blue-600 rounded-[15px] px-2 py-3 text-white font-bold w-full hover:brightness-90'>
                        {reg === 0 ? `${words.continune}` : `${words.reg}`}
                    </button>
                </form>

                
            </div>
        </div>
    )
}
