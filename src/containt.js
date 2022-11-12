import React   from 'react';
import NavBar from "./NavBar";
import {Outlet}  from "react-router-dom";
import  "./containt.css"


function Containt()
{
    return(
        <div className="ContaintContainer">
            <NavBar/>
            <Outlet />
            
        </div>
    )
}
export default Containt;