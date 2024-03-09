import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import your AuthContext
import NavBar from '../components/core/NavBar';
import { Grid, Col, Flex, Metric, Text } from "@tremor/react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

import StartInterviewModal from '../components/home/StartInterviewModal';

require("dotenv").config();
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3004';


const MAX_ATTEMPTS = process.env.REACT_APP_MAX_ATTEMPTS || 5;

const Home = () => {

    const navigate = useNavigate();
    const { authToken } = useAuth(); // Get the authToken from your AuthContext
    const [remainingAttempts, setRemainingAttempts] = useState(MAX_ATTEMPTS);
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        // Fetch the current count of interviews for the user
        axios.get(`${BACKEND_URL}/api/interview/count`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then(response => {
                // Assuming the response contains the count of interviews
                const interviewCount = response.data.count;
                setRemainingAttempts(MAX_ATTEMPTS - interviewCount);
                setAttempts(interviewCount);
            })
            .catch(error => {
                console.error('Error fetching interview count:', error);
            });
    }, [authToken]);

    const handleClick = (e) => {
        e.preventDefault();

        // Check if the user has remaining attempts
        if (remainingAttempts <= 0) {
            alert("You have reached the maximum number of interview attempts.");
            return;
        }

        console.log('Interview Started');
        navigate('/interview');
    };

    return (
        <>
            <NavBar />
            <div className="container mx-auto h-70vh flex flex-col justify-center p-10" style={{ height: "60%" }}>
                <Grid numItems={2} numItemsSm={2} numItemsLg={3} className="flex gap-4 justify-start">
                    <Col numColSpan={2} numColSpanLg={3} className="w-80">
                        <Card className="shadow-2xl border-1 border-slate-100 bg-slate-50">
                            <CardHeader className="px-4 pt-7 items-start font-bold text-xl text-gray-600">
                                <h4 className="font-bold text-medium text-slate-600">Let's Practice Interview</h4>
                            </CardHeader>
                            <CardBody>
                                <Card className="mx-auto mb-3 w-full shadow-none border-1 border-slate-100 ">
                                    <Flex className="gap-4 p-5 py-3 w-full">
                                        <div>
                                            <Text className="text-sm font-normal text-slate-500">Attempted</Text>
                                            <Metric className="font-bold text-xl text-slate-600">{attempts}</Metric>
                                        </div>
                                        <div>
                                            <Text className="text-sm font-normal text-slate-500">Attempts Left</Text>
                                            <Metric className="font-bold text-lg text-slate-600">{remainingAttempts}</Metric>
                                        </div>
                                    </Flex>
                                </Card>
                                <StartInterviewModal handleClick={handleClick} />

                            </CardBody>
                        </Card>
                    </Col>
                </Grid>
            </div>


        </>
    );
};

export default Home;
