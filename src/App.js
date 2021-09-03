import React,{useState,useEffect} from "react"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import {Switch,Route,useHistory,Redirect} from "react-router-dom"
import Contacts from "./components/Contacts"

function App() {
  return (
    <Switch>
        <Route exact path="/">
          <Contacts/>
        </Route>


      </Switch>


  );
}

export default App;
