import './Header.css';
import {Link} from "react-router-dom";
import React, {useState, useEffect} from 'react';

import Logo from '../Images/Logo_Route_Tracer.png';
import {CurrentTime} from "../Components/CurrentTime";

const pageName = "Route Tracer";

function Header() {
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const isTop = scrollY === 0;

            setIsAtTop(isTop);
        };

        // Add the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {

            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`app-header ${isAtTop ? 'at-top' : ''}`}>
            <div className='left-header'>
                <Link to={'/'} className={`normal-text ${isAtTop ? 'at-top' : ''}`}><img src={Logo} alt="Route Tracer" className={`image-header ${isAtTop ? 'at-top' : ''}`}/><h2>{pageName}</h2></Link>
            </div>
            <div className='right-header'>
                <CurrentTime/>
            </div>
        </header>
    );
};

export {Header};