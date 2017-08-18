import React from 'react';
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div>
      <span>404: Page not found</span>
      <p><Link to="/">Go to Home </Link></p>
    </div>
  );
};

export default PageNotFound;