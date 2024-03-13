import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import your AuthContext
import NavBar from '../components/core/NavBar';
import { Grid, Col, Flex, Metric, Text } from "@tremor/react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

import StartInterviewModal from '../components/home/StartInterviewModal';
import { fetchInterviewCounts } from '../api/homeApi';



const MAX_ATTEMPTS = process.env.REACT_APP_MAX_ATTEMPTS || 5;

const Home = () => {

    const navigate = useNavigate();
    const { authToken, userInfo, setToken } = useAuth(); // Get the authToken from your AuthContext
    const [remainingAttempts, setRemainingAttempts] = useState(MAX_ATTEMPTS);
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        // If there is no authToken in the context, retrieve it from localStorage
        console.log("inside use effect")
        if (!authToken) {
          const storedAuthToken = localStorage.getItem('authToken');
          if (storedAuthToken) {
            setToken(storedAuthToken);
          } else {
            navigate('/login');
            return;
          }
        }
        // Fetch questions from the backend when the component mounts
        const fetchData = async () => {
            try {
                const response = await fetchInterviewCounts(authToken);
                const interviewCount = response.data.count;
                setRemainingAttempts(MAX_ATTEMPTS - interviewCount);
                setAttempts(interviewCount);
            } catch (error) {
                console.error('Error fetching interview count:', error);
                // Handle error, e.g., show an error message to the user
            }
        };

        fetchData();

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
                                            <Metric className="font-bold text-xl text-slate-600">{userInfo ? attempts: <>-</>}</Metric>
                                        </div>
                                        <div>
                                            <Text className="text-sm font-normal text-slate-500">Attempts Left</Text>
                                            <Metric className="font-bold text-lg text-slate-600">{userInfo ? remainingAttempts: <>-</>}</Metric>
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
