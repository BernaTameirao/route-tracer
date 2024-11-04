import './ResultPage.css';
import React, {useState} from 'react';

import image from "../Images/Map3.jpg";

function ResultPage() {

    const resultsArray = [];

    return (

        <div className='mainDivResults'>
            <img src={image} className='background'/>
            <div className='backgroundTextResults'>
                <p className='mainTitle'>Your route should be:</p>
                <ul>
                    {		
                        resultsArray.map((address, index) => {

                             return (
                                <li key={index}>
                                    <p className='normalText'>{address}</p>
                                </li>
                            )

                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export {ResultPage};