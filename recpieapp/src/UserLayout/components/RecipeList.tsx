import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

const RecipeList = () => {
    const [recipe, setRecipe] = useState<any>();
    console.log(recipe)
    const getRecipe = async () => {
        const response = await axios.get('http://localhost:3001/recipe')
        setRecipe(response.data.recipes)
    }
    useEffect(() => {
        getRecipe()
    }, [])
    return (
        <>
            <div className="container mx-auto py-20">
                <NavLink to='/add-recipe'>
                    <div className='flex justify-end mb-10'>
                        <button className='py-2 px-10 bg-[#40ba37] text-white'>
                            Add Recipe
                        </button>
                    </div>
                </NavLink>
                <div className="grid grid-cols-3 gap-10">
                    {recipe?.map((item: any) => (
                        <div className='flex gap-4'>
                            <div className='w-30 h-30 overflow-hidden'>
                            <img src={`http://localhost:3001/${item.images}`} className='w-full h-auto object-cover' />
                            </div>

                            <div>
                                <p className='text-xs text-[#40ba37] font-normal'> {new Date(item.create_at).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}</p>
                                <p className='text-lg font-semibold text-black cursor-pointer'>{item.recipe_name_eng}</p>
                                <p className='my-1'>{item.reviews[0]?.rating}</p>
                                <p className='text-xs font-normal'>{item.reviews[0]?.review}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default RecipeList