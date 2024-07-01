import React from 'react';
import { Link } from 'react-router-dom';

const ListRecipe = () => {
  return (
    <div>
      <h2> ListRecipe</h2>
      <button className="p-3 border rounded-md">
        <Link to="/admin/add-recipe">Add recipe</Link>
      </button>
    </div>
  );
};

export default ListRecipe;
