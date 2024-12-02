import React, { useState, useEffect } from 'react';
import {useNavigate, useLocation } from 'react-router-dom';
import './SiteForm.css';

const SiteForm = () => {
    const [url, setUrl] = useState('');
    const [site, setSite] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { item } = location.state;
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

    const redirectToPasswordManager = () => {
        navigate('/password-manager'); 
    };
    
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (item) {
            setUrl(item.url);
            setSite(item.name);
            setLogin(item.login);
            setPassword(item.password);
        }
    }, [item]);

    const saveData = async () => {
        try {
            const result = await window.electronAPI.UpdateEntries(item.id, site, login, password, url);
            setIsEditing(false);
        } catch (error) {
            console.error('Ошибка при сохранении данных:', error);
        }
    };

    const toggleEditMode = () => {
        setIsEditing(true);
    };

    const validatePassword = (value) => {
        const hasLowercase = /[a-z]/.test(value);
        const hasUppercase = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecialChar = /\W/g.test(value);
        const minLength = value.length >= 15;

        if (!(hasLowercase && hasUppercase && hasNumber && hasSpecialChar && minLength)) {
            setErrorMessage('Ненадёжный пароль');
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
        validatePassword(newValue);
    };

    const openUrl = async() => {
        const result = await window.electronAPI.openInBrowser( url);
    }

    return (
        <div className="form-container">
        <h2 className="card-form-header">{site}</h2>
        <div className="form-group">
            <label className="form-label" htmlFor="url">URL</label>
            <input 
            className={`form-control ${isEditing? '' : 'readonly'}`}
            type="text" 
            id="url" 
            placeholder="Введите URL сайта" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)}
            readOnly={!isEditing}
            />
        </div>
        <div className="form-group">
            <label className="form-label" htmlFor="site">Сайт</label>
            <input 
            className={`form-control ${isEditing? '' : 'readonly'}`}
            type="text" 
            id="site" 
            placeholder="Введите сайт" 
            value={site} 
            onChange={(e) => setSite(e.target.value)}
            readOnly={!isEditing}
            />
        </div>
        <div className="form-group">
            <label className="form-label" htmlFor="login">Логин</label>
            <input 
            className={`form-control ${isEditing? '' : 'readonly'}`} 
            type="text" 
            id="login" 
            placeholder="Введите логин" 
            value={login} 
            onChange={(e) => setLogin(e.target.value)}
            readOnly={!isEditing}
            />
        </div>
        <div className="form-group">
            <label className="form-label" htmlFor="password">Пароль</label>
            <div className="password-input-container">
            <input 
                className={`form-control password-control ${isEditing? '' : 'readonly'}`} 
                type={showPassword ? 'text' : 'password'} 
                id="password" 
                placeholder="Введите пароль" 
                value={password} 
                onChange={handleChangePassword} 
                readOnly={!isEditing}
            />
            <button className="toggle-password" type="button" onClick={handleTogglePasswordVisibility}>
                {showPassword ? 'Скрыть' : 'Показать'}
            </button>
            </div>
        </div>
        {errorMessage && <p className="card-error-message">{errorMessage}</p>}
        <div className={`card-button-container ${showError? 'card-error-password' : ''}`}>
            <button className="cancel-button" type="button" onClick={redirectToPasswordManager}>Удалить</button>
            <button className="cancel-button" type="button" onClick={openUrl}>Запустить</button>
            {!isEditing? (
                    <>
                        <button className="submit-button" type="button" onClick={toggleEditMode}>Изменить</button>
                    </>
                ) : (
                    <>
                        <button className="submit-button" type="button" onClick={saveData} disabled={!url || !site || !login ||!password}>Сохранить</button>
                    </>
            )}
        </div>
        </div>
    );
}
 
export default SiteForm;