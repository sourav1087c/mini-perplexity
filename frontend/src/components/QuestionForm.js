// src/components/QuestionForm.js

import React from 'react';
import { TextField, Button, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function QuestionForm({ question, setQuestion, handleSubmit }) {
  return (
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
  );
}

export default QuestionForm;
