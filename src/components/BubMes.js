import Snackbar from '@mui/material/Snackbar';
import { useEffect } from 'react';
import { bubState } from '../atom/modalAtom';
import {useRecoilState} from 'recoil';
import { XMarkIcon } from '@heroicons/react/24/outline'


export default function BubMes({text}) {
    const [bub, setBub] = useRecoilState(bubState);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setBub(prevState => ({
            ...prevState,
            bol: false,
          })
        )
    };

    const action = (
        <XMarkIcon className='w-5 h-5 cursor-pointer' onClick={handleClose}/>
    )


    return (
        <Snackbar
            open={bub.bol}
            autoHideDuration={5000}
            message={bub.text}
            onClose={handleClose}
            action={action}
        />
    )
}