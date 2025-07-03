const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const NEWS_API_KEY = '2ff0908b950945d3badd8b1bf468f159'; // Use your NewsAPI key

app.use(cors()); // Allow all origins for dev

app.get('/api/news', async (req, res) => {
  const { category = 'general', query = '' } = req.query;
  let url = '';
  if (query) {
    url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=10&language=en&apiKey=${NEWS_API_KEY}`;
  } else {
    url = category === 'international'
      ? `https://newsapi.org/v2/top-headlines?language=en&pageSize=10&apiKey=${NEWS_API_KEY}`
      : `https://newsapi.org/v2/top-headlines?category=${category}&country=us&pageSize=10&apiKey=${NEWS_API_KEY}`;
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Server error', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend proxy running on http://localhost:${PORT}`);
}); 