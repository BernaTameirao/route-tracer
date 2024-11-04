import { Outlet } from 'react-router-dom';
import React, {useState, useEffect} from 'react';

import './LoadingPage.css';

function LoadingPage(executeFunc) {

    const [isLoading, setIsLoading] = useState(false);
    const [dynamicText, setDynamicText] = useState("Loading");

    const fetchData = async () => {

        setIsLoading(true);

        //updateDText();
        try {
            // Perform an asynchronous task (e.g., fetch data)
            // For demonstration purposes, using setTimeout to simulate delay

            await new Promise(resolve => setTimeout(resolve, 10000));
            //await new Promise(resolve => executeFunc(resolve));

            // Once the task is complete, set isLoading to false
            setIsLoading(false);

        } catch (error) {

            console.error('Error fetching data:', error);
            setIsLoading(false);
        }

    };

    /*const updateDText = () => {

        let counter=0;

        const intervalId = setInterval(() => {

            setDynamicText(prevText => {

                switch (counter) {

                    case 0:
                        counter = 1;
                        return "LoadingE";

                    case 1:
                        counter = 2;
                        return "LoadingA.";

                    case 2:
                        counter = 3;
                        return "LoadingB..";

                    case 3:
                        counter = 0;
                        return "LoadingC...";

                    default:
                        counter = 1;
                        return "LoadingD";
                }
            });

        }, 500);

        clearInterval(intervalId);
    }*/

    /*useEffect(() => {

        fetchData();
    
    }, [])*/

    return (

        <div>
            {isLoading ? (
                <div className='mainDivResults'>
                    <div className='backgroundTextResults'>
                        <p className='mainTitle'>{dynamicText}</p>
                    </div>
                </div>
            ) : (
                <>
                    <Outlet/>
                </>
            )}
        </div>
    );
}

export {LoadingPage};