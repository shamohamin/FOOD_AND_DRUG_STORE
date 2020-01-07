import React from "react";
import { Navbar } from "./Navbar";
import "../style/about.css" ;

export const About = () => {

    return <div>
        <div>
            <Navbar />
        </div>
        <div className="container-fluid mt-4 mb-4 pl-2">
            <div className="box">
                <div className="h1 p-2 text-left bg-danger">
                    About
                </div>
                <div className="p-2"> 
                    <p className="content">
                        It was founded in 2017 by a group of experts in food and drug with central office in Shiraz, Iran and branches in Kerman, Iran and Tehran, Iran.
                    </p>
                    <p>
                        It was founded in order to boost health rate in society by cooperation with high quality brands.
                    </p>
                    <p>
                        It has been working as a wholesaler for well-known brands up to now.
                    </p>
                    <img src={require('../img/PHOTO.jpg')} style={{width:'100%' , height:'70vh' , position : 'relative'}} alt="facility" />
                </div>
            </div>
        </div>
        <div className="container-fluid pl-2 mb-4">
            <div className="box">
                <div className="h1 p-2 text-left bg-danger">
                    Mission
                </div>
                <ul className="ml-2 pb-2">
                    <li>Cover Iran medical market by well-known brands and high quality products.</li>
                    <li>Marketing activity and plan to do branding the products by latest methods.</li>
                    <li>Annual business development based on Iran market demand.</li>
                    <li>Co-Production which is divided into individual segmentation basedon products and technology, which can be in packaging phase or/and sterilization or blending stage.</li>
                </ul>
            </div>
        </div>
        <div className="container-fluid pl-2 mb-4">
            <div className="box">
                <div className="h1 p-2 text-left bg-danger">
                    Vision
                </div>
                <ul className="ml-2 pb-2">
                    <li>Hoorosh Rayn Shaygan provides innovative medical, dental and pharmaceutical solutions to enhance the quality of life to continually improve healthcare.</li>
                    <li>We work hard to track the highest standards of quality in the selection of products.</li>
                    <li>The group strongly believes that customer satisfaction is the primary benchmark of success and emphasizes in rendering the best after-sales service.</li>
                </ul>
            </div>
        </div>
    </div>

}