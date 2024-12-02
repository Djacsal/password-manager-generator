import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Registration.css';

const Registration = () => {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [showErrorEmail, setShowErrorEmail] = useState(false);
    const [emailStatus, setEmailStatus] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    
    const redirectToAutorization = () => {
        navigate('/');
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async () => {
        const  addUsers  = await window.electronAPI.addUser(login, email, password);
        console.log(addUsers);
        redirectToAutorization();
        setEmailStatus('');
    };

    const checkEmailAndRegister = async () => {
        try {
          const checkResponse = await window.electronAPI.checkIfEmailExists(email);
          if (!checkResponse.error) {
            handleSubmit();
          } else {
            setEmailStatus(checkResponse.message);
            const emailErrorDiv = document.getElementById('password_block');
            if (emailErrorDiv) {
              emailErrorDiv.classList.add('error-email');
            }
          }
        } catch (error) {
            console.error(error);
        }
    };

    const validatePassword = (value) => {
        const hasLowercase = /[a-z]/.test(value);
        const hasUppercase = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecialChar = /\W/g.test(value);
        const minLength = value.length >= 15;
    
        if (!(hasLowercase && hasUppercase && hasNumber && hasSpecialChar && minLength)) {
            setErrorMessage('Пароль должен быть не менее 15 символов, содержать минимум одну строчную и заглавную букву, цифру и специальный символ');
            setShowError(true);
            return false;
        }
    
        setErrorMessage('');
        setShowError(false);
        return true;
    };

    const handleChangePassword = (event) => {
        const newValue = event.target.value;
        setPassword(newValue);
        setIsPasswordValid(validatePassword(newValue));
    };

    const handleEmailChange = (e) => {
        const emailRegex = /\S+@\S+\.\S+/;
        setEmail(e.target.value);
        if (!emailRegex.test(e.target.value)) {
            setEmailStatus('Потча не существует');
            setShowErrorEmail(true);
            return false;
        }
        setEmailStatus('');
        setShowErrorEmail(false);
        return true;
    };

    const errorStyle = {
        color: 'red',
        fontSize: '12px',
    };

    const generateRandomPassword = () => {
        let result = '';
        const digits = '0123456789';
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const specialChars = '!@#$%^&*()_-+=<>?';
        const length = 15;
    
        const characters = digits + letters + specialChars;
    
        result += digits[Math.floor(Math.random() * digits.length)];
        result += letters[Math.floor(Math.random() * letters.length)];
        result += specialChars[Math.floor(Math.random() * specialChars.length)];
    
        for (let i = 3; i < length; i++) {
            result += characters[Math.floor(Math.random() * characters.length)];
        }
    
        setPassword(result);
        setIsPasswordValid(validatePassword(result));
    };

    return (
        <div className="register-container">
            <h1 className="register-header">Регистрация</h1>
            <div className="register-group">
                <label className="register-label" htmlFor="site">Логин</label>
                <input 
                    className="register-control" 
                    type="text" 
                    id="site" 
                    placeholder="Введите логин" 
                    value={login} 
                    onChange={(e) => setLogin(e.target.value)} />
            </div>
            <div className="register-group" >
                <label className="register-label" htmlFor="login">Почта</label>
                <input 
                    className="register-control" 
                    type="text" 
                    id="login" 
                    placeholder="Введите почту" 
                    value={email} 
                    onChange={handleEmailChange}
                    style={{
                        borderColor: showErrorEmail ? 'red' : '#ccc',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                    }}
                    />
                {emailStatus && <p style={errorStyle}>{emailStatus}</p>}
            </div>
            <div className={` register-group ${showErrorEmail? 'error-email' : ''}`} id='password_block'>    
                <div className="password-title">
                    <label className="register-label" htmlFor="password">Мастер пароль</label>
                    <button className="register-generate-button" type="button" onClick={generateRandomPassword}>Сгенерировать</button>
                </div>
                <div className="register-password-input-container">
                    <input 
                        className={`register-control ${isPasswordValid? 'invalid' : ''} `}
                        type={showPassword? 'text' : 'password'} 
                        id="password" 
                        placeholder="Введите мастер пароль" 
                        value={password} 
                        onChange={handleChangePassword}
                        style={{
                            borderColor: showError ? 'red' : '#ccc',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                        }} />
                    <button className="register-toggle-password" type="button" onClick={handleTogglePasswordVisibility}>
                        {showPassword? 'Скрыть' : 'Показать'}
                    </button>
                </div>
                {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
            </div>
            <div className={`register-button-container ${showError? 'error-margin' : ''}`}>
                <button className="register-cancel-button" type="button" onClick={redirectToAutorization}>Отмена</button>
                <button className="register-submit-button" type="button" 
                onClick={checkEmailAndRegister}
                disabled={!login.trim() ||!email.trim() ||!password.trim() ||!isPasswordValid || showErrorEmail}>
                    Создать
                </button>
            </div>
        </div>
    );
};

export default Registration;