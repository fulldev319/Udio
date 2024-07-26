import React from 'react';
import NotImplemented from '../NotImplemented/NotImplemented';

function Header() {
  return (
    <div className="header">
      <h1 className="logo">musicblob</h1>
      <input type="text" placeholder="What do you want to hear?" />
      <input type="button" value="Search" onClick={NotImplemented} />
      <a onClick={NotImplemented}>Sign Up</a>
      <a onClick={NotImplemented}>Login</a>
    </div>
  );
}

export default Header;
