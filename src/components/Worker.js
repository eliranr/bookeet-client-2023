import React, {useState} from 'react'
import {useRecoilState, useRecoilValue} from 'recoil';
import { langState, wordstState, managerState, refreshState, loadingState } from '../atom/modalAtom';




export default function Worker({worker}) {
    const [currentLang, setCurrentLang] = useRecoilState(langState);
    const [isEdit, setIsEdit] = useState(false)
    const words = useRecoilValue(wordstState);
    const [manager, setManager] = useRecoilState(managerState);
    const [refresh, setRefresh] = useRecoilState(refreshState);
    const [loading, setLoading] = useRecoilState(loadingState);
    const [updPhone, setUpdPhone] = useState(false);
    const [errText, setErrText] = useState('');


    const [objWorker, setObjWorker] = useState({
        uid: worker.uid,
        name: worker.info.name,
        email: worker.info.email,
        phone: worker.info.phone,
        color: worker.setting.color,
        level: worker.level,
        code: ''
    })

    const handleChange = e => {
        const { id, value } = e.target;
        setObjWorker(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const editWorker = (e) => {
        e.preventDefault();
        if (isEdit) {
            setLoading(true);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objWorker)
                };
            fetch('/update-first-worker', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        setRefresh(refresh + 1)
                        setIsEdit(false);
                    } else {
                        setLoading(false);
                        setUpdPhone(true);
                    }
                });


        } else {
            setIsEdit(true);
            
        }
    }

    const cancelChanges = () => {
        console.log('bbbbb');
        setObjWorker({
            uid: worker.uid,
            name: worker.info.name,
            email: worker.info.email,
            phone: worker.info.phone,
            color: worker.setting.color,
            level: worker.level,
            code: ''
        })
        setUpdPhone(false);
        setIsEdit(false);
    }

    const savePhoneWorker = (e) => {
        e.preventDefault();
        setLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(objWorker)
            };
        fetch('/update-two-worker', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data === true) {
                    setRefresh(refresh + 1);
                    setUpdPhone(false);
                    setIsEdit(false);
                } else {
                    setLoading(false);
                    setErrText(words[data.mess]);
                    e.target.elements[data.ids].setAttribute('class', 'inps inps-err')
                }
            });
    }
    
    const rest_inp = (e) => {
        if (e.target.getAttribute('class').includes('inps-err')) {
          e.target.setAttribute('class', 'inps');
          setErrText('')
        }
    }

  
    if (isEdit)
        if (updPhone) {
            return (
                <form autoComplete="off" onSubmit={savePhoneWorker}>
                    <h2 className='text-xl font-semibold'>{objWorker.name}</h2>
                    <span>{objWorker.phone}</span>
                    <div className="sm:flex sm:space-x-5 sm:rtl:space-x-reverse justify-between w-full">
                        <div className='w-full mb-4'>
                            <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.code}</label>
                            <input onFocus={rest_inp} type="text" id="code" value={objWorker.code} onChange={handleChange} className="inps" placeholder="12345" required />
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <span className='text-red-500'>{errText}</span>
                        <div className='flex justify-end space-x-2 rtl:space-x-reverse'>
                            <button 
                            className={`border rounded-lg px-2 py-1 hover:text-white border-red-700 text-red-700 hover:bg-red-700 flex items-center justify-center space-x-[2.5px] rtl:space-x-reverse`}
                            onClick={cancelChanges}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 relative top-[1.5px]">
                                    <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                                    <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                                </svg>
                                <span>ביטול</span>
                            </button>
                            <button 
                            className={`border rounded-lg px-2 py-1 hover:text-blue-600 border-blue-600 text-white bg-blue-600 hover:bg-white flex items-center justify-center space-x-[2.5px] rtl:space-x-reverse`}
                            type="submit"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 relative top-[1.5px]">
                                    <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                                    <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                                </svg>
                                <span>{words.save}</span>
                            </button>
                        </div>
                    </div>
                </form>
            )
        } else {
            return (
                <form className='' autoComplete="off" onSubmit={editWorker}>
                    <div className="sm:flex sm:space-x-5 sm:rtl:space-x-reverse justify-between w-full">
                        <div className='w-full mb-4'>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.fullName}</label>
                            <input type="text" id="name" value={objWorker.name} onChange={handleChange} className="inps" placeholder="jonatan chohen" required />
                        </div>
                        <div className='w-full mb-4'>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.email}</label>
                            <input type="email" id="email" value={objWorker.email} onChange={handleChange} className="inps" placeholder="name@mail.com" required />
                        </div>
                    </div>
    
                    <div className="sm:flex sm:space-x-5 sm:rtl:space-x-reverse w-full">
                        <div className='w-full mb-4'>
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.phone}</label>
                            <input type="text" id="phone" value={objWorker.phone} onChange={handleChange} className="inps" placeholder="54-000-0000" required />
                        </div>
                        <div className='w-full mb-4'>
                            <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.color}</label>
                            <input type="color" id="color" value={objWorker.color} onChange={handleChange} className="inps h-[42px]" placeholder="my makeup" required />
                        </div>
                    </div>
    
                    {(worker.level !== 0 && manager.level === 0) && (
                        <div className="sm:flex sm:space-x-5 sm:rtl:space-x-reverse w-full">
                            <div className='w-full mb-4'>
                                <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.permissions}</label>
                                <select id="level" value={objWorker.level} onChange={handleChange} className='inps'>
                                    <option value={2}>{words.limi}</option>
                                    <option value={1}>{words.owner}</option>
                                </select>
                            </div>
                            <div className='w-full mb-4'>
    
                            </div>
                        </div>
                    )}
                    <div className='flex items-center justify-between'>
                        <span className='text-red-500'>{errText}</span>
                            <div className='flex justify-end space-x-2 rtl:space-x-reverse'>
                            <button 
                            className={`border rounded-lg px-2 py-1 hover:text-white border-red-700 text-red-700 hover:bg-red-700 flex items-center justify-center space-x-[2.5px] rtl:space-x-reverse`}
                            onClick={cancelChanges}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 relative top-[1.5px]">
                                    <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                                    <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                                </svg>
                                <span>ביטול</span>
                            </button>
                            <button 
                            className={`border rounded-lg px-2 py-1 hover:text-blue-600 border-blue-600 text-white bg-blue-600 hover:bg-white flex items-center justify-center space-x-[2.5px] rtl:space-x-reverse`}
                            type="submit"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 relative top-[1.5px]">
                                    <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                                    <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                                </svg>
                                <span>{words.save}</span>
                            </button>
                        </div>
                    </div>
                </form>
            )
        }
    return (
        <>
            <div className={`w-12 h-12 shadow rounded-full flex items-center justify-center absolute ${currentLang === 'en' ? 'right-3' : 'left-3'} top-3`} style={{backgroundColor: worker.setting.color}}>
                <span className='text-white text-xl font-semibold'>
                    {worker.info.name.slice(0, 1)}
                </span>
            </div>

            <h2 className='text-xl font-semibold'>{worker.info.name}</h2>
            <div className='text-lg flex flex-col'>
            <span>{worker.info.email}</span>
            <span>{worker.info.phone}</span>
            <span>{worker.level === 0 ? words.owner_big
                    : worker.level === 1 ? words.owner
                    : worker.level === 2 ? words.limi
                    : ''}</span>
            </div>
            {
            (manager.level <= 1 && worker.level !== 0) || manager.uid === worker.uid 
            ? (
                <button 
                className={`absolute ${currentLang === 'en' ? 'right-3' : 'left-3'} bottom-3 border rounded-lg px-2 py-1 hover:text-white border-blue-600 text-blue-600 hover:bg-blue-600 flex items-center justify-center space-x-[2.5px] rtl:space-x-reverse`}
                onClick={editWorker}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 relative top-[1.5px]">
                        <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                    </svg>
                    <span>{words.edit}</span>
                </button>
            )
            : ''
            }
        </>
  )
}
