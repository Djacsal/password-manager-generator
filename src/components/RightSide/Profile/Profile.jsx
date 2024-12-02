import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);
    const [emailStatus, setEmailStatus] = useState('');
    const [showErrorEmail, setShowErrorEmail] = useState(false);
    const navigate = useNavigate();

    const redirectToHome = () => {
        navigate('/'); 
    };
    

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const fetchData = async () => {
            const userDataArray = await window.electronAPI.GetUserData();
            if (userDataArray && userDataArray.length > 0) {
                const userData = userDataArray[0];
                setLogin(userData.login);
                setEmail(userData.email);
                setPassword(userData.password);
            }
        };
        fetchData();
    }, []);

    const toggleEditMode = () => {
        setIsEditing(true);
    };

    const saveProfileData = async () => {
        try {
            const result = await window.electronAPI.UpdateUser(login, email, password);
            setIsEditing(false);
        } catch (error) {
            console.error('Ошибка при сохранении данных:', error);
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
            setEmailStatus('Почта не существует');
            setShowErrorEmail(true);
        } else {
            setEmailStatus('');
            setShowErrorEmail(false);
        }
    };
    
    return (
        <div className="profile-container">
            <h1 className="profile-title">Профиль</h1>
            <div className="profile-group">
                <label className="profile-label" htmlFor="url">Логин</label>
                <input 
                className={`profile-control ${isEditing? '' : 'readonly'}`} 
                type="text" 
                id="url" 
                placeholder="Введите логин" 
                value={login} 
                onChange={(e) => setLogin(e.target.value)} 
                readOnly={!isEditing}
                />
            </div>
            <div className="profile-group">
                <label className="profile-label" htmlFor="url">Почта</label>
                <input 
                className={`profile-control ${isEditing? '' : 'readonly'}`} 
                type="text" 
                id="url" 
                placeholder="Введите адрес электронной почты" 
                value={email} 
                onChange={handleEmailChange}
                readOnly={!isEditing}
                style={{
                    borderColor: isEditing ? 'red' : '#ccc',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                  }}
                />
                {emailStatus && <p className="profile-error-message">{emailStatus}</p>}
            </div>
            <div className={`profile-group ${showErrorEmail? 'profile-error-email' : ''}`}>
                <label className="profile-label" htmlFor="password">Пароль</label>
                <div className="profile-password-input-container">
                    <input 
                        className={`profile-control profile-password-control ${isEditing? '' : 'readonly'}`} 
                        type={showPassword? 'text' : 'password'} 
                        id="password" 
                        placeholder="Введите пароль" 
                        value={password} 
                        onChange={handleChangePassword} 
                        readOnly={!isEditing}
                    />
                    <button className="profile-toggle-password" type="button" onClick={handleTogglePasswordVisibility}>
                        {showPassword? 'Скрыть' : 'Показать'}
                    </button>
                </div>
                {errorMessage && <p className="profile-error-message">{errorMessage}</p>}
            </div>
            <div className={`profile-button-container ${showError? 'profile-error-password' : ''}`}>
                {!isEditing? (
                    <>
                        <button className="profile-save-button" type="button" onClick={toggleEditMode}>Изменить</button>
                    </>
                ) : (
                    <>
                        <button className="profile-save-button" type="button" onClick={saveProfileData} disabled={!login ||!email ||!password |!isPasswordValid || showErrorEmail}>Сохранить</button>
                    </>
                )}
            </div>
        </div>
     );
}
 
export default Profile;



