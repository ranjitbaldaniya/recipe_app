import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { RecipeDetailsResponse } from '../../../types/recepeTypes';
import { useFetch } from '../../../hooks/useFetch';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';

const RecipeDetails: React.FC = () => {
  const param = useParams();
  const url = `http://localhost:3001/recipe/details/${param.id}`;
  const { data, loading, error, refetch } =
    useFetch<RecipeDetailsResponse>(url);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [reviewToEdit, setReviewToEdit] = useState<string | null>(null);
  const userString:any = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const userId = user.id;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const averageRating =
    data?.reviews?.reduce((acc, review) => acc + Number(review.rating), 0)! /
    data?.reviews?.length!;

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
      if (editMode && reviewToEdit) {
        await axios.put(`http://localhost:3001/review/${reviewToEdit}`, {
          user_id: userId,
          recipe_id: data?.recipe._id,
          rating,
          review: comment,
        });
        console.log('Review updated successfully');
        // After update, handle edit mode reset
        setEditMode(false); // Reset edit mode after successful update
        setReviewToEdit(null);
      } else {
        await axios.post('http://localhost:3001/review', {
          user_id: userId,
          recipe_id: data?.recipe._id,
          rating,
          review: comment,
          approved: false, // Set to false to indicate it needs approval
        });
        console.log('New review added successfully');
      }
      // Clear input fields and stop submitting state
      setRating(null);
      setComment('');
      setSubmitting(false);
      refetch(); // Refresh reviews
    } catch (err) {
      console.error('Error submitting review:', err);
      setSubmitting(false);
    }
  };
  const handleEditReview = (
    reviewId: string,
    existingRating: number,
    existingComment: string,
  ) => {
    setEditMode(true);
    setReviewToEdit(reviewId);
    setRating(existingRating);
    setComment(existingComment);
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await axios.delete(`http://localhost:3001/review/${reviewId}`);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const approvedReviews = data?.reviews.filter((review) => review.approved);

  const reviewsToShow = showAllReviews
    ? approvedReviews
    : approvedReviews?.slice(0, 3);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-20 bg-white">
        <img
          src={`http://localhost:3001/${data?.recipe.images}`}
          alt="Recipe Banner"
          className="w-full h-auto mb-6"
        />
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3">
            <div className="recipe-headline my-5">
              <span className="text-m block text-gray-500 mb-0 ">
                <p className="text-xs text-[#40ba37] font-normal">
                  {new Date(data?.recipe?.create_at!).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    },
                  )}
                </p>
              </span>
              <h2 className="text-4xl font-bold text-[#474747] mb-8">
                {data?.recipe.recipe_name_eng}
              </h2>
              <div className="recipe-duration border-l-4 border-[#1c8314] pl-4 py-3">
                <h6 className="text-sm mb-2 text-black font-bold text-[16px]">
                  Prep: {data?.recipe.preparation_time}
                </h6>
                <h6 className="text-sm mb-2 text-black font-bold text-[16px]">
                  Cook: {data?.recipe.cooking_time}
                </h6>
                <h6 className="text-sm text-black font-bold text-[16px]">
                  Yields: {data?.recipe.num_of_people_to_served} Servings
                </h6>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 flex flex-col items-end">
            <div className="ratings flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={
                    star <= Math.round(averageRating) ? faStar : faStarEmpty
                  }
                  className="text-yellow-500"
                />
              ))}
            </div>
            <div className="recipe-ratings text-right my-5">
              <a
                href="#"
                className="mt-4 inline-block min-w-[160px] h-[60px] text-white border-l-4 border-[#1c8314] rounded-none px-[30px] text-lg leading-[58px] font-semibold transition duration-500 capitalize bg-green-500"
              >
                For {data?.recipe.difficulty_level}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap mt-10">
          <div className="w-full lg:w-2/3 mb-8 lg:mb-0">
            <div className="single-preparation-step flex mb-12">
              <div
                className="prose prose-sm text-[#474747]"
                dangerouslySetInnerHTML={{
                  __html: data?.recipe.recipe_steps_eng!,
                }}
              />
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="ingredients">
              <h4 className="text-gray-700 mb-8 text-[#474747] text-[1.5rem] font-bold">
                Ingredients
              </h4>
              <div
                className="prose prose-sm text-[#474747]"
                dangerouslySetInnerHTML={{
                  __html: data?.recipe.ingredients_eng!,
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full lg:w-2/3 mb-8 lg:mb-0">
            <h2 className="text-xl font-semibold mb-2 text-[#474747]">
              Submit Your Review
            </h2>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={star <= (rating || 0) ? faStar : faStarEmpty}
                  className="text-yellow-500 cursor-pointer ml-2"
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
                {submitting ? 'Submitting...' : editMode ? 'Update' : 'Submit'}
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            {reviewsToShow?.map((review) => (
              <div
                key={review._id}
                className="mb-4 p-4 bg-white rounded-lg shadow-lg"
              >
                <div className="p-2 bg-gray-100">
                  <h3 className="text-lg font-semibold text-[#474747]">
                    {review.user_id ? review.user_id!.user_name! : '' }
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
                  <div className="flex justify-end gap-2">
                    {userId == review.user_id!._id! ?
                    <>
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                      onClick={() =>
                        handleEditReview(
                          review._id,
                          review.rating,
                          review.review,
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded-lg"
                      onClick={() => handleDeleteReview(review._id)}
                    >
                      Delete
                    </button>
                    </>
                    : '' }
                  </div>
                </div>
              </div>
            ))}

            {!showAllReviews && approvedReviews?.length! > 3 && (
              <button
                className="mt-4 px-6 py-2 bg-[#1c8314] text-white font-bold rounded-lg"
                onClick={() => setShowAllReviews(true)}
              >
                Load More Reviews
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;