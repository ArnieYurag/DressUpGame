import React from 'react';
import Lace from '../assets/Lace.png';
import '../styles/Background.css';

const Background = ({ children }) => {
    return (
      <div className="background-container">
        <img src={Lace} alt="Lace Background" className="lace-image" />
        
        <div className="content-container">
            {children}
        </div>
      </div>
    );
  };
  
  export default Background;
