import axios from 'axios'
import item2 from '../../images/bg-img/sr2.jpg'
import item3 from '../../images/bg-img/sr3.jpg'
import item4 from '../../images/bg-img/sr4.jpg'
import item5 from '../../images/bg-img/sr5.jpg'
import item6 from '../../images/bg-img/sr6.jpg'
import item7 from '../../images/bg-img/sr7.jpg'
import item8 from '../../images/bg-img/sr8.jpg'
import item9 from '../../images/bg-img/sr9.jpg'
import { useEffect, useState } from 'react'


const RecipeList = () => {
    const [recipe, setRecipe] = useState<any>();

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
                <div className="grid grid-cols-3 gap-10">
                    {recipe?.map((item: any) => (
                        <div className='flex gap-4'>
                            <div className='w-30 h-30 overflow-hidden'>
                                <img src={item.images} className='w-full h-auto object-cover' />

                            </div>

                            <div>
                                <p className='text-xs text-[#40ba37] font-normal'> {new Date(item.create_at).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}</p>
                                <p className='text-lg font-semibold text-black cursor-pointer'>{item.recipe_name_eng}</p>
                                <p className='my-1'>Ratings</p>
                                <p className='text-xs font-normal'>2 Comments</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default RecipeList