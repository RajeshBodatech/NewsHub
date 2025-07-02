import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import './NewsStyles.css';
import React from 'react';

function App() {
  const [category, setCategory] = useState('general'); // Default: Miscellaneous
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    // Remove previous category classes
    document.body.classList.remove(
      'cat-general', 'cat-sports', 'cat-business', 'cat-technology', 'cat-entertainment', 'cat-international'
    );
    // Add current category class
    document.body.classList.add(`cat-${category}`);
  }, [dark, category]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="splash-screen">
        <div className="splash-logo">📰</div>
        <h1 className="splash-title">NewsHub</h1>
        <p className="splash-tagline">Your daily dose of news</p>
        <div className="splash-spinner"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar
        dark={dark}
        onToggleTheme={() => setDark(!dark)}
        selectedCategory={category}
        onCategoryChange={(cat) => {
          setCategory(cat);
          setQuery('');
        }}
        onSearch={(term) => setQuery(term)}
      />
      <Home category={category} query={query} />
    </>
  )
}

export default App
