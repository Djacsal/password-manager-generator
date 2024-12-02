import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const navigate = useNavigate();

    const redirectToAuthorization = () => {
        navigate('/');
    };

    return ( 
        <div className="login-window">
            <h1>Забыл пароль</h1>
            <form action="#">
                <div className="email-input">
                    <label className="forgot-password-label" htmlFor="site">Почта</label>
                    <input 
                        type="email" 
                        placeholder="Почта"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            borderColor: errorEmail ? 'red' : '#ccc',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                        }}
                    />
                    {errorEmail && <p style={{ color: 'red', fontSize: '13px', paddingLeft: '50px' }}>{errorEmail}</p>}
                </div>
                <p className="forgot-password-text">На вашу почту придет сообщение с новым паролем</p>
                <div className={`forgot-password-button ${errorEmail ? 'error-top' : ''}`}>
                    <button className={`back-button`} type="button" onClick={redirectToAuthorization}>Отмена</button>
                    <button className={`help-button`} type="button" onClick={redirectToAuthorization}>Отправить</button>
                </div>
            </form>
        </div>
     );
}
 
export default ForgotPassword;