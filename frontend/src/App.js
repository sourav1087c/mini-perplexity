// frontend/src/App.js
import React, { useState } from 'react';

function App() {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission later
    console.log(question);
  };

  return (
    <div>
      <h1>Mini Perplexity Q&A System</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <button type="submit">Ask</button>
      </form>
    </div>
  );
}

export default App;
