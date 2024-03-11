import React from 'react'
import { Link, Button } from "@nextui-org/react";

export const MainBlueButtonCss = "flex px-12 mx-3 bg-gradient-to-tr from-blue-500 from-15% via-indigo-500 via-70% to-indigo-500 to-90% text-white shadow-lg hover:from-blue-700 hover:to-blue-700 hover:to-80% rounded-md";

const MainBlueButton = ({ hrefLink, text }) => {
  return (
    <Button
      // disableRipple // disble to click animation
      as={Link}
      href={hrefLink}
      // radius="md"
      variant="shadow"
      className={MainBlueButtonCss}
    >
      <p className="font-semibold font-white text-sm">{text}</p>
    </Button>
  );
};

export default MainBlueButton;