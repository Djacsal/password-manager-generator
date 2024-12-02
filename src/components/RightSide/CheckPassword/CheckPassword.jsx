import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './CheckPassword.css';

const CheckPassword = () => {
    const location = useLocation();
    const [passwordIndex, setPasswordIndex] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleEditMode = () => {
        setIsEditing(true);
    };

    const saveProfileData = async () => {
        setIsEditing(false);
    }
  
    useEffect(() => {
        if (location.state) {
        setPasswordIndex(location.state.index);
        setPassword(location.state.password);
        }
    }, [location.state]);

    return (
        <div className="check-container">
            <h2 className="check_title">Список небезопасных паролей</h2>
            <div className="group">
                <div className="check-group">
                    <label className="check-label" htmlFor="site">sa</label>
                    <input 
                        className={`form-control `}
                        type={showPassword ? 'text' : 'password'} 
                        id="site" 
                        placeholder="Введите сайт" 
                        value='sa' 
                        onChange={(e) => setSite(e.target.value)}
                    />
                    <button className="check-password" type="button" onClick={handleTogglePasswordVisibility}>
                        {showPassword ? 'Скрыть' : 'Показать'}
                    </button>
                </div>
                <div className="check-group">
                    <label className="check-label" htmlFor="site">a</label>
                    <input 
                        className={`form-control`}
                        type={showPassword ? 'text' : 'password'} 
                        id="site" 
                        placeholder="Введите сайт" 
                        value='a'
                        onChange={(e) => setSite(e.target.value)}
                    />
                    <button className="check-password" type="button" onClick={handleTogglePasswordVisibility}>
                        {showPassword ? 'Скрыть' : 'Показать'}
                    </button>
                </div>
                <div className="check-group">
                    <label className="check-label" htmlFor="site">выф</label>
                    <input 
                        className={`form-control `}
                        type={showPassword ? 'text' : 'password'} 
                        id="site" 
                        placeholder="Введите сайт" 
                        value='ффф' 
                        onChange={(e) => setSite(e.target.value)}
                    />
                    <button className="check-password" type="button" onClick={handleTogglePasswordVisibility}>
                        {showPassword ? 'Скрыть' : 'Показать'}
                    </button>
                </div>
                <div className="check-group">
                    <label className="check-label" htmlFor="site">вы</label>
                    <input 
                        className={`form-control`}
                        type={showPassword ? 'text' : 'password'} 
                        id="site" 
                        placeholder="Введите сайт" 
                        value='ы'
                        onChange={(e) => setSite(e.target.value)}
                    />
                    <button className="check-password" type="button" onClick={handleTogglePasswordVisibility}>
                        {showPassword ? 'Скрыть' : 'Показать'}
                    </button>
                </div>
                <div className="check-group">
                    <label className="check-label" htmlFor="site">ыы</label>
                    <input 
                        className={`form-control`}
                        type={showPassword ? 'text' : 'password'}
                        id="site" 
                        placeholder="Введите сайт" 
                        value='ыы'
                        onChange={(e) => setSite(e.target.value)}
                    />
                    <button className="check-password" type="button" onClick={handleTogglePasswordVisibility}>
                        {showPassword ? 'Скрыть' : 'Показать'}
                    </button>
                </div>
                <div className="check-group">
                    <label className="check-label" htmlFor="site">выф</label>
                    <input 
                        className={`form-control `}
                        type={showPassword ? 'text' : 'password'} 
                        id="site" 
                        placeholder="Введите сайт" 
                        value='ыфв' 
                        onChange={(e) => setSite(e.target.value)}
                    />
                    <button className="check-password" type="button" onClick={handleTogglePasswordVisibility}>
                        {showPassword ? 'Скрыть' : 'Показать'}
                    </button>
                </div>
                <div className="check-group">
                    <label className="check-label" htmlFor="site">счя</label>
                    <input 
                        className={`form-control`}
                        type={showPassword ? 'text' : 'password'} 
                        id="site" 
                        placeholder="Введите сайт" 
                        value='чя'
                        onChange={(e) => setSite(e.target.value)}
                    />
                    <button className="check-password" type="button" onClick={handleTogglePasswordVisibility}>
                        {showPassword ? 'Скрыть' : 'Показать'}
                    </button>
                </div>
            </div>
            <div className={`check-button-container`}>
                    {!isEditing? (
                        <>
                            <button className="check-save-button" type="button" onClick={toggleEditMode}>Изменить</button>
                        </>
                    ) : (
                        <>
                            <button className="check-save-button" type="button" onClick={saveProfileData}>Сохранить</button>
                        </>
                    )}
                </div>
        </div>
    );
};

export default CheckPassword;