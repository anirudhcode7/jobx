import React from 'react';

import NavBar from "../components/core/NavBar.js";
import backgroundImage from '../images/background2.png';
import MainBlueButton from "../components/utils/buttons/MainBlueButton.js"
import {Button} from "@nextui-org/react";
export default function LandingPage() {
  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
     // Optional: Specify the size of the background image
    backgroundPosition: 'center',
    backgroundSize: '40%',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(15px)' // Optional: Specify the position of the background image
    // You can add more background properties as needed
  };

  return (
    <>  
        <NavBar />
        <div style={divStyle}>
          
          <div style={{height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',  alignItems: 'center',}}> 
          <h1 className="text-4xl font-bold text-gray-700 text-center mx-auto w-50 mb-8">
                Ready to take the next step in your <br></br>career? Look no further — <span className="text-blue-500">JOBX</span> is here!
          </h1> 
          <div style={{ display: 'flex', flexDirection: 'row'}}>
            <MainBlueButton hrefLink="/" text="Get Started" />
            <Button variant="bordered" color="primary" className="px-11 rounded border-blue-500 text-sm font-semibold text-blue-500 border">Hire Talents</Button>
          </div>
        </div>
        </div>

    </>
  )
}
