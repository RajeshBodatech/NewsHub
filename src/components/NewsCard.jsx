import React from 'react';

/**
 * Reusable card to display individual news articles
 */
const NewsCard = ({ article }) => {
  return (
    <div className="card">
      {(article.image || article.urlToImage) && (
        <img src={article.image || article.urlToImage} alt={article.title} loading="lazy" />
      )}
      <div className="card-content">
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          <button className="read-more">Read More</button>
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
