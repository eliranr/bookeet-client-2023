import React from 'react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';

export default function Prices() {
  const navigate = useNavigate();
  var checkIconStyle = "w-[30px] mx-auto text-green-500";

  return (
    <div className='flex justify-center bg-[#e5e5e5] py-[70px] px-[20px]' dir='rtl'>
      <table className='bg-white'>
        <tr className='bg-[#20b2aa]'>
          <th></th>
          <th>פרטי</th>
          <th className=''>עסקי</th>
        </tr>
        <tr>
          <td>מחיר לחודש</td>
          <td class="pri">69.90&#8362;</td>
          <td></td>
        </tr>
        <tr>
          <td>אתר אישי</td>
          <td><CheckIcon className={checkIconStyle} /></td>
          <td><CheckIcon className={checkIconStyle} /></td>
        </tr>
        <tr>
          <td>ממשק web נגיש מכל מכשיר</td>
          <td><CheckIcon className={checkIconStyle} /></td>
          <td><CheckIcon className={checkIconStyle} /></td>
        </tr>
        <tr>
          <td>התראה על פעולות ישירות לנייד</td>
          <td><CheckIcon className={checkIconStyle} /></td>
          <td><CheckIcon className={checkIconStyle} /></td>
        </tr>
        <tr>
          <td>דוחות וסיכום נתונים, בקובץ אקסל</td>
          <td><CheckIcon className={checkIconStyle} /></td>
          <td><CheckIcon className={checkIconStyle} /></td>
        </tr>
        <tr>
          <td>ניהול וסידור זמני פעילות</td>
          <td><CheckIcon className={checkIconStyle} /></td>
          <td><CheckIcon className={checkIconStyle} /></td>
        </tr>
        <tr>
          <td>סוגי שירות</td>
          <td><CheckIcon className={checkIconStyle} /></td>
          <td><CheckIcon className={checkIconStyle} /></td>
        </tr>
        <tr>
          <td>מספר יומנים</td>
          <td><XMarkIcon className={`${checkIconStyle} text-red-500`} /></td>
          <td><CheckIcon className={checkIconStyle} /></td>
        </tr>
        <tr>
          <td>קישורים לרשתות חברתיות</td>
          <td><CheckIcon className={checkIconStyle} /></td>
          <td><CheckIcon className={checkIconStyle} /></td>
        </tr>
        <tr>
          <td>צור קשר עם בעל העסק</td>
          <td><CheckIcon className={checkIconStyle} /></td>
          <td><CheckIcon className={checkIconStyle} /></td>
        </tr>
        <tr>
          <td>תזכורת SMS ללקוח בעלות של 0.04 ש"ח</td>
          <td><CheckIcon className={checkIconStyle} /></td>
          <td><CheckIcon className={checkIconStyle} /></td>
        </tr>
        <tr>
          <td>הודעת SMS במקרה של ביטול/הזזה של תור</td>
          <td><CheckIcon className={checkIconStyle} /></td>
          <td><CheckIcon className={checkIconStyle} /></td>
        </tr>
        <tr>
          <td>תקופת התחייבות</td>
          <td>ללא התחייבות</td>
          <td>ללא התחייבות</td>
        </tr>
        <tr>
          <td>תמיכה טלפונית</td>
          <td><XMarkIcon className={`${checkIconStyle} text-red-500`} /></td>
          <td><CheckIcon className={checkIconStyle} /></td>
        </tr>
        <tr>
          <td>תמיכה בוואטספ</td>
          <td><CheckIcon className={checkIconStyle} /></td>
          <td><CheckIcon className={checkIconStyle} /></td>
        </tr>
        <tr>
          <td></td>
          <td>
            תקופת הניסיון מוגבלת
            ל100 SMS או חודש ימים,
            הראשון מביניהם.
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-5 border border-blue-500 hover:border-transparent rounded-full"
              onClick={() => {
                navigate('/register');
              }}
            >
              נסה כעת!
            </button>
          </td>
          <td>
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-5 border border-blue-500 hover:border-transparent rounded-full">
              בקרוב
            </button>
          </td>
        </tr>
      </table>
    </div>
  )
}

