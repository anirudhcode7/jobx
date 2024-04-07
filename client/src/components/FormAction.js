import React from "react";
import { MainBlueButtonCss } from "./utils/buttons/MainBlueButton";
import {Button} from "@nextui-org/react";

export default function FormAction({
    handleClick,
    type = 'Button',
    action = 'submit',
    padding = '10px 5px',
    fontWeight = 'bold',
    fontSize = '0.85rem',
    text,
    loading=false
}) {
    return (
        <>
            {
                type === 'Button' ?
                    <Button
                        type={action}
                        className={MainBlueButtonCss}
                        style={{ width: '100%', padding: padding, fontWeight: fontWeight, margin: '0', justifyContent: 'center', fontSize: fontSize, letterSpacing: '0.8px' }}
                        onClick={handleClick}
                        isLoading={loading}
                    >
                        {text}
                    </Button>
                    :
                    <></>
            }
        </>
    )
}