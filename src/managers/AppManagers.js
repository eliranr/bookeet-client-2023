import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Panel from './pages/Panel';
import PanelOffline from './pages_offline/PanelOffline';
import LoadingScreen from '../components/LoadingScreen';

import {useRecoilState} from 'recoil';
import {langState, managerState, storeState, menuState, mobileState, menuMobileState, workersState, refreshState, loadingState, currenManagerState,
  bubState, currentime } from '../atom/modalAtom';
import PopModal from '../components/PopModal';
import axios from 'axios';


function App() {
  const [manager, setManager] = useRecoilState(managerState);
  const [store, setStore] = useRecoilState(storeState);
  const [fade, setFade] = useState(false)
  const [menuPos, setMenuPos] = useRecoilState(menuState);
  const [menuPosMob, setMenuPosMob] = useRecoilState(menuMobileState);
  const [mobState, setMobState] = useRecoilState(mobileState);
  const [timer, setTimer] = useState(new Date().getTime())
  const [currenTime, setCurrenTime] = useRecoilState(currentime);
  

  let { param } = useParams();
  const navigate = useNavigate();
  const [currentLang, setCurrentLang] = useRecoilState(langState);
  const [workers, setWorkers] = useRecoilState(workersState);
  const [refresh, setRefresh] = useRecoilState(refreshState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [currenManager, setCurrenManager] = useRecoilState(currenManagerState);
  const [bub, setBub] = useRecoilState(bubState);

  useEffect(() => {
    console.log(manager);
  }, [manager])

 

  useEffect(() => {
    if(mobState) {
      setMenuPosMob(false);
    }
    setBub({
      bol: false,
      text: ''
    })
  }, [navigate])


  useEffect(() => {
    if (manager) {
      setFade(true);
    } else if (manager === false) {
      setTimeout(() => {
        setFade(true);
      }, 50);
    } else {
      /// i dont know ?!?!
    }
  }, [manager])


  useEffect(() => {
    setCurrentLang('heb');
  }, [])

  useEffect(() => {
    if (currentLang === "heb") {
      document.querySelector("body").dir = "rtl";
    } else {
      document.querySelector("body").dir = "ltr";
    }
  }, [currentLang]);

  useEffect(() => {
    axios.get(`https://test-eight-sigma-86.vercel.app/get-data`)
      .then(res => {
        console.log(res.data);
    })
    // fetch('/get-data').then(
    //   response => response.json()
    // ).then(
    //   data => {
    //     if (!data) {
    //       const diff = new Date().getTime() - timer;
    //       setTimeout(() => {
    //         setManager(false);
    //         setStore(false);
    //       }, 700 - diff);
    //     } else {
    //       setCurrenTime(data.currenTime)

    //       setWorkers(move(data.workers.findIndex((element) => element.uid === data.manager.uid), 0, data.workers));
    //       setMenuPos(data.manager.setting.menu_pos)
    //       setManager(data.manager);
    //       setStore(data.store);
    //       if (refresh === 0) {
    //         setCurrenManager(data.manager);
    //       } else {
    //         setCurrenManager(data.workers[data.workers.findIndex((element) => element.uid === currenManager.uid)]);
    //         setBub({
    //           bol: true,
    //           text: 'שינויים בוצעו בהצלחה'
    //         })
    //       }
          
    //     }
    //     setLoading(false);
    //   }
    // )
  }, [refresh]);

  const move = (from, to, arr) => {
    const newArr = [...arr];

    const item = newArr.splice(from, 1)[0];
    newArr.splice(to, 0, item);

    return newArr;
}



  useEffect(() => {
    window.addEventListener("resize", (e) => {
      handleWindowSize();
    });
  });
  useEffect(() => {
    handleWindowSize();
  }, []);
  const handleWindowSize = () => {
    if (window.innerWidth < 640) {
      setMobState(true)
    } else {
      setMobState(false)
    }
  }


  
  




  if (manager == null) return (
    <LoadingScreen />
  )
    
  if (manager === false) {
    if (pagesOffline.includes(param) || param == null) {
      if (param == null) param = 'home';
      return <PanelOffline param={param} toShow={fade} />
    }
    else
      navigate('/');
  };
  if (manager) {
    if (pagesOnline.includes(param) || param == null) {
      if (param == null) param = 'home';
      return <>
        <Panel param={param} toShow={fade} />
        <PopModal />
      </>;
    }
    else
      navigate('/');
  };
  
}

export default App

const pagesOffline = [
  'login', 'register'
]
const pagesOnline = [
  'calendar', 'reports', 'setting', 'managers', 'services', 'opening'
]
