import React from 'react';
import NotImplemented from '../NotImplemented/NotImplemented';
import './Header.scss';

function Header() {
  return (
    <div className="header">
      <h1 className="logo">musicblob</h1>
      <div>
        <input type="text" placeholder="What do you want to hear?" />
        <input type="button" value="Search" onClick={NotImplemented} />
      </div>
      <div>
        <a onClick={NotImplemented}>Sign Up</a>
        <a onClick={NotImplemented}>Login</a>
      </div>
    </div>
  );
}

export default Header;
