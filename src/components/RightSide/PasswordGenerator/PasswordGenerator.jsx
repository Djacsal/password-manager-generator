import React, { useState } from 'react';
import './PasswordGenerator.css';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    length: 12,
  });

  const MIN_PASSWORD_LENGTH = 4;
  const MAX_PASSWORD_LENGTH = 30;

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

    if (options.length < MIN_PASSWORD_LENGTH) {
      setOptions((prevOptions) => ({
        ...prevOptions,
        length: MIN_PASSWORD_LENGTH,
      }));
    }

    const selectedOptions = Object.keys(options)
      .filter((key) => key !== 'length' && options[key]);

    if (selectedOptions.length === 0) {
      setPassword('');
      return;
    }

    let newPassword = '';
    const baseLength = Math.max(Math.floor(options.length / selectedOptions.length), 1);

    selectedOptions.forEach((optionKey) => {
      const currentCharset = charset[optionKey];
      for (let i = 0; i < baseLength; i++) {
        const randomIndex = Math.floor(Math.random() * currentCharset.length);
        newPassword += currentCharset[randomIndex];
      }
    });

    const remainingLength = options.length - newPassword.length;

    for (let i = 0; i < remainingLength; i++) {
      const randomOption = selectedOptions[Math.floor(Math.random() * selectedOptions.length)];
      const randomIndex = Math.floor(Math.random() * charset[randomOption].length);
      newPassword += charset[randomOption][randomIndex];
    }

    newPassword = newPassword.split('').sort(() => Math.random() - 0.5).join('');

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

 return (
    <div className="password-generator">
      <h1 className="password_title">Генератор паролей</h1>
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

      <button onClick={handleGeneratePassword}>Сгенерировать пароль</button>

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