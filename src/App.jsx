import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HashRouter } from "react-router-dom";
import LeftSide from "./components/LeftSide/LeftSide";
import PasswordManager from "./components/RightSide/PasswordManager/PasswordManager";
import PasswordGenerator from "./components/RightSide/PasswordGenerator/PasswordGenerator";
import PasswordForm from './components/RightSide/PasswordForm/PasswordForm';
import SiteForm from './components/RightSide/SiteForm/SiteForm';

function App() {

  /*const saveToStorage = () => {
    if (safeStorage.isEncryptionAvailable()) {
      const encryptedPassword = safeStorage.encryptString("password");
      console.log("Сохраняем данные:", encryptedPassword);
      return encryptedPassword;
    } else {
      console.error("Шифрование недоступно");
    }
  };
  
  ipcMain.handle("save-to-storage", async () => {
    // Здесь вызывается ваша функция saveToStorage
    const encryptedPassword = saveToStorage();
    return encryptedPassword;
  });*/

  return (
      <div className="App">
        <div className="container">
          <HashRouter>
            <LeftSide />
            <Routes>
              <Route path="/password-manager" element={<PasswordManager />} />
              <Route path="/password-generator" element={<PasswordGenerator />} />
              <Route path="/password-form" element={<PasswordForm />} />
              <Route path="/site-form" element={<SiteForm />} />
            </Routes>
          </HashRouter>
        </div>
      </div>
  );
}

export default App;


/*function App() {
  return (
    <div className="App">
      <div className="container">
        <HashRouter>
            <LeftSide />
            <Routes>
              <Route path="/password-manager" element={<PasswordManager />} />
              <Route path="/password-generator" element={<PasswordGenerator />} />
            </Routes>
          </HashRouter>
      </div>
    </div>
  );
}

export default App;*/
