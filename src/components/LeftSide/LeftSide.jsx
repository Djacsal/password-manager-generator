import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './LeftSide.css';
import Logo from '../../1Password-logo.png';

import { FaKey } from "react-icons/fa6";
import { GiPowerGenerator } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { GiExitDoor } from "react-icons/gi";


const LeftSide = () =>{
    return (
        <div className="left_side">
          
          <div className="my_blok">
            <img src={Logo} alt="" />
          </div>
          <div className="options">
            <div className="option">
              <FaKey className="react_icon"/>
              <Link to="/password-manager" className="option-button">
                Пароли
              </Link>
            </div>

            <div className="option">
              <GiPowerGenerator className="react_icon"/>
              <Link to="/password-generator" className="option-button">
                Генератор
              </Link>
            </div>
            
            <div className="option">
              <IoMdSettings className="react_icon"/>
              <Link to="/password-form" className="option-button">
                Настройки
              </Link>
            </div>
          </div>
          <div className="exit">
            <GiExitDoor className="react_icon"/>
            <button className="exit-button">Выход</button>
          </div>
        </div>

)};

export default LeftSide;