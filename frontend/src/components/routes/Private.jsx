import React from 'react'
import { Navigate, Outlet } from "react-router-dom"

function Private() {
    const isloggedin=window.localStorage.getItem("logdata");
    const usertype=window.localStorage.getItem("usertype");
  return (
    isloggedin==true?<Outlet/>:<Navigate to={"/login"}/>

    
  )
}

export default Private