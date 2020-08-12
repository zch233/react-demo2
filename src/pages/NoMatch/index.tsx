import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch: React.FC = () => {
  return (
    <div>
      this is 404 Page <Link to="/">GO HOME</Link>
    </div>
  );
};

export default NoMatch;
