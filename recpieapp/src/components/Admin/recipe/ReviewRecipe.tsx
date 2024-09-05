import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Recipe {
  _id: string;
  images: string;
  create_at: string;
  recipe_name_eng: string;
  category: string;
  difficulty_level: string;
  approved: boolean;
  status:string;
}

const AdminRecipeManagement: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalPages, setTotalPages] = useState(1)
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize] = useState<number>(10);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/admin/recipe-pending?pageIndex=${pageIndex}&pageSize=${pageSize}`);
        setRecipes(response.data[0].recipes);
        setTotalPages(response.data[0].totalPages);
      } catch (error) {
        console.error('Error fetching recipes for admin:', error);
      }
    };

    fetchRecipes();
  }, [pageIndex, pageSize]);

  const handlePageChange = (newPageIndex: number) => {
    if (newPageIndex >= 1 && newPageIndex <= totalPages) {
      setPageIndex(newPageIndex);
    }
  };

  const handleApprove = async (recipeId: string) => {
    try {
      await axios.put(`http://localhost:3001/admin/approveRecipe/${recipeId}`);
      setRecipes(prevRecipes =>
        prevRecipes.map(recipe =>
          recipe._id === recipeId ? { ...recipe, status: 'approved', approved:true } : recipe
        )
      );
    } catch (error) {
      console.error('Error approving recipe:', error);
    }
  };

  const handleReject = async (recipeId: string) => {
    try {
      await axios.delete(`http://localhost:3001/admin/rejectRecipe/${recipeId}`);
      setRecipes(prevRecipes =>
        prevRecipes.map(recipe =>
          recipe._id === recipeId ? { ...recipe, status: 'rejected', approved: false } : recipe
        )
      );
    } catch (error) {
      console.error('Error rejecting recipe:', error);
    }
  };

  return (
    <div className="admin-container">
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
      Recipe Approval Management
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Images
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Category
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Difficulty Level
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
            <select defaultValue='all' className='rounded px-2 py-2 border-2 mt-2 admin-recipe-select' >
              <option value='all'>All</option>
            <option value='approved'>Approved</option>
            <option value='rejected'>Rejected</option>
            </select>
          </div>
        </div>

        {recipes.map((recipe, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === recipes.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <img className='h-30 w-30' src={`http://localhost:3001/${recipe.images}`} alt="Recipe-image" />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{recipe.recipe_name_eng}</p>
            </div>

            <div className="flex flex-wrap items-center justify-center p-2.5 xl:p-5">
              <p className="">{recipe.category}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{recipe.difficulty_level}</p>
            </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                {recipe.status === 'pending' ? (
                  <>
                    <button
                      className='text-meta-3 ml-5'
                      onClick={() => handleApprove(recipe._id)}
                    >
                      Approve
                    </button>
                    <button
                      className='text-meta-1 ml-5'
                      onClick={() => handleReject(recipe._id)}
                    >
                      Reject
                    </button>
                  </>
                ) : recipe.approved === true ? (
                  <span className='text-meta-3 ml-5'>Approved</span>
                ) : recipe.approved === false ? (
                  <span className='text-meta-1 ml-5'>Rejected</span>
                ): ''}
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
    </div>
  );
};

export default AdminRecipeManagement;
