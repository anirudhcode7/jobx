import React from 'react'

import { Button } from "@nextui-org/react";
import MainBlueButton from '../utils/buttons/MainBlueButton';
import backgroundImage from '../../images/background2.png';

export default function MainSection() {

    return (
        <>
            <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'calc(35% + 12rem)', backgroundPosition: 'center', height: '80vh' }} className="relative flex w-full h-70vh bg-cover bg-center bg-no-repeat overflow-hidden justify-center items-center">
                <div class="h-70vh flex flex-col justify-center items-center">
                <h1 class="text-xl lg:text-4xl 2xl:text-6xl font-bold text-gray-600 text-center mx-auto w-11/12 lg:w-2/3 mb-4 lg:mb-8 mt-3 lg:mt-0">
                    Ready to level up in your career journey? <br class="lg:hidden"/> Look no further,
                    <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-t from-blue-500 to-indigo-600">
                        &nbsp; JOBX
                    </span>
                    &nbsp; is here!
                </h1>
                    <div className="flex flex-row">
                        <MainBlueButton hrefLink="/login" text="Get Started" />
                        <Button variant="bordered" color="primary" className="hidden md:block px-11 rounded border-blue-500 text-sm font-semibold text-blue-600 border">View Jobs</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
