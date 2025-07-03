import React, { useEffect, useState } from 'react';
import NewsList from '../components/NewsList';

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

      let url = `/api/news?category=${encodeURIComponent(category)}&query=${encodeURIComponent(query)}`;
      try {
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
