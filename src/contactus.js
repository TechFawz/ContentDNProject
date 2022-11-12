import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';
import "./contactus.css";

function ContactUs() {

    const [value,SetValue] = useState("");

    let mail ="project.cdn.1@gmail.com";
    // let number="9660415904";
    // let linkedinId = "https://www.linkedin.com/in/sonu-singla-b33969213/";
    // let google="https://www.personalxproject.tech/";



    return (
        <div className="ContactUsContainer">
            <h2 className=" ContactUsContainerHeading">Contact Us</h2>
            <div className="ContactUsContainerContactUs">
                    
                    <FontAwesomeIcon icon={faEnvelope} className="icon" onClick={()=>{window.location = `mailto:${mail}`; SetValue(mail)}} />
                    
            </div>
            <h4 style={{color:"white"}}>{value}</h4>
        </div>
    )
}

export default ContactUs;