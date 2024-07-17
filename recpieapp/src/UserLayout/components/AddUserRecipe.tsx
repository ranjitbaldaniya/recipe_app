import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuth } from '../../hooks/useAuth';
import SwitcherTwo from '../../components/Switchers/SwitcherTwo';
import { useLocation } from 'react-router-dom';

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
  cooking_time: string;
  preparation_time: string;
  difficulty_level: string;
  images: File | null;
  video_url?: string;
  status?: boolean;
  approved?: boolean;
}

interface Category {
  _id: string;
  name: string;
  status: boolean;
  subcategories: Category[];
}

const AddUserRecipe: React.FC = () => {
  const { token, user } = useAuth();
  const { state } = useLocation();
  const recipe = state?.recipe;
  const [activeTab, setActiveTab] = useState<'eng' | 'hindi' | 'guj'>('eng');
  const [status, setStatus] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formValues, setFormValues] = useState<IFormInput>({
    recipe_name_eng: '',
    ingredients_eng: '',
    recipe_steps_eng: '',
    recipe_name_hindi: '',
    ingredients_hindi: '',
    recipe_steps_hindi: '',
    recipe_name_guj: '',
    ingredients_guj: '',
    recipe_steps_guj: '',
    category: '',
    num_of_people_to_served: 0,
    cooking_time: '',
    preparation_time: '',
    difficulty_level: '',
    images: null,
    video_url: '',
    status: true,
    approved: true,
  });

  useEffect(() => {
    if (recipe) {
      setFormValues({
        recipe_name_eng: recipe.recipe_name_eng || '',
        ingredients_eng: recipe.ingredients_eng || '',
        recipe_steps_eng: recipe.recipe_steps_eng || '',
        recipe_name_hindi: recipe.recipe_name_hindi || '',
        ingredients_hindi: recipe.ingredients_hindi || '',
        recipe_steps_hindi: recipe.recipe_steps_hindi || '',
        recipe_name_guj: recipe.recipe_name_guj || '',
        ingredients_guj: recipe.ingredients_guj || '',
        recipe_steps_guj: recipe.recipe_steps_guj || '',
        category: recipe.category || '',
        num_of_people_to_served: recipe.num_of_people_to_served || 0,
        cooking_time: recipe.cooking_time || '',
        preparation_time: recipe.preparation_time || '',
        difficulty_level: recipe.difficulty_level || '',
        images: null,
        video_url: recipe.video_url || '',
        status: recipe.status || true,
        approved: recipe.approved || true,
      });
    }
  }, [recipe]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>(
        'http://localhost:3001/category',
      );
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('recipe_name_eng', formValues.recipe_name_eng);
      formData.append('ingredients_eng', formValues.ingredients_eng);
      formData.append('recipe_steps_eng', formValues.recipe_steps_eng);

      formData.append('recipe_name_hindi', formValues.recipe_name_hindi!);
      formData.append('ingredients_hindi', formValues.ingredients_hindi!);
      formData.append('recipe_steps_hindi', formValues.recipe_steps_hindi!);

      formData.append('recipe_name_guj', formValues.recipe_name_guj!);
      formData.append('ingredients_guj', formValues.ingredients_guj!);
      formData.append('recipe_steps_guj', formValues.recipe_steps_guj!);

      formData.append('category', formValues.category);
      formData.append(
        'num_of_people_to_served',
        formValues.num_of_people_to_served.toString(),
      );
      formData.append('cooking_time', formValues.cooking_time);
      formData.append('preparation_time', formValues.preparation_time);
      formData.append('difficulty_level', formValues.difficulty_level);
      formData.append('status', status as any);
      formData.append('create_by', user!.id);
      formData.append('approved', formValues.approved as any);

      if (formValues.images) {
        formData.append('images', formValues.images);
      }

      const response = await axios.post(
        'http://localhost:3001/recipe',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Recipe added successfully:', response.data);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };


  const getEditUserRecipes = async () => {
    if (recipe) {
      const recipeId = recipe._id; // Assuming recipe._id exists in your state
      try {
        const response = await axios.get(
          `http://localhost:3001/recipe/${recipeId}`
        );
        const fetchedRecipe = response.data; // Assuming response.data contains the full recipe object
        setFormValues({
          recipe_name_eng: fetchedRecipe.recipe_name_eng || '',
          ingredients_eng: fetchedRecipe.ingredients_eng || '',
          recipe_steps_eng: fetchedRecipe.recipe_steps_eng || '',
          recipe_name_hindi: fetchedRecipe.recipe_name_hindi || '',
          ingredients_hindi: fetchedRecipe.ingredients_hindi || '',
          recipe_steps_hindi: fetchedRecipe.recipe_steps_hindi || '',
          recipe_name_guj: fetchedRecipe.recipe_name_guj || '',
          ingredients_guj: fetchedRecipe.ingredients_guj || '',
          recipe_steps_guj: fetchedRecipe.recipe_steps_guj || '',
          category: fetchedRecipe.category || '',
          num_of_people_to_served: fetchedRecipe.num_of_people_to_served || 0,
          cooking_time: fetchedRecipe.cooking_time || '',
          preparation_time: fetchedRecipe.preparation_time || '',
          difficulty_level: fetchedRecipe.difficulty_level || '',
          images: null, // You might want to handle images separately
          video_url: fetchedRecipe.video_url || '',
          status: fetchedRecipe.status || true,
          approved: fetchedRecipe.approved || true,
        });
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
  };
  

  useEffect(() => {
    getEditUserRecipes();
  }, []);
  
  const handleUpdateSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const id = recipe._id;
      // Update the recipe
      const response = await axios.put(`http://localhost:3001/recipe/${id}`, formValues, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
  console.log(formValues)
        console.log('Recipe updated successfully:', response.data); // Check updated data here
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };
  
  
  
  

 
  const handleInputChange = (
    key: keyof IFormInput,
    value: string | number | boolean | File | null,
  ) => {
    setFormValues({
      ...formValues,
      [key]: value,
    });
  };

  const renderCategoryOptions = (categories: Category[], depth = 0) => {
    return categories.map((category) => (
      <React.Fragment key={category._id}>
        <option value={category._id} className="text-blue-900">
          {'- '.repeat(depth) + category.name}
        </option>
        {category.subcategories.length > 0 &&
          renderCategoryOptions(category.subcategories, depth + 1)}
      </React.Fragment>
    ));
  };

  // const getEditUserRecipes = async () => {
  //   if (recipes) {
  //     const recipeId = recipes[0]._id;
  //     console.log("first",recipeId)
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3001/recipe/${recipeId}`
  //       );
  //       console.log('response', response);
  //       setRecipes(response.data.recipes);
  //     } catch (error) {
  //       console.error('Error fetching recipes:', error);
  //     }
  //   }
  // };


  return (
    <div className="bg-white">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
      {recipe ? 'Update Recipe' : 'Add New Recipe'}  
      </h2>
      <form className="space-y-4 ps-20 pe-20" onSubmit={recipe ? handleUpdateSubmit : handleAddSubmit}>
        <div>
          <label className="block text-blue-900 font-bold">Category</label>
          <select
            value={formValues.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full border rounded p-2"
          >
            <option className="text-blue-900" value="">
              Select Category
            </option>
            {renderCategoryOptions(categories)}
          </select>
        </div>

        <div className="mb-4">
          <div className="flex justify-center space-x-4 mb-4 ">
            <button
              type="button"
              className={`py-2 px-4 ${
                activeTab === 'eng'
                  ? 'bg-blue-500 text-white '
                  : 'bg-gray-300 text-blue-900 font-bold'
              } rounded`}
              onClick={() => setActiveTab('eng')}
            >
              English
            </button>
            <button
              type="button"
              className={`py-2 px-4 ${
                activeTab === 'hindi'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-blue-900 font-bold'
              } rounded`}
              onClick={() => setActiveTab('hindi')}
            >
              Hindi
            </button>
            <button
              type="button"
              className={`py-2 px-4 ${
                activeTab === 'guj'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-blue-900 font-bold'
              } rounded`}
              onClick={() => setActiveTab('guj')}
            >
              Gujarati
            </button>
          </div>
          {activeTab === 'eng' && (
            <div className="border p-5 rounded">
              <div>
                <label className="block text-blue-900 font-bold">
                  Recipe Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  placeholder="Add recipe name in english"
                  value={formValues.recipe_name_eng}
                  onChange={(e) =>
                    handleInputChange('recipe_name_eng', e.target.value)
                  }
                />
              </div>
              <div className="mt-2">
                <label className="block text-blue-900 font-bold">
                  Ingredients
                </label>
                <ReactQuill
                  value={formValues.ingredients_eng}
                  onChange={(value) =>
                    handleInputChange('ingredients_eng', value)
                  }
                />
              </div>
              <div className="mt-2">
                <label className="block text-blue-900 font-bold">
                  Recipe Steps
                </label>
                <ReactQuill
                  value={formValues.recipe_steps_eng}
                  onChange={(value) =>
                    handleInputChange('recipe_steps_eng', value)
                  }
                />
              </div>
            </div>
          )}
          {activeTab === 'hindi' && (
            <div className="border p-5 rounded">
              <div>
                <label className="block text-blue-900 font-bold">
                  Recipe Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  placeholder="Add recipe name in hindi"
                  value={formValues.recipe_name_hindi}
                  onChange={(e) =>
                    handleInputChange('recipe_name_hindi', e.target.value)
                  }
                />
              </div>
              <div className="mt-2">
                <label className="block text-blue-900 font-bold">
                  Ingredients
                </label>
                <ReactQuill
                  value={formValues.ingredients_hindi}
                  onChange={(value) =>
                    handleInputChange('ingredients_hindi', value)
                  }
                />
              </div>
              <div className="mt-2">
                <label className="block text-blue-900 font-bold">
                  Recipe Steps
                </label>
                <ReactQuill
                  value={formValues.recipe_steps_hindi}
                  onChange={(value) =>
                    handleInputChange('recipe_steps_hindi', value)
                  }
                />
              </div>
            </div>
          )}
          {activeTab === 'guj' && (
            <div className="border p-5 rounded">
              <div>
                <label className="block text-blue-900 font-bold">
                  Recipe Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  placeholder="Add recipe name in gujrati"
                  value={formValues.recipe_name_guj}
                  onChange={(e) =>
                    handleInputChange('recipe_name_guj', e.target.value)
                  }
                />
              </div>
              <div className="mt-2">
                <label className="block text-blue-900 font-bold">
                  Ingredients
                </label>
                <ReactQuill
                  value={formValues.ingredients_guj}
                  onChange={(value) =>
                    handleInputChange('ingredients_guj', value)
                  }
                />
              </div>
              <div className="mt-2">
                <label className="block text-blue-900 font-bold">
                  Recipe Steps
                </label>
                <ReactQuill
                  value={formValues.recipe_steps_guj}
                  onChange={(value) =>
                    handleInputChange('recipe_steps_guj', value)
                  }
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-blue-900 font-bold">
              Number of People to Serve
            </label>
            <input
              type="number"
              className="w-full border rounded p-2"
              value={formValues.num_of_people_to_served}
              onChange={(e) =>
                handleInputChange(
                  'num_of_people_to_served',
                  Number(e.target.value),
                )
              }
            />
          </div>
          <div>
            <label className="block text-blue-900 font-bold">
              Cooking Time
            </label>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Ex - 20 min"
              value={formValues.cooking_time}
              onChange={(e) =>
                handleInputChange('cooking_time', e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-blue-900 font-bold">
              Preparation Time
            </label>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Ex - 1 hr 20 min"
              value={formValues.preparation_time}
              onChange={(e) =>
                handleInputChange('preparation_time', e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-blue-900 font-bold">
              Difficulty Level
            </label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={formValues.difficulty_level}
              placeholder="Ex - For Begginers"
              onChange={(e) =>
                handleInputChange('difficulty_level', e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-blue-900 font-bold">Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded p-2"
              onChange={(e) =>
                handleInputChange(
                  'images',
                  e.target.files ? e.target.files[0] : null,
                )
              }
            />
          </div>
          <div>
            <label className="block text-blue-900 font-bold">Video URL</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Add your video url"
              value={formValues.video_url}
              onChange={(e) => handleInputChange('video_url', e.target.value)}
            />
          </div>
        </div>

        <div className=" mt-4">
          <label className="block text-blue-900 font-bold">Status</label>
          <SwitcherTwo status={status} setStatus={setStatus} />
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-600 font-bold"
          >
                  {recipe ? 'Update Recipe' : 'Add Recipe'}  
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserRecipe;
