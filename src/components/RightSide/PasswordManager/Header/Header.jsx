import React from 'react';
import {useNavigate} from 'react-router-dom';
import './Header.css';

const Header = () => {

    const navigate = useNavigate();
    const redirectToPasswordManager = () => {
        navigate('/password-form'); 
    };

    return (
        <div className="head">
            <h2 className="head_title">Пароли</h2>
            <div className="search-form">
              <input
                type="text"
                className="password-search"
                placeholder="Поиск паролей"
              />
            </div>
            <button className="add_button" onClick={redirectToPasswordManager}>Добавить</button>
        </div>
    )
}

export default Header;