import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from "react-router-dom";
import "./home.css";



function Home() {

    const [VideoData, SetVidioData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:9080/videos').then(res => {
            if (res.status == 200) {
                SetVidioData(Object.values(res.data));
            }
        });
    }, [])

    let url = new useLocation();

    return (
        <div className='HomeContainer'>

            {VideoData.map((data) => { return (<VidioFormate image={data.image_url} Name={data.name} id={data._id} />) })}


        </div>
    )
}

function VidioFormate(data) {

    const Img = useRef();

    return (



        <div>
            <h2 style={{ color: "rgba(254, 219, 57, 0.4)", padding: "10px" }}>{data.Name}</h2>
            <Vidio data={data} />



        </div>
    )
}

function Vidio(d) {
    const data = d.data;
    const [value, SetValue] = useState("image");
    const [time, SetTime] = useState(0);

    if (value == "image") {
        return (<Imge_meta SetValue={SetValue} data={data} />)
    }
    else {
        return (<Video_stream SetValue={SetValue} data={data} SetTime={SetTime} time={time} />)
    }


}
function Imge_meta(d) {
    console.log("yes");
    const data = d.data;
    return (
        <div className="MetaDataColoum"  >
            <img src={data.image} style={{ width: "350px", height: "240px" }} />
            <FontAwesomeIcon icon={faPlay} className="PlayButton" onClick={() => { d.SetValue("vidio") }} />
        </div>

    )

}


function Video_stream(d) {

    console.log(d.data);
    const data = d.data;
    const vidio = useRef();
    const [server, SetServer] = useState("");

    useEffect(() => {
        

        vidio.current.onended =()=>{
            d.SetValue("image");
            d.SetTime(0)
        } 
        // vidio.current.onpause=()=>{
        //     d.SetValue("image");
        //     d.SetTime(vidio.current.currentTime)
        // } 
        axios.get('http://localhost:9080/servername').then(res => {
            SetServer(res.data.server);
            vidio.current.play();
            vidio.current.currentTime = d.time;
        },[]);
    })


    return (
        <div>
            <video width="350" height="240" className="Vidios" ref={vidio} controls >
                <source src={`http://localhost:9080/xyz/${data.Name}`} type="video/mp4" />
            </video>

            <h5 style={{color:"white" }} >Replica Server - {server}</h5>
        </div>

    )

}

export default Home;