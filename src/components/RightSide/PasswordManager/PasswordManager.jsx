import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordManager.css';

const PasswordManager = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);

  const navigate = useNavigate();

  const redirectToPasswordManager = () => {
      navigate('/password-form'); 
  };

  const checkPasswordStrength = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#\$%\^&\*])(?=.{8,})/;
    return regex.test(password);
  }

  const check = (item) => {
    // Проверка надёжности пароля перед перенаправлением
    if (!checkPasswordStrength(item.password)) {
      navigate('/check-password', { state: { index: item.index, password: item.password } });
    }
  };
  
  const findEntries = async (searchTerm) => {
      try {
          const entries = await window.electronAPI.FindByName(searchTerm);
          return entries;
      } catch (error) {
          console.error('Error finding entries:', error);
          return [];
      }
  };

  const handleCardClick = (item) => {
      navigate('/site-form', { state: { item } }); 
  };

  useEffect(() => {
      const loadEntries = async () => {
        const entries = await window.electronAPI.GetEntries();
        if (Array.isArray(entries)) {
            setAllData(entries);
            setData(entries);
        } else {
            console.error('getEntries did not return an array:', entries);
        }
      };
    
      loadEntries();
  }, []);

  const handleSearchChange = async (e) => {
      const newSearchTerm = e.target.value;
      setSearchTerm(newSearchTerm);
      if (newSearchTerm === '') {
          setData(allData);
      } else {
          const filteredEntries = await findEntries(newSearchTerm);
          setData(filteredEntries);
      }
  };

  return (
    <div className="right_side">
      <div className="head">
            <h2 className="head_title">Пароли</h2>
            <div className="search-form">
              <input
                type="text"
                className="password-search"
                placeholder="Поиск"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <button className="add_button" onClick={redirectToPasswordManager}>Добавить</button>
        </div>
        <div className="record-container">
            {data && data.length > 0? (
                data.map((item, index) => (
                    <div key={index} className="record" onClick={() => handleCardClick(item)}>
                        <p className='name text-truncate'>{item.name}</p>
                        <p className='login text-truncate'>{item.login}</p>
                        <p className='password text-truncate'>
                          {item.password.replace(/./g, '*')}
                        </p>
                    </div>
                ))
            ) : (
                <p className='empty'>Список пуст</p>
            )}
        </div>
    </div>
    )
};

export default PasswordManager;