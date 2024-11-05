// src/App.js

import React, { useState } from 'react';
import {
  Container,
  CircularProgress,
  Alert,
  Fade,
} from '@mui/material';

import Header from './components/Header';
import QuestionForm from './components/QuestionForm';
import AnswerCard from './components/AnswerCard';
import SourcesCard from './components/SourcesCard';

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
    <>
      <Header />

      <Container maxWidth="md" style={{ marginTop: '30px' }}>
        <QuestionForm
          question={question}
          setQuestion={setQuestion}
          handleSubmit={handleSubmit}
        />

        {isLoading && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </div>
        )}

        {error && (
          <Alert severity="error" style={{ marginTop: '20px' }}>
            {error}
          </Alert>
        )}

        {answer && (
          <Fade in={true}>
            <AnswerCard answerHtml={formatAnswerWithLinks(answer)} />
          </Fade>
        )}

        {sources.length > 0 && (
          <Fade in={true} style={{ transitionDelay: '200ms' }}>
            <SourcesCard sources={sources} />
          </Fade>
        )}
      </Container>
    </>
  );
}

export default App;
