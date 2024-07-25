import { useEffect, useState } from 'react';
import axios from 'axios';
import { FcApproval } from 'react-icons/fc';
import { RxCross2 } from 'react-icons/rx';

interface AdminReview {
  _id: string;
  user_id: string;
  recipe_id: string;
  rating: number;
  review: string;
  approved: boolean;
}

const AdminReviews = () => {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get('http://localhost:3001/admin/pending');
      setReviews(response.data);
    };

    fetchReviews();
  }, []);

  const handleApprove = async (id: number) => {
    await axios.put(`http://localhost:3001/admin/approve/${id}`);
    setReviews(reviews.filter((review: any) => review._id !== id));
  };

  const handleReject = async (id: number) => {
    await axios.delete(`http://localhost:3001/admin/reject/${id}`);
    setReviews(reviews.filter((review: any) => review._id !== id));
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
              <th className="py-3 px-4">Review</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews?.map((review: any) => (
              <tr key={review._id}>
                <td className="py-4 px-4 text-gray-800">{review.review}</td>
                <td className="py-4 px-4 text-gray-800">
                  <div className="flex gap-2">
                    <FcApproval
                      onClick={() => handleApprove(review._id)}
                      className="cursor-pointer"
                      size={32}
                    />
                    <RxCross2
                      onClick={() => handleReject(review._id)}
                      className="cursor-pointer bg-red-500 rounded-2xl text-white border-dotted border-2 border-red-300 mt-1"
                      size={25}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReviews;
