import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './Card.css';

const Card = () => {

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

    const saveEntries = async () => {
        redirectToPasswordManager();
    }


    return ( 
    <div className="card-container">
      <div className="card-group">
        <label className="form-label" htmlFor="url">URL</label>
        <input 
          className="card-control" 
          type="text" 
          id="url" 
          placeholder="Введите URL сайта" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
        />
      </div>
      <div className="card-group">
        <label className="card-label" htmlFor="site">Сайт</label>
        <input 
          className="card-control" 
          type="text" 
          id="site" 
          placeholder="Введите сайт" 
          value={site} 
          onChange={(e) => setSite(e.target.value)} 
        />
      </div>
      <div className="card-group">
        <label className="card-label" htmlFor="login">Логин</label>
        <input 
          className="card-control" 
          type="text" 
          id="login" 
          placeholder="Введите логин" 
          value={login} 
          onChange={(e) => setLogin(e.target.value)} 
        />
      </div>
      <div className="card-group">
        <label className="card-label" htmlFor="password">Пароль</label>
        <div className="card-password-input-container">
          <input 
            className="card-control card-password-control" 
            type={showPassword ? 'text' : 'password'} 
            id="password" 
            placeholder="Введите пароль" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{
              borderColor: showPassword ? 'red' : '#ccc',
              borderWidth: '1px',
              borderStyle: 'solid',
            }}
          />
          <button className="card-toggle-password" type="button" onClick={handleTogglePasswordVisibility}>
            {showPassword ? 'Скрыть' : 'Показать'}
          </button>
        </div>
      </div>
      <div className="card-button-container">
        <button className="card-cancel-button" type="button" onClick={redirectToPasswordManager}>Отмена</button>
        <button className="card-save-button" type="button" onClick={saveEntries} disabled={!url || !site || !login || !password}>Сохранить</button>
      </div>
    </div>
     );
}
 
export default Card;