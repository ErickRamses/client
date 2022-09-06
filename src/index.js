import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import Login from "./Login"
import "bootstrap/dist/css/bootstrap.min.css"
import { BudgetsProvider } from "./contexts/BudgetsContext"
import {
  BrowserRouter,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
//react router+ routes+  page=jsx+=convert+=css+=deb++ login{post,redirect,redirect app}  register cokie connect
ReactDOM.render(
  <React.StrictMode>
    <BudgetsProvider>
      <HashRouter>
        <Routes>
        
          <Route path="/" element={<Login/>}> </Route>
          <Route path="/todo" element={<App />}> </Route>
      
        </Routes>
      </HashRouter>
    </BudgetsProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
