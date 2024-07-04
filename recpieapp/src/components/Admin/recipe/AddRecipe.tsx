import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../hooks/useAuth';
import SwitcherTwo from '../../Switchers/SwitcherTwo';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles for the text editor

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
  images: File | null;
  video_url?: string;
  status?: boolean;
}

interface Category {
  _id: string;
  name: string;
  status: boolean;
  subcategories: Category[];
}

const AddRecipe: React.FC = () => {
  const { token , user} = useAuth();
  const [activeTab, setActiveTab] = useState<'eng' | 'hindi' | 'guj'>('eng');
  const [status, setStatus] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formValues, setFormValues] = useState<IFormInput>({
    recipe_name_eng: '',
    ingredients_eng: '',
    recipe_steps_eng: '',
    category: '',
    num_of_people_to_served: 0,
    images: null,
    video_url: '',
    status: false,
  });
console.log("user ==>" , user)
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>('http://localhost:3001/category');
      setCategories(response.data); // Assuming response.data is an array of categories {_id, name, subcategories}
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log("formvalue ==>" , formValues)
      const formData = new FormData();
      formData.append('recipe_name_eng', formValues.recipe_name_eng);
      formData.append('ingredients_eng', formValues.ingredients_eng);
      formData.append('recipe_steps_eng', formValues.recipe_steps_eng);
      formData.append('category', formValues.category);
      formData.append('num_of_people_to_served', formValues.num_of_people_to_served);
      formData.append('status', status);
      formData.append('create_by', user.id);

      if (formValues.images) {
        formData.append('images', formValues.images); 
      }

      const response = await axios.post('http://localhost:3001/recipe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Recipe added successfully:', response.data);
      // Optionally, redirect or show success message
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const handleInputChange = (key: keyof IFormInput, value: string | number | boolean | File | null) => {
    setFormValues({
      ...formValues,
      [key]: value,
    });
  };

  const renderCategoryOptions = (categories: Category[], depth = 0) => {
    return categories.map((category) => (
      <React.Fragment key={category._id}>
        <option value={category._id}>
          {'- '.repeat(depth) + category.name}
        </option>
        {category.subcategories.length > 0 &&
          renderCategoryOptions(category.subcategories, depth + 1)}
      </React.Fragment>
    ));
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Recipe</h2>
      <form className="space-y-4 ps-20 pe-20" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700">Category</label>
          <select
            value={formValues.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Select Category</option>
            {renderCategoryOptions(categories)}
          </select>
        </div>

        <div className="mb-4">
          <div className="flex border-b">
            <button
              type="button"
              onClick={() => setActiveTab('eng')}
              className={`px-4 py-2 focus:outline-none ${activeTab === 'eng' ? 'border-b-2 border-blue-500' : ''}`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('hindi')}
              className={`px-4 py-2 focus:outline-none ${activeTab === 'hindi' ? 'border-b-2 border-blue-500' : ''}`}
            >
              Hindi
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('guj')}
              className={`px-4 py-2 focus:outline-none ${activeTab === 'guj' ? 'border-b-2 border-blue-500' : ''}`}
            >
              Gujarati
            </button>
          </div>
          <div className="p-4 border">
            {activeTab === 'eng' && (
              <>
                <div>
                  <label className="block text-gray-700">Recipe Name (English)</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                    value={formValues.recipe_name_eng}
                    onChange={(e) => handleInputChange('recipe_name_eng', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Ingredients (English)</label>
                  <ReactQuill
                    theme="snow"
                    value={formValues.ingredients_eng}
                    onChange={(value) => handleInputChange('ingredients_eng', value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Recipe Steps (English)</label>
                  <ReactQuill
                    theme="snow"
                    value={formValues.recipe_steps_eng}
                    onChange={(value) => handleInputChange('recipe_steps_eng', value)}
                  />
                </div>
              </>
            )}
            {activeTab === 'hindi' && (
              <>
                <div>
                  <label className="block text-gray-700">Recipe Name (Hindi)</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                    value={formValues.recipe_name_hindi}
                    onChange={(e) => handleInputChange('recipe_name_hindi', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Ingredients (Hindi)</label>
                  <ReactQuill
                    theme="snow"
                    value={formValues.ingredients_hindi}
                    onChange={(value) => handleInputChange('ingredients_hindi', value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Recipe Steps (Hindi)</label>
                  <ReactQuill
                    theme="snow"
                    value={formValues.recipe_steps_hindi}
                    onChange={(value) => handleInputChange('recipe_steps_hindi', value)}
                  />
                </div>
              </>
            )}
            {activeTab === 'guj' && (
              <>
                <div>
                  <label className="block text-gray-700">Recipe Name (Gujarati)</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                    value={formValues.recipe_name_guj}
                    onChange={(e) => handleInputChange('recipe_name_guj', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Ingredients (Gujarati)</label>
                  <ReactQuill
                    theme="snow"
                    value={formValues.ingredients_guj}
                    onChange={(value) => handleInputChange('ingredients_guj', value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Recipe Steps (Gujarati)</label>
                  <ReactQuill
                    theme="snow"
                    value={formValues.recipe_steps_guj}
                    onChange={(value) => handleInputChange('recipe_steps_guj', value)}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div>
          <label className="block text-gray-700">Number of People to be Served</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={formValues.num_of_people_to_served}
            onChange={(e) => handleInputChange('num_of_people_to_served', +e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700">Images</label>
          <input
            type="file"
            className="w-full border rounded p-2"
            onChange={(e) => handleInputChange('images', e.target.files ? e.target.files[0] : null)}
          />
        </div>

        <div>
          <label className="block text-gray-700">Video URL</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={formValues.video_url}
            onChange={(e) => handleInputChange('video_url', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700">Status</label>
          <SwitcherTwo onChange={(checked) => setStatus(checked)} checked={status} />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Recipe
        </button>
      </form>
    </>
  );
};

export default AddRecipe;
