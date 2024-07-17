import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken, faHeartCircleBolt, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { FaHeart, FaHeartbeat, FaRegHeart } from 'react-icons/fa';

interface Review {
    rating: number;
    review: string;
    favorite:number;
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

const RecipeList = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const navigate = useNavigate();

    const getRecipes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/recipe');
            setRecipes(response.data.recipes);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };
    // const [rating, setRating] = useState<number | null>(null);

    // const handleRatingChange = (newRating: number) => {
    //     setRating(newRating);
    //   };

    useEffect(() => {
        getRecipes();
    }, []);

    // const handleFavoriteChange = async (recipeId: string) => {
    //     try {
    //         const updatedRecipes = recipes.map(recipe => {
    //             if (recipe._id === recipeId) {
    //                 return {
    //                     ...recipe,
    //                     userFavorite: !recipe.userFavorite
    //                 };
    //             }
    //             return recipe;
    //         });
    //         setRecipes(updatedRecipes);

    //         // Example: Update favorite status on server using axios
    //         await axios.put(`http://localhost:3001/recipe/${recipeId}`, {
    //             userFavorite: updatedRecipes.find(recipe => recipe._id === recipeId)?.userFavorite
    //         });
    //     } catch (error) {
    //         console.error("Error updating favorite status:", error);
    //     }
    // };

    const handleFavoriteChange = (recipeId: string) => {
        setRecipes(prevRecipes => prevRecipes.map(recipe => {
            if (recipe._id === recipeId) {
                return {
                    ...recipe,
                    userFavorite: !recipe.userFavorite  // Toggle userFavorite for the clicked recipe
                };
            }
            return recipe;
        }));
    };

    return (
        <div className="container mx-auto py-20">
            <div className="grid grid-cols-3 gap-10">
                {recipes.map((item) => (
                    <div
                        key={item._id}
                        className="flex gap-4"
                    >
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
                            {/* {[1].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={rating ? faHeart : faStarEmpty}  // Display faHeart if rated (rating is truthy), otherwise display faStarEmpty
                  className="text-yellow-500 cursor-pointer "
                  onClick={() => handleRatingChange(!rating as any)}  // Toggle the rating when clicked

                />
              ))} */}
              {item.userFavorite ? (
                                <FaHeart
                                    className="text-red-500 cursor-pointer"
                                    onClick={() => handleFavoriteChange(item._id)}
                                />
                            ) : (
                                <FaRegHeart
                                    className="text-red-500 cursor-pointer"
                                    onClick={() => handleFavoriteChange(item._id)}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
