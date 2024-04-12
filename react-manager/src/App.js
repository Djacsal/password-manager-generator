import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import "./App.css";
import LeftSide from "./components/LeftSide/LeftSide";
import PasswordManager from "./components/RightSide/PasswordManager/PasswordManager";
import PasswordGenerator from "./components/RightSide/PasswordGenerator/PasswordGenerator";

function App() {
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

export default App;

{
  /* <div className="App">
      <div className="container">
        <Router>
          <LeftSide />
          <RightSide />
        </Router>
      </div>
    </div> */
}
