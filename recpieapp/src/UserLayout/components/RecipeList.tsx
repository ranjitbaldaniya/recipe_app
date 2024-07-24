import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useCategory } from '../components/CategoryContext';

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

  const getRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/recipe');
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const getFavorites = async () => {
    try {
      const userId = id;
      const response = await axios.get(`http://localhost:3001/favorite/user/${userId}`);
      setFavorites(response.data.map((fav: { recipe_id: { _id: string } }) => fav.recipe_id._id));
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const getFavoriteId = async (recipeId: string) => {
    try {
      const userId = id;
      const response = await axios.get(`http://localhost:3001/favorite/user/${userId}`);
      const favorite = response.data.find((fav: { recipe_id: { _id: string } }) => fav.recipe_id._id === recipeId);
      return favorite?._id;
    } catch (error) {
      console.error('Error fetching favorite ID:', error);
    }
  };

  const handleFavoriteClick = async (recipeId: string) => {
    try {
      const userId = id;
      if (favorites.includes(recipeId)) {
        const favoriteId = await getFavoriteId(recipeId);
        if (favoriteId) {
          await axios.delete(`http://localhost:3001/favorite/${favoriteId}`);
          setFavorites(favorites.filter((fav) => fav !== recipeId));
        }
      } else {
        await axios.post('http://localhost:3001/favorite', { user_id: userId, recipe_id: recipeId });
        setFavorites([...favorites, recipeId]);
      }
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const getRecipesByCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/recipe?category=${categoryId}`);
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    getRecipes();
    getFavorites();
  }, []);

  useEffect(() => {
    if (categoryId) {
      getRecipesByCategory();
    }
  }, [categoryId]);

  return (
    <div className="container mx-auto py-20">
      <div className="grid grid-cols-3 gap-10">
        {recipes.map((item) => (
          <div key={item._id} className="flex gap-4">
            <div className="w-30 h-30 overflow-hidden">
              <img
                src={`http://localhost:3001/${item.images}`}
                className="w-full h-auto object-cover cursor-pointer"
                alt={item.recipe_name_eng}
                onClick={() => navigate(`/recipe/details/${item._id}`)}
              />
            </div>
            <div>
              <p className="text-xs text-[#40ba37] font-normal">
                {new Date(item.create_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-lg font-semibold text-black cursor-pointer" onClick={() => navigate(`/recipe/details/${item._id}`)}>{item.recipe_name_eng}</p>
              <div onClick={() => handleFavoriteClick(item._id)}>
                {favorites.includes(item._id) ? (
                  <FaHeart className="text-red-500 cursor-pointer" />
                ) : (
                  <FaRegHeart className="text-gray-500 cursor-pointer" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;