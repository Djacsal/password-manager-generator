import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './PasswordForm.css';

const PasswordForm = () => {

  const [url, setUrl] = useState('');
  const [site, setSite] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const redirectToPasswordManager = () => {
    navigate('/password-manager'); 
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const addEntries = async () => {
    const  addEntry  = await window.electronAPI.AddEntries(site, login, password, url);
    redirectToPasswordManager();
  };
   

  return (
    <div className="form-container">
      <h2 className="form-header">Добавить новую запись</h2>
      <div className="form-group">
        <label className="form-label" htmlFor="url">URL</label>
        <input 
          className="form-control" 
          type="text" 
          id="url" 
          placeholder="Введите URL сайта" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="site">Сайт</label>
        <input 
          className="form-control" 
          type="text" 
          id="site" 
          placeholder="Введите сайт" 
          value={site} 
          onChange={(e) => setSite(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="login">Логин</label>
        <input 
          className="form-control" 
          type="text" 
          id="login" 
          placeholder="Введите логин" 
          value={login} 
          onChange={(e) => setLogin(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="password">Пароль</label>
        <div className="password-input-container">
          <input 
            className="form-control password-control" 
            type={showPassword ? 'text' : 'password'} 
            id="password" 
            placeholder="Введите пароль" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button className="toggle-password" type="button" onClick={handleTogglePasswordVisibility}>
            {showPassword ? 'Скрыть' : 'Показать'}
          </button>
        </div>
      </div>
      <div className="button-container">
        <button className="cancel-button" type="button" onClick={redirectToPasswordManager}>Отмена</button>
        <button className="submit-button" type="button" onClick={addEntries} disabled={!url || !site || !login || !password}>Добавить</button>
      </div>
    </div>
  );
}

export default PasswordForm;