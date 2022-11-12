import React from 'react';
import "./aboutus.css";

function AboutUs()
{
    return(
        <div className="AboutUsContainer">
            <h2 className="AboutUsContainerHeading">About Us</h2>
            
            <div className="AboutUsContainerAboutUs">
                <span className="AboutUsContainerAboutUsSpan">An interactive website that shows the real-time working of a Cloud Delivery Network (CDN)</span>
                <h2> Project Owners</h2>
                <h4>Harsha Vardhan Sairam Kurapati,
                    Venkata Ramana rao Nagulapati,
                    Sravya Reddy Mummadi,  
                    Sai Kumar Reddy Mummadi, 
                    Sada Siva Sasidhar Gampa
                    </h4>
            </div>
        </div>
    )
}

export default AboutUs;