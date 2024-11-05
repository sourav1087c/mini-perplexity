// frontend/src/App.js

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Link,
  IconButton,
  InputAdornment,
  Grid,
  Fade,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
      {/* AppBar for the header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">InsightLite</Typography>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Container maxWidth="md" style={{ marginTop: '30px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={10}>
              <TextField
                label="Ask a question"
                variant="outlined"
                fullWidth
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                startIcon={<SearchIcon />}
              >
                Ask
              </Button>
            </Grid>
          </Grid>
        </form>

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
            <Card style={{ marginTop: '20px' }}>
              <CardContent>
                <Typography variant="h5">Answer:</Typography>
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{ __html: formatAnswerWithLinks(answer) }}
                  style={{ marginTop: '10px' }}
                ></Typography>
              </CardContent>
            </Card>
          </Fade>
        )}

        {sources.length > 0 && (
          <Fade in={true} style={{ transitionDelay: '200ms' }}>
            <Card style={{ marginTop: '20px' }}>
              <CardContent>
                <Typography variant="h5">Sources:</Typography>
                {sources.map((source, index) => (
                  <Typography key={index} variant="body2" style={{ marginTop: '5px' }}>
                    [{index + 1}]&nbsp;
                    <Link href={source.link} target="_blank" rel="noopener noreferrer">
                      {source.title}
                    </Link>
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Fade>
        )}
      </Container>
    </>
  );
}

export default App;
