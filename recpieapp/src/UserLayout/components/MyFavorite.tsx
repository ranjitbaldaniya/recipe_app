import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import {
  useDeleteFavoriteMutation,
  useEditFavoriteMutation,
  useGetFavoritesIdMutation,
  useGetFavoritesMutation,
} from '../api/favorite.api';

interface Review {
  rating: number;
  review: string;
}

interface Recipe {
  _id: string;
  create_at: string;
  recipe_id: {
    images: string;
    recipe_name_eng: string;
    _id: string;
  };
  reviews: Review[];
  userRating?: number;
  userFavorite?: boolean;
}

const MyFavorite = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [deleteFavorite] = useDeleteFavoriteMutation();
  const [favorite] = useGetFavoritesMutation();
  const [favoriteId] = useGetFavoritesIdMutation();
  const [editFavorite] = useEditFavoriteMutation();
  const [userFavoriteRecipeList] = useGetFavoritesMutation();

  const user = JSON.parse(localStorage.getItem('user') as any);
  const id = user.id;

  const getUserRecipesList = async () => {
    try {
      const response = await userFavoriteRecipeList(id);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const getFavorites = async () => {
    try {
      const response = await favorite(id);
      setFavorites(
        response.data.map(
          (fav: { recipe_id: { _id: string } }) => fav.recipe_id._id,
        ),
      );
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const getFavoriteId = async (recipeId: string) => {
    try {
      const response = await favoriteId(id);
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
      if (favorites.includes(recipeId)) {
        const favoriteId = await getFavoriteId(recipeId);
        if (favoriteId) {
          await deleteFavorite(favoriteId);
          setFavorites(favorites.filter((fav) => fav !== recipeId));
          setRecipes(
            recipes.filter((recipe) => recipe.recipe_id._id !== recipeId),
          );
        }
      } else {
        await editFavorite({ user_id: id, recipe_id: recipeId }).unwrap();
        setFavorites([...favorites, recipeId]);
      }
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  useEffect(() => {
    getUserRecipesList();
    getFavorites();
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <div>
          <p className="text-xl font-medium mt-10">My Favorite</p>
          <div className="container mx-auto py-20">
            <div className="flex flex-wrap gap-10">
              {recipes?.map((item) => (
                <div key={item._id} className="">
                  <div className="w-30 h-30 overflow-hidden">
                    <img
                      src={`http://localhost:3001/${
                        item.recipe_id.images ?? ''
                      }`}
                      className="w-full h-auto object-cover cursor-pointer"
                      onClick={() =>
                        navigate(`/recipe/details/${item.recipe_id._id}`)
                      }
                      alt={item.recipe_id.recipe_name_eng}
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
                      onClick={() =>
                        navigate(`/recipe/details/${item.recipe_id._id}`)
                      }
                    >
                      {item.recipe_id.recipe_name_eng}
                    </p>
                  </div>
                  <div className="flex items-end">
                    <div
                      onClick={() => handleFavoriteClick(item.recipe_id._id)}
                      className="cursor-pointer"
                    >
                      {favorites.includes(item.recipe_id._id) ? (
                        <FaHeart className="text-red-500 my-1" />
                      ) : (
                        <FaRegHeart className="text-gray-500 my-1" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyFavorite;
