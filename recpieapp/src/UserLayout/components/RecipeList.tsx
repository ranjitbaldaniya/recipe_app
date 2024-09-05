import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useCategory } from '../components/CategoryContext';
import { notify } from '../../common/Toast';
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useGetFavoritesIdMutation,
  useGetFavoritesMutation,
} from '../api/favorite.api';
import {
  useGetAllRecipeQuery,
  useGetRecipeByCategoryMutation,
} from '../api/Recipe.api';

interface Review {
  rating: number;
  review: string;
  favorite: number;
}

interface Recipe {
  _id: string;
  images: string;
  create_at: string;
  recipe_name_eng: string;
  reviews: Review[];
  userRating?: number;
  userFavorite?: boolean;
}

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') as any);
  const id = user?.id || '';
  const { categoryId } = useCategory();
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { data, error } = useGetAllRecipeQuery({ pageIndex, pageSize: 10 });
  const [deleteFavorite] = useDeleteFavoriteMutation();
  const [addFavorite] = useAddFavoriteMutation();
  const [favorite] = useGetFavoritesMutation();
  const [favoriteId] = useGetFavoritesIdMutation();
  const [recipeByCategory] = useGetRecipeByCategoryMutation();

  useEffect(() => {
    if (data) {
      setRecipes(data.recipes);
      setTotalPages(data.totalPages);
    }
    if (error) {
      console.error('Error fetching recipes:', error);
    }
  }, [data, error]);
  const getFavorites = async () => {
    try {
      const userId = id;
      const response = await favorite(userId);
      setFavorites(
        response.data.map(
          (fav: { recipe_id: { _id: string } }) => fav.recipe_id?._id,
        ),
      );
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const getFavoriteId = async (recipeId: string) => {
    try {
      const userId = id;
      const response = await favoriteId(userId);
      const favorite = response.data.find(
        (fav: { recipe_id: { _id: string } }) => fav.recipe_id._id === recipeId,
      );
      return favorite?._id;
    } catch (error) {
      console.error('Error fetching favorite ID:', error);
    }
  };

  const handleFavoriteClick = async (recipeId: string) => {
    try {
      const userId = id;
      if (!userId) {
        notify('Login First', { type: 'error' });
      }
      if (favorites.includes(recipeId)) {
        const favoriteId = await getFavoriteId(recipeId);
        if (favoriteId) {
          await deleteFavorite(favoriteId);
          setFavorites(favorites.filter((fav) => fav !== recipeId));
        }
      } else {
        await addFavorite({ user_id: userId, recipe_id: recipeId }).unwrap();
        setFavorites([...favorites, recipeId]);
      }
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const getRecipesByCategory = async () => {
    try {
      const response = await recipeByCategory(categoryId);
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleRecipeDetails = (item: any) => {
    const userId = id;
    if (!userId) {
      notify('Login First', { type: 'error' });
    } else {
      navigate(`/recipe/details/${item}`);
    }
  };
  const handlePageChange = (newPageIndex: number) => {
    if (newPageIndex >= 1 && newPageIndex <= totalPages) {
      setPageIndex(newPageIndex);
    }
  };
  useEffect(() => {
    if (data) {
      setRecipes(data.recipes);
    }
    if (error) {
      console.error('Error fetching recipes:', error);
    }
  }, [data, error]);

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    if (categoryId) {
      getRecipesByCategory();
    }
  }, [categoryId]);

  return (
    <div className="container mx-auto py-20">
      <div className="flex gap-10 flex-wrap">
        {recipes.map((item: any) => (
          <div key={item._id} className="">
            <div className="w-30 h-30 overflow-hidden">
              <img
                src={`http://localhost:3001/${item.images}`}
                className="w-full h-50 object-cover cursor-pointer"
                alt={item.recipe_name_eng}
                onClick={() => handleRecipeDetails(item._id)}
              />
            </div>
            <div>
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
              <div onClick={() => handleFavoriteClick(item._id)}>
                {favorites.includes(item._id) ? (
                  <FaHeart className="text-red-500 cursor-pointer mt-1" />
                ) : (
                  <FaRegHeart className="text-gray-500 cursor-pointer mt-1" />
                )}
              </div>
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
  );
};

export default RecipeList;
