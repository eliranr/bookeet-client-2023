import {atom, selector} from 'recoil';
import lang from '../lang';

///// DB
export const managerState = atom({
    key: 'managerState',
    default: null,
});
export const storeState = atom({
    key: 'storeState',
    default: null,
});
export const workersState = atom({
    key: 'workersState',
    default: [],
});
export const currenManagerState = atom({
    key: 'currenManagerState',
    default: null,
});

export const currentime = atom({
    key: 'currentime',
    default: 0,
});



///// POSITION

export const menuState = atom({
    key: 'menuState',
    default: true,
});
export const menuMobileState = atom({
    key: 'menuMobileState',
    default: false,
});

export const mobileState = atom({
    key: 'mobileState',
    default: false,
});

export const dropState = atom({
    key: 'dropState',
    default: false,
});

export const headState = atom({
    key: 'headState',
    default: [],
});

export const popState = atom({
    key: 'popState',
    default: false,
});
export const popHtml = atom({
    key: 'popHtml',
    default: null,
});

export const regState = atom({
    key: 'regState',
    default: 0,
});

export const refreshState = atom({
    key: 'refreshState',
    default: 0,
});

export const loadingState = atom({
    key: 'loadingState',
    default: false,
});

export const bubState = atom({
    key: 'bubState',
    default: {
        bol: false,
        text: ''
    },
});


////// WORDS
export const langState = atom({
    key: 'langState',
    default: 'heb',
});
export const wordstState = selector({
    key: 'wordstState', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const theLang = get(langState);
      return lang(theLang);
    },
  });
////