import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Suggestions({ darkMode, toggleDarkMode, language, toggleLanguage }) {
  const [suggestion, setSuggestion] = useState('');

  const handleSuggestionChange = (e) => {
    setSuggestion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can send the suggestion to the backend or handle it as needed
    alert('Suggestion submitted: ' + suggestion);
    setSuggestion('');
  };

  return (
    <div className={`App ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      {/* Header */}
      <header className={`d-flex justify-content-between align-items-center p-3 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
        <div>
          <h1>Jobify</h1>
          <p>{language === 'EN' ? 'Find your next career hit!' : 'Trouvez votre prochaine carrière!'}</p>
        </div>

        {/* Dark/Light and Language Switches */}
        <div className="d-flex align-items-center">
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

          {/* Profile Button */}
          <Link to="/profile">
            <button className="btn btn-pale-orange">Profile</button>
          </Link>
        </div>
      </header>

      <div className="container my-5">
        <h2>{language === 'EN' ? 'Suggestions / Ideas' : 'Suggestions / Idées'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="5"
              value={suggestion}
              onChange={handleSuggestionChange}
              placeholder={language === 'EN' ? 'Your suggestion here...' : 'Votre suggestion ici...'}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {language === 'EN' ? 'Submit' : 'Soumettre'}
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className={`text-center py-3 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
        <p>&copy; 2024 Job Board. {language === 'EN' ? 'All rights reserved.' : 'Tous droits réservés.'}</p>
      </footer>
    </div>
  );
}

export default Suggestions;
