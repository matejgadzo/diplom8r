import "./App.scss";

function App() {
  return (
    <div className="main">
      <div className="header">
        <div className="hero">
          <h1 className="heroTitle">Diplom8tor</h1>
        </div>
        <ul className="menu">
          <li className="menuItem active">Home</li>
          <a href="#" className="menuLink">
            <li className="menuItem">Templates</li>
          </a>
          <li className="menuItem">Account</li>
        </ul>
      </div>
      <div className="content">
        <div className="container">
          <h1 className="title">Upload a document you want to sign</h1>
          <div className="uploadArea">
            <input type="file" />
          </div>
        </div>
      </div>
      <div className="footer">
      <p className="footerText"> &#169; 2024 CM8</p>
      </div>
    </div>
  );
}

export default App;
