import {atom, selector} from 'recoil';

/////

export const storeState0 = atom({
    key: 'storeState0',
    default: null,
});

export const workersState0 = atom({
    key: 'workersState0',
    default: [],
});

export const langState0 = atom({
    key: 'langState0',
    default: 'heb',
});

export const clientState0 = atom({
    key: 'clientState0',
    default: null,
});

export const choosentor = atom({
    key: 'choosentor',
    default: null,
});
export const choosenworker = atom({
    key: 'choosenworker',
    default: null,
});
export const choosenemp = atom({
    key: 'choosenemp',
    default: null,
});
export const weekstart = atom({
    key: 'weekstart',
    default: 0,
});
export const choosenday = atom({
    key: 'choosenday',
    default: 0,
});

export const currentime0 = atom({
    key: 'currentime0',
    default: 0,
});

export const existtors = atom({
    key: 'existtors',
    default: [],
});

export const refreshState0 = atom({
    key: 'refreshState0',
    default: 0,
});

export const finshOrder0 = atom({
    key: 'finshOrder0',
    default: false,
});