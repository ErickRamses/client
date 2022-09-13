import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import Login from "./Login"
import Register from "./Register"
import "bootstrap/dist/css/bootstrap.min.css"
import { BudgetsProvider } from "./contexts/BudgetsContext"
import {
  BrowserRouter,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
//react router+ routes+  page=jsx+=convert+=css+=deb++ login{post{knowhow+,doit+}+,redirect+,redirect app+}+  register{jsx+,put+,redirecttolog+,frontend+,fronyend log+,regist+}+ cokie{kwon+,server know+,anki gus+,do some backend{think+,cokie,login, update},disconect,conect,} connect         
//when login and register manda la cookie hashpassword then when update veryfy if cokie othrt wise error so
//1 send cokie log and reg {just write } as hash and name then fix update as compare then 
//front end
ReactDOM.render(
  <React.StrictMode>
    <BudgetsProvider>
      <HashRouter>
        <Routes>
        
          <Route path="/" element={<Login/>}> </Route>
          <Route path="/register" element={<Register/>}> </Route>
          <Route path="/todo" element={<App />}> </Route>
      
        </Routes>
      </HashRouter>
    </BudgetsProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
