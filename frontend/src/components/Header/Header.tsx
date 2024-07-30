import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

interface HeaderProps {
  onSearch: (query: string) => void;
}

function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="header">
      <h1 className="logo">musicblob</h1>
      <div>
        <input 
          type="text" 
          placeholder="What do you want to hear?" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input 
          type="button" 
          value="Search" 
          onClick={handleSearch} 
        />
      </div>
      <div>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Header;
