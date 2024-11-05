// frontend/src/App.js

import React, { useState } from 'react';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [sources, setSources] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnswer('');
    setSources([]);
    setError('');
    try {
      const response = await fetch('/api/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
      } else {
        const data = await response.json();
        setAnswer(data.answer);
        setSources(data.sources);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching the answer.');
    }
  };

  // Function to convert source numbers in the answer to hyperlinks
  const formatAnswerWithLinks = (answer) => {
    return answer.replace(/\[(\d+)\]/g, (match, number) => {
      const source = sources[number - 1];
      if (source) {
        return `<a href="${source.link}" target="_blank" rel="noopener noreferrer">[${number}]</a>`;
      } else {
        return match;
      }
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Mini Perplexity Q&A System</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          style={{ width: '300px', padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px' }}>Ask</button>
      </form>
      {error && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          <p>{error}</p>
        </div>
      )}
      {answer && (
        <div style={{ marginTop: '20px' }}>
          <h2>Answer:</h2>
          <p dangerouslySetInnerHTML={{ __html: formatAnswerWithLinks(answer) }}></p>
        </div>
      )}
      {sources.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Sources:</h2>
          <ul>
            {sources.map((source, index) => (
              <li key={index}>
                [{index + 1}] <a href={source.link} target="_blank" rel="noopener noreferrer">{source.title}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
