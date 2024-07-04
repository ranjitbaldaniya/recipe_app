import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { RecipeDetailsResponse } from '../../../types/recepeTypes';
import { useFetch } from '../../../hooks/useFetch';
import axios from 'axios';
import { useAuth } from '../../../hooks/useAuth';

const RecipeDetails: React.FC = () => {
  const url = 'http://localhost:3001/recipe/details/6683de580debc75f2826ae48';
  const {user} = useAuth()
  const { data, loading, error, refetch } = useFetch<RecipeDetailsResponse>(url);
console.log("user ==>" , user)
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const averageRating =
    data?.reviews.reduce((acc, review) => acc + Number(review.rating), 0) /
    data?.reviews.length;

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmitReview = async () => {
    if (!rating || !comment) {
      alert('Please provide both a rating and a comment.');
      return;
    }

    try {
      setSubmitting(true);
      await axios.post('http://localhost:3001/review/create', {
        user_id: user?.id, // Replace with actual user ID
        recipe_id: data?.recipe._id,
        rating,
        review: comment,
      });
      setRating(null);
      setComment('');
      setSubmitting(false);
      // refetch(); // Refetch data to include the new review
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  const reviewsToShow = showAllReviews ? data?.reviews : data?.reviews.slice(0, 3);

  return (
    <div className="container mx-auto p-4">
      <img
        src={`http://localhost:3001/${data?.recipe.images}`}
        alt="Recipe Banner"
        className="w-full h-auto mb-6 rounded-lg shadow-lg"
      />
      <h1 className="text-2xl font-bold mb-4 text-[#474747]">
        Recipe Name :- {data?.recipe.recipe_name_eng}
      </h1>
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row md:space-x-6 justify-between p-4 mb-5">
        <div>
          <p className="text-[#474747]">
            <strong>Number of people to serve:</strong>{' '}
            {data?.recipe.num_of_people_to_served}
          </p>
        </div>

        <div>
          <p className="mb-2 text-[#474747]">
            <strong>Average Rating:</strong>{' '}
            {averageRating ? averageRating.toFixed(1) : 'No ratings yet'}
          </p>
          <p className="text-[#474747]">
            <strong>Total Reviews:</strong> {data?.reviews.length}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="flex-1 p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2 text-[#474747]">
            Ingredients
          </h2>
          <div
            className="prose prose-sm text-[#474747]"
            dangerouslySetInnerHTML={{ __html: data?.recipe.ingredients_eng }}
          />
        </div>
        <div className="flex-1 p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2 text-[#474747]">Steps</h2>
          <div
            className="prose prose-sm text-[#474747]"
            dangerouslySetInnerHTML={{ __html: data?.recipe.recipe_steps_eng }}
          />
        </div>
      </div>
      <h2 className="text-xl font-semibold mt-6 mb-4 text-[#474747]">
        Reviews
      </h2>
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="flex-1">
          {reviewsToShow?.map((review) => (
            <div
              key={review._id}
              className="mb-4 p-4 bg-white rounded-lg shadow-lg"
            >
              <div className="p-2 bg-gray-100">
                <h3 className="text-lg font-semibold text-[#474747]">
                  {review.user_id.user_name}
                </h3>
                <p>
                  {Array.from({ length: 5 }, (_, index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon={index < review.rating ? faStar : faStarEmpty}
                      className="text-yellow-500"
                    />
                  ))}
                </p>
                <p className="text-[#474747]">{review.review}</p>
              </div>
            </div>
          ))}
          {!showAllReviews && data?.reviews.length > 3 && (
            <button
              className="mt-4 px-6 py-2 bg-[#1c8314] text-white font-bold rounded-lg"
              onClick={() => setShowAllReviews(true)}
            >
              Load More Reviews
            </button>
          )}
        </div>
        <div className="flex-1 p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2 text-[#474747]">
            Submit Your Review
          </h2>
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesomeIcon
                key={star}
                icon={star <= (rating || 0) ? faStar : faStarEmpty}
                className="text-yellow-500 cursor-pointer"
                onClick={() => handleRatingChange(star)}
              />
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment"
            rows={4}
            className="w-full mt-4 p-2 border rounded-lg"
          />
          <div className="text-center">
            <button
              className="mt-4 px-6 py-2 bg-[#1c8314] text-white font-bold rounded-lg"
              onClick={handleSubmitReview}
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
