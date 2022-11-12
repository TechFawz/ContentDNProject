import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from "react-router-dom";
import "./home.css";



function Home() {

    const [VideoData,SetVidioData] = useState([]); 
    useEffect(()=>{
        axios.get('http://localhost:9080/videos').then( res => {
            if(res.status==200)
            {
                SetVidioData(Object.values(res.data));
            }            
        });
    },[])

    let url = new useLocation();

    return (
        <div className='HomeContainer'>

            {VideoData.map((data)=>{return(<VidioFormate image={data.image_url} Name={data.name} id={data._id}/>)})}
            

        </div>
    )
}

function VidioFormate(data) {

    const Img = useRef();
    const vidio = useRef();
    const[video,SetVideo] = useState();
   

    const playVidio = ()=>{

        Img.current.style.display="none";
        vidio.current.style.display="block";
        vidio.current.play();
    }

  




    return (

        

        <div>
            <h2 style={{color:"rgba(254, 219, 57, 0.4)",padding:"10px"}}>{data.Name}</h2>


            <div className="MetaDataColoum" ref={Img} >
               <img src={data.image} style={{width:"350px", height:"240px"}}/>
               <FontAwesomeIcon icon={faPlay}  className="PlayButton" onClick={()=>{playVidio();}}/>
            </div>
            
            <video width="350" height="240" className="Vidios" ref={vidio} controls >
                <source src={`http://localhost:9080/xyz/${data.Name}`} type="video/mp4" />
            </video>


        </div>
    )
}

export default Home;