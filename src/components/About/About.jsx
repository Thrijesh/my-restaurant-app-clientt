import React from 'react'
import Navbar from '../Navbar/Navbar'

import './About.scss'

function About() {
    return (
        <React.Fragment>
            <Navbar />
            <div className="About">
                <h4>About</h4>
                <p>I'm <strong style={{color: 'black'}}>THRIJESH LAKSHMAN</strong> a Web Developer from India. Coding is My Passion.</p>
                <p>This is a MERN Stack App Developed by me.</p>
            </div>
        </React.Fragment>
    )
}

export default About
