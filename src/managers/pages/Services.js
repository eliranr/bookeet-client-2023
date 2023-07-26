import React, { useEffect, useState } from 'react'
import {useRecoilState, useRecoilValue} from 'recoil';
import {headState, popState, popHtml, storeState, wordstState, loadingState, refreshState, currenManagerState, bubState, langState, workersState, managerState} from '../../atom/modalAtom';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { PencilSquareIcon, ArrowUpTrayIcon } from '@heroicons/react/24/solid'
import CheckboxesTags from '../../components/CheckboxesTags'
import SelectBoxTags from '../../components/SelectBoxTags'
import Switch from '@mui/material/Switch';
import axios from 'axios';


export default function Services() {
    const [lineHead, setLineHead] = useRecoilState(headState);
    const [open, setOpen] = useRecoilState(popState);
    const [html, setHtml] = useRecoilState(popHtml);
    const [store, setStore] = useRecoilState(storeState);
    const [currentLang, setCurrentLang] = useRecoilState(langState);
    const words = useRecoilValue(wordstState);
    const [side, setSide] = useState(['r', 'l']);
    const [workers, setWorkers] = useRecoilState(workersState);
    const [forTree, setForTree] = useState(false);
    const [manager, setManager] = useRecoilState(managerState);


    useEffect(() => {
        setLineHead([
            {
              icon: <PlusIcon className="h-6 w-6 text-white"/>,
              func: () => {
                setHtml(<CreateService />)
                setOpen(true);
              }
            }
          ])
      }, [])


    useEffect(() => {
        if (currentLang === 'heb') {
            setSide(['r', 'l'])
        } else {
            setSide(['l', 'r'])
        }
    }, [currentLang])

    useEffect(() => {
        if (workers.length === 1) {
            setForTree(false);
        } else {
            setForTree(true);
        }
    }, [workers])


  return (
    <div className='flex flex-col items-center'>
        <div className='container px-[12px] py-[5px] mt-5 max-w-[800px] relative flex flex-col'>
            <table className='w-[100%] border-separate border-spacing-y-2'>
                <thead className=''>
                    <tr className=''>
                        <th className={`bg-blue-300 py-7 rounded-t${side[0]}-md !w-[60px]`}></th>
                        <th className={`bg-blue-300 ${forTree && 'w-[20%]'}`}>תיאור</th>
                        {workers.length > 1 && (
                            <th className='bg-blue-300 w-[20%]'>בשימוש</th>
                        )}
                        <th className={`bg-blue-300 ${forTree && 'w-[20%]'}`}>אורך</th>
                        <th className={`bg-blue-300 ${forTree && 'w-[20%]'}`}>מחיר</th>
                        {false && (
                            <th className={`bg-blue-300 rounded-t${side[1]}-md`}></th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {store.services != null && (
                        store.services.map((service, i) => {
                            var bol = manager.level < 2 || service.creator === manager.uid;
                            return(
                            <tr key={i} className={`text-center h-[85px] hover:bg-gray-200 ${bol && 'cursor-pointer'}`} onClick={() => {
                                    if (bol) {
                                        setHtml(<CreateService exService={service} index={i} />)
                                        setOpen(true);
                                    }
                                }}
                            >
                                <RowTab service={service} i={i} swit={!bol} />
                            </tr>
                        )})
                    )} 
                </tbody>
            </table>
        </div>
    </div>
  )
}

function RowTab({service, i, swit}) {
    const [side, setSide] = useState(['r', 'l']);
    const [workers, setWorkers] = useRecoilState(workersState);
    const [store, setStore] = useRecoilState(storeState);
    const [currentLang, setCurrentLang] = useRecoilState(langState);
    const [manager, setManager] = useRecoilState(managerState);
    const [isCheck, setIsCheck] = useState(service.managers.includes(manager.uid));
    const [bub, setBub] = useRecoilState(bubState);
    const [refresh, setRefresh] = useRecoilState(refreshState);
    const [loading, setLoading] = useRecoilState(loadingState);


    const changeCheck = () => {
        setIsCheck(!isCheck)
        setLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({index: i})
        };

        fetch('/update-service-use', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setRefresh(refresh + 1);
                } else {
                    setBub({
                        bol: true,
                        text: 'אירעה שגיאה, אנא נסה שנית'
                    })
                    setIsCheck(isCheck)
                    setLoading(false);
                }
            });
    }

    
    useEffect(() => {
        if (currentLang === 'heb') {
            setSide(['r', 'l'])
        } else {
            setSide(['l', 'r'])
        }
    }, [currentLang])

    const findWorker = (ids, bol) => {
        const index = workers.findIndex((element) => element.uid === ids);
        if (bol != null) {
            if (!bol) return workers[index].info.name; // + ', ';
        }
        
        return workers[index].info.name;
    }
    return (
        <>
            <td  Style="width: 1%;" className={`px-1 !w-[60px] ${store.services.length === i+1 ? `rounded-b${side[0]}-md` : ''}`} >
                <div className='td w-[50px] md:w-[60px]'>
                    <img 
                    className={`rounded-full border-4 shadow-md`} 
                    style={{borderColor: service.color}}
                    src='/images/icon.png' 
                    alt='logo' />
                </div>
            </td>
            <td className='truncate'>{service.name}</td>
            {workers.length > 1 ? (
                <td className='truncate overflow-hidden w-[10%]'>{
                    service.managers.map((mng, z) => {
                        if (mng !== manager.uid || !swit)
                            return (
                            <div key={z}>
                                <span  className='truncate'>{findWorker(mng, service.managers.length === z+1)}</span><br />
                            </div>
                    )})
                    }
                    {swit && (
                        <div>
                            <Switch 
                                checked={isCheck}
                                onChange={changeCheck}
                            />
                        </div>
                    )}
                </td>
            ) : ''}
            <td>{service.time} דק'</td>
            <td>{service.price}&#8362;</td>
        </>
    )
}





