import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { faEdit, faStar, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { notify } from '../../common/Toast';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface Review {
    rating: number;
    review: string;
}

interface Recipe {
    _id: string;
    images: string;
    create_at: string;
    recipe_name_eng: string;
    reviews: Review[];
    userRating?: number;
    userFavorite?:boolean;
}

const MyRecipe = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') as any);
    const id = user.id;

    const getUserRecipesList = async () => {
        const user = JSON.parse(localStorage.getItem('user') as any);
        const id = user.id;
        try {
            const response = await axios.get(`http://localhost:3001/recipe?userId=${id}`);
            setRecipes(response.data.recipes);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };
    // const postUpdatedUserRecipes = async () => {
    //     const user = JSON.parse(localStorage.getItem('user') as any);
    //     const id = user.id;
    //     try {
    //         const response = await axios.put(`http://localhost:3001/recipe/${id}`);
    //         setRecipes(response.data.recipes);
    //     } catch (error) {
    //         console.error("Error fetching recipes:", error);
    //     }
    // };
    // const getEditUserRecipes = async () => {
    //     navigate(`/add-recipe`)
    //     const recipeId = recipes[0]._id;
    //     try {
    //         const response = await axios.get(`http://localhost:3001/recipe/${recipeId}`);
    //         console.log("response", response)
    //         setRecipes(response.data.recipes);
    //     } catch (error) {
    //         console.error("Error fetching recipes:", error);
    //     }
    // };

    const handleEditClick = (recipe: Recipe) => {
        navigate(`/add-recipe`, { state: { recipe } });
    };

    const handleDelete = async (_id: string) => {   
        try {
             await axios.delete(`http://localhost:3001/recipe/${_id}`)
            setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== _id));
            notify('Deleted successfully', { type: 'success' });
        } catch (error) {
        }
    }

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

    // const handleFavoriteChange = (recipeId: string) => {
    //     setRecipes(prevRecipes => prevRecipes.map(recipe => {
    //         if (recipe._id === recipeId) {
    //             return {
    //                 ...recipe,
    //                 userFavorite: !recipe.userFavorite
    //             };
    //         }
    //         return recipe;
    //     }));
    // };

    useEffect(() => {
        getUserRecipesList();
        getFavorites();

    }, []);
  return (
    <>
    <div className="container mx-auto">
       <div className="flex justify-end py-10">
        <NavLink to='/add-recipe'>
        <button className="py-2 px-10 bg-[#40ba37] text-white">Add Recipe</button>
        </NavLink>
       </div>
       <div>
        <p className="text-xl font-medium">My Recipes</p>
        <div className="container mx-auto py-20">
            <div className="flex flex-wrap gap-10">
                {recipes?.map((item) => (
                    <div
                        key={item._id}
                        className=""
                    >
                        <div className="w-30 h-30 overflow-hidden">
                            <img
                                src={`http://localhost:3001/${item.images}`}
                                className="w-full h-auto object-cover cursor-pointer"
                                alt={item.recipe_name_eng}
                                onClick={() => navigate(`/recipe/details/${item._id}`)}

                            />
                        </div>
                        <div className=''>
                            <p className="text-xs text-[#40ba37] font-normal mt-2">
                                {new Date(item.create_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                            <p className="text-lg font-semibold text-black">
                                {item.recipe_name_eng}
                            </p>
                            <div>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FontAwesomeIcon
                                        key={star}
                                        icon={star <= (item.userRating || item.reviews[0]?.rating || 0) ? faStar : faStarEmpty}
                                        className="text-yellow-500"

                                    />
                                ))}
                            </div>
                            <p className="text-lg font-normal">{item.reviews[0]?.review}</p>
                        </div>
                        <div className='flex gap-5'><p>

                            <button
                            onClick={()=>handleEditClick(item)}
                            >  <FontAwesomeIcon icon={faEdit} /></button>
                        </p>
                        <div onClick={() => handleFavoriteClick(item._id)}>
                {favorites.includes(item._id) ? (
                  <FaHeart className="text-red-500 cursor-pointer mt-1" />
                ) : (
                  <FaRegHeart className="text-gray-500 cursor-pointer mt-1" />
                )}
              </div>
                        <p className=''>

                            <button onClick={()=>handleDelete(item._id)}>  <FontAwesomeIcon icon={faTrashAlt} /></button>
                        </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
       </div>
    </div>
    </>
  )
}

export default MyRecipe