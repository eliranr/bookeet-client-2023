import {useRecoilState} from 'recoil';
import {popState, popHtml} from '../atom/modalAtom';
import Modal from 'react-modal';
import { useEffect } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/outline'

export default function CommentModal() {
    const [open, setOpen] = useRecoilState(popState);
    const [html, setHtml] = useRecoilState(popHtml);

  return (
    <div>
        <Modal 
            ariaHideApp={false}
            isOpen={open} 
            onRequestClose={() => setOpen(false)}
            contentClassName="custom-modal"
            className='focus:outline-none max-w-lg w-[90%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white border-2 rounded-lg shadow-md :focus-visible'
        >
            {html}
        </Modal>
    </div>
  )
}
