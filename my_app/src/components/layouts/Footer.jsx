import React, { useState } from 'react';

function Footer() {
  const [jobAds, setJobAds] = useState([]);
  const [isAdmin, ] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('EN'); // Default language



  
  return (
    <>
      <div>
        {/* Footer */}
        <footer className={`footer_class=d-flex justify-content-between align-items-center p-3 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
          <div>
            <p>&copy; {new Date().getFullYear()} Jobify. {language === 'EN' ? 'All rights reserved.' : 'Tous droits réservés.'}</p>
          </div>
          <div>
            <a href="/privacy-policy" className="text-decoration-none text-reset">{language === 'EN' ? 'Privacy Policy' : 'Politique de confidentialité'}</a>
            <span className="mx-2">|</span>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
