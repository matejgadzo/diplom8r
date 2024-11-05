import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Templates from "./components/templates";
import Home from "./components/home";
import Account from "./components/account";

function App() {
  return (
    <Router>
    <div className="main">
      <div className="header">
        <div className="hero">
          <h1 className="heroTitle">Diplom8r</h1>
        </div>
        <ul className="menu">
          <li className="menuItem active"><Link to={"/"}>Home</Link></li>
          <li className="menuItem"><Link to={"/templates"}>Templates</Link></li>
          <li className="menuItem"><Link to={"/account"}>Account</Link></li>
        </ul>
      </div>
      <div className="content">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/account" element={<Account />} />
        </Routes>

      </div>
      <div className="footer">
      <p className="footerText"> &#169; 2024 CM8</p>
      </div>
    </div>
    </Router>
  );
}

export default App;
