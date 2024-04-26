import React from 'react';
import './PasswordManager.css';
import Record from './Record/Record';
import Header from './Header/Header';

const PasswordManager = () => {

  return (
    <div className="right_side">
      <Header />
      <Record />
    </div>
    )
};

export default PasswordManager;