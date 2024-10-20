import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Badge } from 'react-bootstrap';
export default function Header() {
  const [jobAds, setJobAds] = useState([]);
  const [isAdmin, ] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('EN'); // Default language

  // Handle Dark/Light Theme Switch
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Handle Language Switch
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'EN' ? 'FR' : 'EN'));
  };

  
  return (
    <>
      <div className={`App ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
        {/* Header */}
        <header className={`header_class=d-flex justify-content-between align-items-center p-3 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
          <div>
            {/* <h1 style={{backgroundColor:"black", color:"green", textAlign:"center", padding:"2rem 0", fontSize:"3rem", fontFamily:"Montserrat, sans-serif"}}>Jobify</h1> */}
            <p>{language === 'EN' ? 'Find your next career hit!' : 'Trouvez votre prochaine carrière!'}</p>
          </div>
          import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


    <Card style={{ width: '18rem' }}>

      <Card.Body>
        <Card.Title style={{fontWeight:"bold", textTransform:"uppercase", letterSpacing:"5px", borderBottom:'2px dotted lightgreen', marginBottom:"2rem"}}>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Badge style={{padding:"2rem 2rem", color:"green" }} pill bg="dark">
        Success
      </Badge>
        <Button variant="outlined" style={{backgroundColor:"dark"}}>Go somewhere</Button>
      </Card.Body>
    </Card>


          {/* Dark/Light and Language Switches */}
          <div className="d-flex align-items-center chocolat ">
            {/* Dark/Light Switch */}
            <div className="form-check form-switch me-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="darkModeSwitch"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <label className="form-check-label" htmlFor="darkModeSwitch">
                {darkMode ? 'Dark' : 'Light'}
              </label>
            </div>

            {/* Language Switch */}
            <button className="btn btn-outline-primary me-3" onClick={toggleLanguage}>
              {language === 'EN' ? 'FR' : 'EN'}
            </button>
          </div>
        </header>

      </div>
    </>
  );
}