function CreateService({exService, index}) {
    const words = useRecoilValue(wordstState);
    const [open, setOpen] = useRecoilState(popState);
    const [loading, setLoading] = useRecoilState(loadingState);
    const [refresh, setRefresh] = useRecoilState(refreshState);
    const [currenManager, setCurrenManager] = useRecoilState(currenManagerState);
    const [bub, setBub] = useRecoilState(bubState);
    const [manager, setManager] = useRecoilState(managerState);


    const [obj, setObj] = useState(
        exService == null ? {
        name: '',
        time: '',
        price: '',
        color: '',
        managers: [currenManager.uid],
        creator: manager.uid
    } : exService)



    const handleChange = e => {
        const { id, value } = e.target;
        setObj(prevState => ({
            ...prevState,
            [id]: value
        }));
    };
    const handleChange2 = (value) => {
        var newList = value.map((mana) => {
            return mana.uid
        })
        setObj(prevState => ({
            ...prevState,
            managers: newList
        }));
    };

  
    const deleteService = (e) => {
        e.preventDefault();
        setLoading(true);
          const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({...obj, index: index})
          };
  
          fetch('/delete-service', requestOptions)
              .then(response => response.json())
              .then(data => {
                  if (data) {
                      setRefresh(refresh + 1);
                      setOpen(false);
                  } else {
                      setBub({
                          bol: true,
                          text: 'אירעה שגיאה, אנא נסה שנית'
                      })
                      setOpen(false);
                      setLoading(false);
                  }
              });
    }
  
    const firstSub = (e) => {
      e.preventDefault();
      setLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...obj, index: index})
        };

        fetch(exService ? '/update-service' : '/save-service', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setRefresh(refresh + 1);
                    setOpen(false);
                } else {
                    setBub({
                        bol: true,
                        text: 'אירעה שגיאה, אנא נסה שנית'
                    })
                    setOpen(false);
                    setLoading(false);
                }
            });
    }
    
    const uploadImage = (e) => {
        var file = e.target.files[0]; //.files
        console.log(file)
 
        const formData = new FormData();
        formData.append('myFile', file);

        fetch('/upload-image', {
            method: 'post',
            body: formData
        }).catch(console.error)

        //
        
    }

      return (
        <>
        <form className='m-6' autoComplete="off" onSubmit={firstSub}>

            <div className="sm:flex sm:space-x-5 sm:rtl:space-x-reverse w-full">
                <div className='w-full'>
                    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">תמונת שירות</label>
                    <img className='rounded-full h-[67px]' src='/images/icon.png' alt='logo' />
                    {/* <input 
                        type="file" 
                        accept="image/png, image/jpeg"
                        onChange={uploadImage} 
                    /> */}
                </div>
                <div className='w-full mb-4'>
                    <label htmlFor="managers" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">בשימוש</label>
                    <SelectBoxTags exList={obj.managers} handleChange2={handleChange2} />
                </div>
            </div>  
            
            <div className="sm:flex sm:space-x-5 sm:rtl:space-x-reverse justify-between w-full">
                <div className='w-full mb-4'>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.ser_name}</label>
                    <input type="text" id="name" onChange={handleChange} value={obj.name} className="inps" placeholder="תספורת אישה" required />
                </div>
                <div className='w-full mb-4'>
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.price}</label>
                    <input type="number" id="price" onChange={handleChange} value={obj.price} className="inps" placeholder="60" required />
                </div>
            </div>
  

  
  
            <div className="sm:flex sm:space-x-5 sm:rtl:space-x-reverse w-full">
                <div className='w-full mb-4'>
                    <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.Time}</label>
                    <input type="number" id="time" onChange={handleChange} value={obj.time} className="inps" placeholder="40" required />
                </div>
                <div className='w-full mb-4'>
                    <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{words.color}</label>
                    <input type="color" id="color" onChange={handleChange} value={obj.color}  className="inps h-[42px]" placeholder="my makeup" required />
                </div>
            </div>



  
            <div className='flex items-center justify-end mt-2'>
                <div className='flex space-x-1 rtl:space-x-reverse'>
                    {exService != null ? (
                        <>
                        <button 
                            className={`border rounded-lg px-3 py-[7px] border-red-700 hover:bg-red-700 text-red-700 hover:text-white  flex items-center justify-center space-x-[2.5px] rtl:space-x-reverse`}
                            type="button"
                            onClick={deleteService}
                        >
                            <TrashIcon className='w-4 h-4 relative top-[1.5px]' />
                            <span>מחק</span>
                        </button>
                        <button type="submit" className="text-white text-md font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-7 py-[9px] text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {words.save_up}
                        </button>
                        </>
                    ) : (
                        <button type="submit" className="text-white text-md font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-7 py-[9px] text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {words.create}
                        </button>
                    )}
              </div>
            </div>
          </form>
        </>
      )

        
  }