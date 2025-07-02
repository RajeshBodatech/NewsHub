import React, { useState } from 'react';

// Category mapping between UI labels and NewsAPI categories
const categories = [
  { label: '📰 Misc', value: 'general' },
  { label: '🏅 Sports', value: 'sports' },
  { label: '💼 Business', value: 'business' },
  { label: '💻 Tech', value: 'technology' },
  { label: '🎬 Cinema', value: 'entertainment' },
  { label: '🌐 World', value: 'international' },
];

/**
 * Navbar component showing site logo, category buttons and a search box
 */
const Navbar = ({ selectedCategory, onCategoryChange, onSearch, dark, onToggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [input, setInput] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(input);
    }
  };

  return (
    <nav className="navbar container">
      <span className="logo">NewsHub</span>

      <button
        className="hamburger"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        {menuOpen ? '✖' : '☰'}
      </button>

      <div className={`categories ${menuOpen ? 'open' : ''}`}>
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`btn ${selectedCategory === cat.value ? 'active' : ''}`}
            onClick={() => { onCategoryChange(cat.value); setMenuOpen(false);} }
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search news..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="btn" onClick={() => onSearch(input)}>
          Search
        </button>
      </div>

      <button className="btn theme-toggle" onClick={onToggleTheme} title="Toggle theme">
        {dark ? '🌞' : '🌙'}
      </button>
    </nav>
  );
};

export default Navbar;
