import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Suggestions({ darkMode, toggleDarkMode, language, toggleLanguage }) {
  const [suggestion, setSuggestion] = useState('');

  const handleSuggestionChange = (e) => {
    setSuggestion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Suggestion submitted: ' + suggestion);
    setSuggestion('');
  };

  return (
    <div className={`App ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      {/* Suggestions Form */}
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
          <button type="submit" className="btn btn-warning">
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
