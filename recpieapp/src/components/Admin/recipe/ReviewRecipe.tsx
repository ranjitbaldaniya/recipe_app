import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Recipe {
  _id: string;
  images: string;
  create_at: string;
  recipe_name_eng: string;
  category: string;
}

const AdminRecipeManagement: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  console.log(recipes)
  const [pagination, setPagination] = useState<any>({});
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize] = useState<number>(10);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/recipe-pending');
        setRecipes(response.data);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error('Error fetching recipes for admin:', error);
      }
    };

    fetchRecipes();
  }, [pageIndex, pageSize]);

  const handleApprove = async (recipeId: string) => {
    try {
      await axios.put(`http://localhost:3001/admin/approveRecipe/${recipeId}`);
      // Refresh the list after approving
      setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
    } catch (error) {
      console.error('Error approving recipe:', error);
    }
  };

  const handleReject = async (recipeId: string) => {
    try {
      await axios.delete(`/api/recipes/${recipeId}`);
      // Refresh the list after rejecting
      setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
    } catch (error) {
      console.error('Error rejecting recipe:', error);
    }
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && pagination.next) {
      setPageIndex(pagination.next.pageIndex);
    } else if (direction === 'prev' && pagination.prev) {
      setPageIndex(pagination.prev.pageIndex);
    }
  };

  return (
    <div className="admin-container">
      <h1>Recipe Approval Management</h1>
      <div className="recipe-list">
        {recipes?.map(recipe => (
          <div key={recipe._id} className="recipe-card">
            <h3>{recipe.recipe_name_eng}</h3>
            <p>{recipe.category}</p>
            <img
              src={`http://localhost:3001/${recipe.images}`}
              alt={recipe.recipe_name_eng}
              className="recipe-image"
            />
            <button onClick={() => handleApprove(recipe._id)}>Approve</button>
            <button onClick={() => handleReject(recipe._id)}>Reject</button>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button
          disabled={!pagination?.prev}
          onClick={() => handlePageChange('prev')}
        >
          Previous
        </button>
        <button
          disabled={!pagination?.next}
          onClick={() => handlePageChange('next')}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminRecipeManagement;
