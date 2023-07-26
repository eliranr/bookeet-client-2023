import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { RecoilRoot } from "recoil";

import App from './managers/AppManagers';
import AppCostumersApp from './costumers/AppCostumers'

var sub = window.location.host.split('.');
// if (sub[1] != null) {
//   sub = sub[0];
// } else {
//   sub = null;
// }
console.log(sub);
if (sub[0] == "www") {
  sub = null;
} else {
  sub = sub[0];
}
//console.log(sub);

const root = ReactDOM.createRoot(document.getElementById('root'));
/*
<React.StrictMode>
  <App />
</React.StrictMode>


///


*/

if (sub == null) {
  root.render(
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path=":param" element={<App />} />
          <Route path=":param/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
} else {
  root.render(
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppCostumersApp sub={sub} />} />
          <Route path=":param" element={<AppCostumersApp sub={sub} />} />
          <Route path=":param/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
