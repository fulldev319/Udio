import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';

interface HeaderProps {
  onSearch: (query: string) => void;
}

function Header({ onSearch }: HeaderProps) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="header">
      <h1 className="logo" onClick={handleLogoClick}>musicblob</h1>
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
        {isLoggedIn ? (
          <a href='/login' onClick={handleLogout}>Logout</a>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
