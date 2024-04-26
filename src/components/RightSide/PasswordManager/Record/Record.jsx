import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import "./Record.css";

const Record = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const loadedData = await window.electronAPI.readEncryptedPasswords();
                const decryptedData = await Promise.all(loadedData.map(async (item) => {
                    if (item.encryptedPassword && item.encryptedPassword.data) {
                        const buffer = Buffer.from(item.encryptedPassword.data);
                        const decryptedPassword = await window.electronAPI.decryptedPassword(buffer);
                        return { ...item, decryptedPassword };
                    }
                    return item;
                }));
                setData(decryptedData);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };

        loadData();
    }, []);

    const navigate = useNavigate();
    const handleCardClick = (item) => {
        navigate('/site-form'); 
        console.log('Клик по карточке:', item);
    };

    return (
        <div className="record-container">
            {data.length > 0 ? (
                data.map((item, index) => (
                    <div key={index} className="record" onClick={() => handleCardClick(item)}>
                        <p className='site'>{item.site}</p>
                        <p className='login'>{item.login}</p>
                        <p className='password'>{item.decryptedPassword ? '*'.repeat(item.decryptedPassword.length) : ''}</p>
                    </div>
                ))
            ) : (
                <p className='empty'>Список пуст</p>
            )}
        </div>
    );
};

export default Record;