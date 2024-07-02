import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../hooks/useAuth';

interface Category {
  _id: string;
  name: string;
  status: boolean;
  subcategories: Category[];
}

const ListCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, token } = useAuth();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/category');
      setCategories(response.data);
      setLoading(false);
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.put(
          `http://localhost:3001/category/soft-delete/${id}`,
          { userId: user.id },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        fetchCategories();
      } catch (error) {
        console.error('Error soft deleting category:', error);
      }
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/add-category/${id}`);
  };

  if (loading) return <div>Loading...</div>;

  const renderCategories = (categories: Category[], depth = 0) => {
    return categories.map((category) => (
      <div key={category._id} style={{ marginLeft: depth * 20 }}>
        <div className="flex justify-between items-center p-2">
          <div className="border-b border-gray-300">
            {category.name} - Status: {category.status ? 'Active' : 'Inactive'}
          </div>
          <div>
            <button
              className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded"
              onClick={() => handleEdit(category._id)}
            >
              Edit
            </button>
            <button
              className="px-2 py-1 bg-red-500 text-white rounded"
              onClick={() => handleDelete(category._id)}
            >
              Delete
            </button>
          </div>
        </div>
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="ml-4">
            {renderCategories(category.subcategories, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl">List Categories</h2>
        <Link to="/admin/add-category">
          {' '}
          <button className="mt-5 p-3 border rounded-md">Add Category</button>
        </Link>
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading categories: {error.message}</p>
        ) : (
          <div className="p-4 border rounded">
            {categories.length === 0 ? (
              <p>No categories found.</p>
            ) : (
              renderCategories(categories)
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCategory;
