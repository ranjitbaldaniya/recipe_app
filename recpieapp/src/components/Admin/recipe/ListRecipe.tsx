import { Link } from 'react-router-dom';

const ListRecipe = () => {
  return (
    <div className="mb-4 flex justify-between">
      <h2 className="text-2xl"> ListRecipe</h2>
      <Link to="/admin/add-recipe">
        <button className="p-3 border rounded-md me-5">Add recipe</button>
      </Link>
    </div>
  );
};

export default ListRecipe;
