const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Mini Perplexity Q&A Backend');
});

app.post('/api/question', (req, res) => {
    const { question } = req.body;
    console.log(`Received question: ${question}`);
    // Placeholder response
    res.json({ answer: `This is a placeholder answer for: ${question}` });
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
