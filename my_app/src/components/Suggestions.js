import React, { useState } from 'react';

function Suggestions() {
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
    <div>
      {/* Job Board Header */}
      <header className="bg-orange text-white text-center py-5">
        <h1>Jobify</h1>
        <p>"Find your next career hit!"</p>
      </header>

      <div className="container my-5">
        <h2>Suggestions / Ideas</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="5"
              value={suggestion}
              onChange={handleSuggestionChange}
              placeholder="Your suggestion here..."
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p>&copy; 2024 Job Board. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Suggestions;
