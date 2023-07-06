import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { useState } from "react";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
   
  const [toggle , setToggle] = useState(1)

  function updatedToggle(id){
    setToggle(id)
  }

  return (
    <>
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
            <QueryProvider>
              <div className="tab_tog1">
                <div className="head_tog">
                  <ul>
                    <li className={toggle === 1 ?  "active_tab_blue" : "tab_black"} onClick={() => updatedToggle(1)}>Dashboard</li>
                    <li className={toggle === 2 ?  "active_tab_blue" : "tab_black"} onClick={() => updatedToggle(2)}>Analytics</li>
                    <li className={toggle === 3 ?  "active_tab_blue" : "tab_black"} onClick={() => updatedToggle(3)}>Customize cart</li>
                    <li className={toggle === 4 ?  "active_tab_blue" : "tab_black"} onClick={() => updatedToggle(4)}>Upsells</li>
                    <li className={toggle === 5 ?  "active_tab_blue" : "tab_black"} onClick={() => updatedToggle(5)}>Settings</li>
                  </ul>
                </div>
                <div className={toggle === 1 ?  "show_cont_tog" : "cont_tog"} >
                  Dashboard Dashboard
                </div>
                <div className={toggle === 2 ?  "show_cont_tog" : "cont_tog"}>
                Analytics Analytics
                </div>
                <div className={toggle === 3 ?  "show_cont_tog" : "cont_tog"}>
                cart Customize cart Customize cart
                </div>
                <div className={toggle === 4 ?  "show_cont_tog" : "cont_tog"}>
                Upsells Upsells
                </div>
                <div className={toggle === 5 ?  "show_cont_tog" : "cont_tog"}>
                Settings Settings 
                </div>    
              </div>       
              <Routes pages={pages} />
            </QueryProvider>
          </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
    </>
  );
}
/*
        <AppBridgeProvider>
          <QueryProvider>
            <Routes pages={pages} />
          </QueryProvider>
        </AppBridgeProvider>
*/