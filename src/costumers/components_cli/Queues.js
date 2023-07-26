import { useEffect } from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {existtors, workersState0} from '../../atom/costumersAtom';


export default function Queues() {
  const [exisrTors, SetExisrTors] = useRecoilState(existtors);
  const [workers, setWorkers] = useRecoilState(workersState0);

  return (
    <div className='flex flex-col text-center min-h-[750px] justify-center items-center space-y-10 py-[100px]'>
      {
        exisrTors.length == 0
        ?
          <h2 className='text-[27px] font-bold'>לא קיימים תורים עתידיים</h2>
        :
          <>
          <h2 className='text-[27px] font-bold'>תורים עתידיים</h2>
          {exisrTors.map((tor, i) => { 
            var torTime = new Date(tor.torStart)
            return (
            <div key={i} className='container bg-gray-50 text-[20px] flex flex-col'>
              <h1 className='font-bold text-[21px]'>{tor.torInfo.name}</h1>
              <div className='my-4'>
                <p><span className='font-semibold'>מאת</span> {findWorker(workers, tor.ids_worker).info.name}</p>
                <p><span className='font-semibold'>בתאריך</span> {getSteDate(torTime)}</p>
                <p><span className='font-semibold'>ביום</span> {days2[torTime.getDay()]}</p>
                <p><span className='font-semibold'>בשעה</span> {addZero(torTime.getHours())}:{addZero(torTime.getMinutes())}</p>
              </div>
              <div className='flex justify-center items-center space-x-2 space-x-reverse'>
                <button 
                    onClick={() => {}} 
                    className='bg-white text-red-600 border-[2px] border-red-600 rounded-[15px] py-2  font-bold w-[150px] hover:bg-red-600 hover:text-white'
                  >ביטול תור
                </button>
                <button 
                    onClick={() => {}} 
                    className='bg-blue-600 rounded-[15px] py-2 text-white font-bold w-[150px] hover:brightness-90'
                  >אישור תור
                </button>
              </div>
            </div>
          )}
          )}
          </>
      }
    </div>
  )
}


const days2 = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
const days = ["א", "ב", "ג", "ד", "ה", "ו", "ש"]

const addZero = (str) => {  // 08:00
  str = str.toString()
  if (str.length === 1) {
    return str = '0' + str;
  }
  return str;
}

const getSteDate = (date) => {
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0');
  var yyyy = date.getFullYear();

  return dd + '/' + mm + '/' + yyyy;
}

const findWorker = (list, ids) => {
  var objWorker = null;
  list.map((worker) => {
    if (worker.uid == ids) {
      objWorker = worker;
    }
  })
  return objWorker;
}