import React, { useState } from 'react';
import SwitcherTwo from '../../Switchers/SwitcherTwo';
import 'react-quill/dist/quill.snow.css'; // Import styles for the text editor
import ReactQuill from 'react-quill';

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
  status?: boolean;
}

const AddRecipe: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'eng' | 'hindi' | 'guj'>('eng');
  const [status, setStatus] = useState(false);

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Recipe</h2>
      <form className="space-y-4 ps-20 pe-20">
        <div>
          <label className="block text-gray-700">Category</label>
          <input 
            type="text" 
            className="w-full border rounded p-2"
          />
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
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Ingredients (English)</label>
                  <ReactQuill theme="snow" />
                </div>
                <div>
                  <label className="block text-gray-700">Recipe Steps (English)</label>
                  <ReactQuill theme="snow" />
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
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Ingredients (Hindi)</label>
                  <ReactQuill theme="snow" />
                </div>
                <div>
                  <label className="block text-gray-700">Recipe Steps (Hindi)</label>
                  <ReactQuill theme="snow" />
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
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Ingredients (Gujarati)</label>
                  <ReactQuill theme="snow" />
                </div>
                <div>
                  <label className="block text-gray-700">Recipe Steps (Gujarati)</label>
                  <ReactQuill theme="snow" />
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
          />
        </div>

        <div>
          <label className="block text-gray-700">Image</label>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
           
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">Attach file</label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-gray-700">Video URL</label>
          <input 
            type="text" 
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700">Status</label>
          <SwitcherTwo />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Recipe</button>
      </form>
    </>
  );
};

export default AddRecipe;
