// backend/index.js

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { OpenAI } from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to perform search using Google Custom Search API
async function performSearch(query) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const searchEngineId = process.env.SEARCH_ENGINE_ID;

  const params = {
    key: apiKey,
    cx: searchEngineId,
    q: query,
    num: 10, 
    lr: 'lang_en', 
    safe: 'active',
  };

  const response = await axios.get('https://www.googleapis.com/customsearch/v1', { params });
  return response.data;
}


// Helper function to format search results
function formatSearchResults(searchResults) {
  let formattedResults = '';
  searchResults.items.forEach((item, index) => {
    formattedResults += `[${index + 1}] ${item.title}: ${item.snippet}\nURL: ${item.link}\n\n`;
  });
  return formattedResults;
}

// Function to generate answer using OpenAI API
async function generateAnswer(question, searchResults) {
  // Prepare the messages for the Chat Completion API
  const messages = [
    {
      role: 'system',
      content: 'You are an AI assistant that provides concise answers based on search results and includes source numbers in square brackets like [1].',
    },
    {
      role: 'user',
      content: `Question: ${question}\n\nSearch Results:\n${formatSearchResults(searchResults)}\nProvide a concise answer to the question above based on the search results. Include source numbers in square brackets.`,
    },
  ];

  // Call the OpenAI Chat Completion API
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: messages,
    max_tokens: 150,
    temperature: 0.7,
  });

  const answer = response.choices[0].message.content.trim();
  return answer;
}

// API endpoint to handle questions
app.post('/api/question', async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }
  try {
    const searchResults = await performSearch(question);
    if (!searchResults.items || searchResults.items.length === 0) {
      return res.status(404).json({ error: 'No search results found' });
    }
    const answer = await generateAnswer(question, searchResults);
    res.json({ answer, sources: searchResults.items });
  } catch (error) {
    console.error('Error generating answer:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to generate answer' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
