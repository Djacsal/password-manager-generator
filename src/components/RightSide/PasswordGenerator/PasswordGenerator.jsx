import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordGenerator.css';

const PasswordGenerator = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    length: 12,
  });

  const MIN_PASSWORD_LENGTH = 4;
  const MAX_PASSWORD_LENGTH = 35;

  const handleChange = (e) => {
    const { name, checked, value } = e.target;
    if (name === 'length') {
      setOptions((prevOptions) => ({
        ...prevOptions,
        [name]: parseInt(value, 10),
      }));
    } else {
      setOptions((prevOptions) => ({
        ...prevOptions,
        [name]: checked,
      }));
    }
  };

  const generatePassword = () => {
    const charset = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_-+=<>?',
    };
  
    let newPassword = '';
    const selectedOptions = Object.keys(options)
    .filter((key) => key!== 'length' && options[key]);
    const typesCount = selectedOptions.length;
    const charsPerType = Math.ceil(options.length / typesCount);
  
    selectedOptions.forEach((optionKey) => {
      const currentCharset = charset[optionKey];
      for (let j = 0; j < charsPerType; j++) { 
        const randomIndex = Math.floor(Math.random() * currentCharset.length);
        newPassword += currentCharset[randomIndex];
      }
    });
    const requiredLength = options.length;
    while (newPassword.length < requiredLength) {
      const randomOption = selectedOptions[Math.floor(Math.random() * selectedOptions.length)];
      const randomIndex = Math.floor(Math.random() * charset[randomOption].length);
      newPassword += charset[randomOption][randomIndex];
    }
    newPassword = newPassword.split('').sort(() => Math.random() - 0.5).join('');
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setPassword('');
      return;
    }
    setPassword(newPassword);
  };

 const [isCopied, setIsCopied] = useState(false);

 const copyToClipboard = () => {
    if (!password) return;

    const textarea = document.createElement('textarea');
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    setIsCopied(true);
 };

 const handleGeneratePassword = () => {
    generatePassword();
    setIsCopied(false);
 };

const redirectToTypeGeneration2 = () => {
  navigate('/memory-passwor'); 
};

 return (
    <div className="password-generator">
      <h1 className="password_title">Генератор паролей</h1>
      <div className="type-generation">
        <button className="type-button_activ">Генератор 1</button>
        <button className="type-button" onClick={redirectToTypeGeneration2}>Генератор 2</button>
      </div>
      <div className="options">
        <label>
          <input
            type="checkbox"
            name="uppercase"
            checked={options.uppercase}
            onChange={handleChange}
          />
          Заглавные буквы
        </label>
        <label>
          <input
            type="checkbox"
            name="lowercase"
            checked={options.lowercase}
            onChange={handleChange}
          />
          Строчные буквы
        </label>
        <label>
          <input
            type="checkbox"
            name="numbers"
            checked={options.numbers}
            onChange={handleChange}
          />
          Числа
        </label>
        <label>
          <input
            type="checkbox"
            name="symbols"
            checked={options.symbols}
            onChange={handleChange}
          />
          Символы
        </label>
      </div>

      <div className="password_length">
        <div>
          <p>Длина: {options.length}</p>
          <input
            type="range"
            name="length"
            value={options.length}
            onChange={handleChange}
            min={MIN_PASSWORD_LENGTH}
            max={MAX_PASSWORD_LENGTH}
            step={1}
          />
        </div>
      </div>
      
      <button className='create-button' onClick={handleGeneratePassword}>Сгенерировать пароль</button>

      <div className="password-output">
        <p>{password}</p>
        {password && (
          <button
            onClick={copyToClipboard}
            title="Copy to clipboard"
            className={isCopied ? 'copied' : 'copy'}
          >
            {isCopied ? 'Скопировано' : 'Копировать'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PasswordGenerator;