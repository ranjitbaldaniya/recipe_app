import React from 'react';

interface IFormInput {
  recipe_name_eng: string;
  recipe_name_hindi?: string;
  recipe_name_guj?: string;
  ingredients_eng: string;
  ingredients_hindi?: string;
  ingredients_guj?: string;
  recipe_steps_eng: string;
  recipe_steps_hindi?: string;
  recipe_steps_guj?: string;
  category: string;
  num_of_people_to_served: number;
  images: string;
  video_url?: string;
}


const AddRecipe: React.FC = () => {


  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Recipe</h2>
      <form  className="space-y-4 ps-20 pe-20">
        <div>
          <label className="block text-gray-700">Recipe Name (English)</label>
          <input 
            type="text" 
            // {...register('recipe_name_eng')} 
            className="w-full border rounded p-2"
          />
          {/* {errors.recipe_name_eng && <p className="text-red-500">{errors.recipe_name_eng.message}</p>} */}
        </div>

        <div>
          <label className="block text-gray-700">Recipe Name (Hindi)</label>
          <input 
            type="text" 
            // {...register('recipe_name_hindi')} 
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700">Recipe Name (Gujarati)</label>
          <input 
            type="text" 
            // {...register('recipe_name_guj')} 
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700">Ingredients (English)</label>
          <textarea 
            // {...register('ingredients_eng')} 
            className="w-full border rounded p-2"
          ></textarea>
          {/* {errors.ingredients_eng && <p className="text-red-500">{errors.ingredients_eng.message}</p>} */}
        </div>

        <div>
          <label className="block text-gray-700">Ingredients (Hindi)</label>
          <textarea 
            // {...register('ingredients_hindi')} 
            className="w-full border rounded p-2"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700">Ingredients (Gujarati)</label>
          <textarea 
            // {...register('ingredients_guj')} 
            className="w-full border rounded p-2"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700">Recipe Steps (English)</label>
          <textarea 
            // {...register('recipe_steps_eng')} 
            className="w-full border rounded p-2"
          ></textarea>
          {/* {errors.recipe_steps_eng && <p className="text-red-500">{errors.recipe_steps_eng.message}</p>} */}
        </div>

        <div>
          <label className="block text-gray-700">Recipe Steps (Hindi)</label>
          <textarea 
            // {...register('recipe_steps_hindi')} 
            className="w-full border rounded p-2"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700">Recipe Steps (Gujarati)</label>
          <textarea 
            // {...register('recipe_steps_guj')} 
            className="w-full border rounded p-2"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700">Category</label>
          <input 
            type="text" 
            // {...register('category')} 
            className="w-full border rounded p-2"
          />
          {/* {errors.category && <p className="text-red-500">{errors.category.message}</p>} */}
        </div>

        <div>
          <label className="block text-gray-700">Number of People to be Served</label>
          <input 
            type="number" 
            // {...register('num_of_people_to_served')} 
            className="w-full border rounded p-2"
          />
          {/* {errors.num_of_people_to_served && <p className="text-red-500">{errors.num_of_people_to_served.message}</p>} */}
        </div>

        <div>
          <label className="block text-gray-700">Image URL</label>
          <input 
            type="text" 
            // {...register('images')} 
            className="w-full border rounded p-2"
          />
          {/* {errors.images && <p className="text-red-500">{errors.images.message}</p>} */}
        </div>

        <div>
          <label className="block text-gray-700">Video URL</label>
          <input 
            type="text" 
            // {...register('video_url')} 
            className="w-full border rounded p-2"
          />
          {/* {errors.video_url && <p className="text-red-500">{errors.video_url.message}</p>} */}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Recipe</button>
      </form>
    </>
  );
};

export default AddRecipe;
