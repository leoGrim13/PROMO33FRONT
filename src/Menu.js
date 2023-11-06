import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div>
      <Link to="/catalogue">
        <button>Catalogue</button>
      </Link>
      <Link to="/admin">
        <button>Admin</button>
      </Link>
    </div>
  );
}

export default Menu;
