import React from 'react';
import '../../App.css';

const Footer = ({ darkMode }) => {
    <footer className={`footer p-3 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
    <div className="text-center">
      <p>&copy; {new Date().getFullYear()} Jobify. All rights reserved.</p>
      <a href="/privacy-policy" className="text-decoration-none text-reset">Privacy Policy</a>
      <span className="mx-2">|</span>
      <a href="/terms-of-service" className="text-decoration-none text-reset">Terms of Service</a>
    </div>
    <div className="social-media mt-3">
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
        <i className="fa-brands fa-linkedin"></i>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
        <i className="fa-brands fa-twitter"></i>
      </a>
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
        <i className="fa-brands fa-facebook"></i>
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
        <i className="fa-brands fa-instagram"></i>
      </a>
    </div>
  </footer>
}
export default Footer;
