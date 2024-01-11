import React from 'react'
import {Link, Button} from "@nextui-org/react";

const MainBlueButton = ({ hrefLink, text }) => {
    return (
      <Button
        // disableRipple // disble to click animation
        as={Link}
        href={hrefLink}
        // radius="md"
        variant="shadow"
        className="flex px-12 mx-3 bg-gradient-to-tr from-blue-400 from-20% via-indigo-500 via-90% to-purple-500 to-95% text-white shadow-lg
        hover:from-blue-700 hover:to-blue-700 hover:to-80% rounded-md"
      >
       <p className="font-semibold font-white text-sm">{text}</p>
      </Button>
    );
  };
  
  export default MainBlueButton;