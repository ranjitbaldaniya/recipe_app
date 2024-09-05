import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Recipe } from '../../../types/recepeTypes';
import {
  useDeleteRecipeMutation,
  useGetUserRecipeListMutation,
} from '../../../UserLayout/api/Recipe.api';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { notify } from '../../../common/Toast';

const ListRecipe = () => {
  const [recipes, setRecipes] = useState<any>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1)
  const navigate = useNavigate();
  const [userRecipeList] = useGetUserRecipeListMutation();
  const [deleteRecipe] = useDeleteRecipeMutation();
  const user = JSON.parse(localStorage.getItem('user') as any);
  const id = user?.id || '';
  useEffect(() => {
    if (id) {
      userRecipeList({ id, pageIndex, pageSize: 10 }).unwrap()
        .then(response => {
          setRecipes(response.recipes);
          setTotalPages(response.totalPages);
        })
        .catch(err => {
          console.error('Error fetching recipes:', err);
        });
    }
  }, [id, pageIndex, userRecipeList]);

  const handleEditClick = (recipe: Recipe) => {
    navigate(`/admin/add-recipe`, { state: { recipe } });
  };

  const handleRecipeDetails = (item: any) => {
    const userId = id;
    if (!userId) {
      notify('Login First', { type: 'error' });
    } else {
      navigate(`/admin/recipe/details/${item}`);
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      await deleteRecipe(_id).unwrap();
      notify('Deleted successfully', { type: 'success' });
      setRecipes((prevRecipes: any[]) =>
        prevRecipes.filter((recipe) => recipe._id !== _id),
      );
    } catch (error) {
      notify('Error deleting recipe:', { type: 'error' });
    }
  };

  const handlePageChange = (newPageIndex: number) => {
    if (newPageIndex >= 1 && newPageIndex <= totalPages) {
      setPageIndex(newPageIndex);
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-medium"> Admin Recipe List</h2>
        <Link to="/admin/add-recipe">
          <button className="p-3 border rounded-md me-5">Add recipe</button>
        </Link>
      </div>

      <div className="container mx-auto py-10">
        <div className="flex flex-wrap gap-10">
          {recipes?.map((item: Recipe) => (
            <div key={item._id} className="">
              <div className="w-30 h-30 overflow-hidden">
                <img
                  src={`http://localhost:3001/${item.images}`}
                  className="w-full h-50 object-cover cursor-pointer"
                  alt={item.recipe_name_eng}
                  onClick={() => handleRecipeDetails(item._id)}
                  // onClick={() => navigate(`/admin/recipe/details/${item._id}`)}
                />
              </div>
              <div className="">
                <p className="text-xs text-[#40ba37] font-normal mt-2">
                  {new Date(item.create_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p
                  className="text-lg font-semibold text-black cursor-pointer"
                  onClick={() => navigate(`/recipe/details/${item._id}`)}
                >
                  {item.recipe_name_eng}
                </p>
              </div>
              <div className="flex gap-5">
                <p>
                  <button onClick={() => handleEditClick(item)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </p>
                <p className="">
                  <button onClick={() => handleDelete(item._id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination-controls flex justify-between mt-10">
        <button
          disabled={pageIndex === 1}
          onClick={() => handlePageChange(pageIndex - 1)}
          className='px-5 py-2 bg-black rounded text-white'
        >
          Previous
        </button>
        {totalPages > 0 ?
        <span>Page {pageIndex} of {totalPages}</span> : 'Page 1' }
        <button
          disabled={pageIndex === totalPages}
          onClick={() => handlePageChange(pageIndex + 1)}
          className='px-5 py-2 bg-black rounded text-white'
        >
          Next
        </button>
    </div>
      </div>
    </>
  );
};

export default ListRecipe;
