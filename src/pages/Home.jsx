import React, { useEffect, useState } from 'react';
import NewsList from '../components/NewsList';

// NewsAPI key (keep secret in production)
const API_KEY = '2ff0908b950945d3badd8b1bf468f159'; // Updated key from user
const BASE_URL = 'https://newsapi.org/v2';

/**
 * Fetches and renders news based on category or search query
 */
const Home = ({ category, query }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      let url = ''; // Build API endpoint dynamically
      try {
        if (query) {
          // Search endpoint
          url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&pageSize=10&language=en&apiKey=${API_KEY}`;
        } else {
          // Category endpoint
          // For 'general' we omit topic param to get mixed headlines
          url = category === 'international'
            ? `${BASE_URL}/top-headlines?language=en&pageSize=10&apiKey=${API_KEY}`
            : `${BASE_URL}/top-headlines?category=${category}&country=us&pageSize=10&apiKey=${API_KEY}`;
        }

        const res = await fetch(url);
        if (!res.ok) {
          // Try to extract error message from API response
          let msg = 'Failed to fetch news';
          try {
            const errData = await res.json();
            msg = errData.message || msg;
          } catch (_) {}
          throw new Error(msg);
        }

        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, query]);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

  return <NewsList articles={articles} />;
};

export default Home;
