import React from 'react';
import NewsCard from './NewsCard';

/**
 * Displays a grid of news articles
 */
const NewsList = ({ articles }) => {
  if (!articles.length) {
    return <p style={{ textAlign: 'center' }}>No articles found.</p>;
  }

  return (
    <div className="news-grid container">
      {articles.map((article) => (
        <NewsCard key={article.url} article={article} />
      ))}
    </div>
  );
};

export default NewsList;
