import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './LeftSide.css';
import logo from '../../logo4.png';
import { FaKey } from "react-icons/fa6";
import { GiPowerGenerator } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { GiExitDoor } from "react-icons/gi";
import { AiOutlineSafetyCertificate } from "react-icons/ai";


const LeftSide = () =>{
    return (
        <div className="left_side">
          
          <div className="my_blok">
            <img src={logo} alt="" />
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
              <AiOutlineSafetyCertificate className="react_icon"/>
              <Link to="/check-password" className="option-button">
                Уязвимости
              </Link>
            </div>
            
            <div className="option">
              <IoMdSettings className="react_icon"/>
              <Link to="/profile-user" className="option-button">
                Профиль
              </Link>
            </div>
          </div>
          <div className="exit">
            <GiExitDoor className="react_icon"/>
            <Link to="/" className="option-button">
                Выход
            </Link>
          </div>
        </div>

)};

export default LeftSide;