import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HashRouter } from "react-router-dom";
import LeftSide from "./components/LeftSide/LeftSide";
import PasswordManager from "./components/RightSide/PasswordManager/PasswordManager";
import PasswordGenerator from "./components/RightSide/PasswordGenerator/PasswordGenerator";
import PasswordForm from './components/RightSide/PasswordForm/PasswordForm';
import SiteForm from './components/RightSide/SiteForm/SiteForm';
import Authorization from './components/Authorization/Authorization';
import Registration from './components/Registration/Registration';
import Profile from './components/RightSide/Profile/Profile';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import MemoryPassword from './components/RightSide/PasswordGenerator/MemoryPassword/MemoryPassword';
import CheckPassword from './components/RightSide/CheckPassword/CheckPassword';

function App() {

  return (
      <div className="App">
        <HashRouter>
          <Routes>
              <Route path="/" element={<Authorization />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/password-manager/*" element={<><LeftSide /><PasswordManager /></>} />
              <Route path="/site-form/*" element={<><LeftSide /><SiteForm /></>} />
              <Route path="/password-generator/*" element={<><LeftSide /><PasswordGenerator /></>} />
              <Route path="/memory-passwor" element={<><LeftSide /><MemoryPassword /></>} />
              <Route path="/password-form/*" element={<><LeftSide /><PasswordForm /></>} />
              <Route path="/check-password/*" element={<><LeftSide /><CheckPassword /></>} />
              <Route path="/profile-user/*" element={<><LeftSide /><Profile /></>} />
          </Routes>
        </HashRouter>
      </div>
  );
}

export default App;