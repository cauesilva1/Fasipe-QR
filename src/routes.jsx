import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/login";
import Config from "./pages/admConf";

export default function Rotas() {
   return(
       <BrowserRouter>
        <Routes>
           <Route element={ <Home /> }  path="/" exact />
           <Route element={ <Login />}  path="/login" />
           <Route element={ <Config/> }  path="/config" />
        </Routes>
       </BrowserRouter>
   )
}
