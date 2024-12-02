import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MemoryPassword.css';

const MemoryPassword = () => {
    const navigate = useNavigate();
    const [word, setWord] = useState('');
    const [password, setPassword] = useState('');
    const MIN_PASSWORD_LENGTH = 2;
    const MAX_PASSWORD_LENGTH = 20;
    const [isCopied, setIsCopied] = useState(false);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        length: 5,
    });

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

    const handleGeneratePassword = () => {
        generatePassword();
        setIsCopied(false);
    };

    const generatePassword = () => {
        let passwordArray = [...word];
    
        const totalLength = options.length + word.length;
    
        if (totalLength > word.length) {
            const addCharsCount = totalLength - word.length;
            passwordArray.unshift(getRandomChar(options));
            passwordArray.push(getRandomChar(options));
            const internalAddCharsCount = Math.max(addCharsCount - 2, 0);
            const positions = [];
    
            for (let i = 0; i < internalAddCharsCount; i++) {
                positions.push(Math.floor(Math.random() * passwordArray.length));
            }
    
            for (let position of positions) {
                passwordArray.splice(position + 1, 0, getRandomChar(options));
            }
        }
    
        let newPassword = '';
        for (let char of passwordArray) {
            newPassword += char;
        }
        setPassword(newPassword);
        setIsCopied(false);
    };
    
    const getRandomChar = (options) => {
        const chars = [];
        if (options.uppercase) chars.push(...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
        if (options.lowercase) chars.push(...'abcdefghijklmnopqrstuvwxyz'.split(''));
        if (options.numbers) chars.push(...'0123456789'.split(''));
    
        return chars[Math.floor(Math.random() * chars.length)];
    };

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

     const redirectToTypeGeneration1 = () => {
        navigate('/password-generator'); 
    };

    return (
        <div className="memory-generator">
            <h1 className="memory-title">Генератор паролей</h1>

            <div className="type-generation">
                <button className="type-button" onClick={redirectToTypeGeneration1}>Генератор 1</button>
                <button className="type-button_activ">Генератор 2</button>
            </div>
            <div className="word-pass">
                <input 
                    className="word-control" 
                    type="text" 
                    id="site" 
                    placeholder="Введите слово" 
                    value={word} 
                    onChange={(e) => setWord(e.target.value)} />
            </div>
            <div className="memory_length">
                <div>
                <p>Добавить символов: {options.length}</p>
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
            <div className="memory-options">
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
            </div>

            <button className='create-button' onClick={handleGeneratePassword}>Сгенерировать пароль</button>

            <div className="memory-output">
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
}

export default MemoryPassword;