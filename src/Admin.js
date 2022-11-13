import React, { useEffect, useState }   from 'react';
import NavBar from "./NavBar";
import {Outlet}  from "react-router-dom";
import "./Admin.css";
import axios from "axios";


function AdminPage()
{
    return(
        <div className="ContaintContainer">
            <NavBar/>
            <Outlet />

        </div>

    )
}

function AdminPageHome()
{
    const [data , SetData] =  useState([]);

    useEffect(()=>{
        axios.get('http://localhost:9080/userdetails',{params: {},headers: { "authorization": localStorage.getItem("token") }}).then( res => {
        console.log(res.data);
       SetData(res.data);
    });
    },[])
    
    return(
        <div className="ContaintContainer">
        <table>
            <tr>
                <th>Name</th>
                <th>User Id</th>
                <th>Password</th>
            </tr>

            {data.map((d)=>{
                return(
                    <tr>
                        <td>{d.name}</td>
                        <td>{d.LoginId}</td>
                        <td>{d.password}</td>

                    </tr>
                )
            })}
        </table>
        </div>

    )
}
export  {AdminPageHome,AdminPage};