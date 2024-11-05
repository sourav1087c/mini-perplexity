// frontend/src/App.js

import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Typography, Link, Container, Box } from '@mui/material';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [sources, setSources] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnswer('');
    setSources([]);
    setError('');
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Mini Perplexity Q&A System
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" alignItems="center">
          <TextField
            label="Enter your question"
            variant="outlined"
            fullWidth
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '10px' }}>
            Ask
          </Button>
        </Box>
      </form>
      {isLoading && (
        <Box display="flex" justifyContent="center" marginTop="20px">
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography color="error" style={{ marginTop: '20px' }}>
          {error}
        </Typography>
      )}
      {answer && (
        <Box marginTop="20px">
          <Typography variant="h5">Answer:</Typography>
          <Typography
            dangerouslySetInnerHTML={{ __html: formatAnswerWithLinks(answer) }}
            style={{ marginTop: '10px' }}
          ></Typography>
        </Box>
      )}
      {sources.length > 0 && (
        <Box marginTop="20px">
          <Typography variant="h5">Sources:</Typography>
          <ul>
            {sources.map((source, index) => (
              <li key={index}>
                [{index + 1}]{' '}
                <Link href={source.link} target="_blank" rel="noopener noreferrer">
                  {source.title}
                </Link>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Container>
  );
}

export default App;
