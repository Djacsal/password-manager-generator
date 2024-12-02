import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Authorization.css"

const Authorization = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [formError, setFormError] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const navigate = useNavigate();

    const redirectToAccount = async () => {

        setFormError('');
        setErrorPassword('');
        setPasswordError(false);
        setErrorEmail('')
        setLoginError(false);

        if (login.trim() === '') {
            setErrorEmail('Поле ввода не заполнено'); 
            setLoginError(true);
            return;
        }

        if (password.trim() === '') {
            setErrorPassword('Поле ввода не заполнено');
            setPasswordError(true);
            return;
        }
    
        try {
            const authenticate = await window.electronAPI.AuthenticateUser(login, password);
            navigate('/password-manager');
        } catch (error) {
            const errorMessage = error.message.split(':').pop().trim();
            if (errorMessage === "Пользователь не найден") {
                setLoginError(true);
                setFormError(errorMessage);
            } else if (errorMessage === 'Неверный пароль') {
                setPasswordError(true);
                setFormError(errorMessage);
            }
        }
    };
    
    const redirectToRegistration = () => {
        navigate('/registration');
    };

    const redirectToForgotPassword = () => {
        navigate('/forgot-password');
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-window">
            <h1>Вход в аккаунт</h1>
            <form action="#">
                <div className="email-input">
                    <label className="autorization-label" htmlFor="site">Почта</label>
                    <input 
                        type="email" 
                        placeholder="Почта"
                        value={login} 
                        onChange={(e) => setLogin(e.target.value)}
                        style={{
                            borderColor: loginError ? 'red' : '#ccc',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                        }}
                    />
                    {errorEmail && <p style={{ color: 'red', fontSize: '13px', paddingLeft: '50px' }}>{errorEmail}</p>}
                    {loginError && <p className="error-message">{formError}</p>}
                </div>

                <div className={`password-input ${loginError ? 'error-top' : ''}`}>
                    <div className="password-input_con">
                        <label className="autorization-label" htmlFor="pass">Мастер пароль</label>
                        <input 
                            className="form-control-input" 
                            type={showPassword ? 'text' : 'password'}  
                            placeholder="Мастер пароль"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                borderColor: passwordError ? 'red' : '#ccc',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                            }}
                        />
                        {errorPassword && <p style={{ color: 'red', fontSize: '13px', paddingLeft: '50px' }}>{errorPassword}</p>}
                        {passwordError && <p className="error-message password-error">{formError}</p>}
                        <button className="button-password" type="button" onClick={handleTogglePasswordVisibility}>
                            {showPassword ? 'Скрыть' : 'Показать'}
                        </button>
                    </div>
                </div>
                <div className={`${passwordError ? 'error-top' : ''}`}>
                    <button className={`autorization-button`} type="button" onClick={redirectToAccount}>Вход</button>
                    <div className="regisret-help-button">
                        <button className="to-help-button" type="button" onClick={redirectToForgotPassword}>Забыл пароль</button>
                        <p className ="indent"> / </p>
                        <button className="to-registration-button" type="button" onClick={redirectToRegistration}>Регистрация</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Authorization;