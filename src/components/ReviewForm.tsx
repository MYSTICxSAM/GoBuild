import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ReviewFormProps {
  onClose: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onClose }) => {
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewStars, setReviewStars] = useState(0);

  const handleSubmitReview = async () => {
    if (!reviewName || !reviewText) {
      alert('Please fill all fields.');
      return;
    }

    try {
      const { error } = await supabase
        .from('Review')
        .insert({
          'Customer Name': reviewName,
          'Customer Review': reviewText,
          'Rating': reviewStars,
        });

      if (error) {
        console.error('Error submitting Review:', error);
        alert('Failed to submit review.');
        return;
      }

      alert('Review submitted successfully!');
      onClose(); // close popup after success
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold leading-none"
        >
          &times;
        </button>
        <input
          type="text"
          className="border border-gray-300 rounded p-3 w-full mb-4 focus:outline-blue-500"
          placeholder="Your Name"
          value={reviewName}
          onChange={(e) => setReviewName(e.target.value)}
        />
        <textarea
          className="border border-gray-300 rounded p-3 resize-none w-full h-24 mb-4 focus:outline-blue-500"
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                onClick={() => setReviewStars(star)}
                xmlns="http://www.w3.org/2000/svg"
                fill={star <= reviewStars ? "yellow" : "none"}
                stroke="black"
                strokeWidth={0.5}
                className="w-6 h-6 cursor-pointer"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.904a1 1 0 00.95.69h4.105c.969 0 1.371 1.24.588 1.81l-3.3 2.4a1 1 0 00-.364 1.118l1.286 3.904c.3.92-.755 1.688-1.54 1.118l-3.3-2.4a1 1 0 00-1.176 0l-3.3 2.4c-.784.57-1.838-.197-1.54-1.118l1.286-3.904a1 1 0 00-.363-1.118L2.17 9.43c-.783-.57-.38-1.81.588-1.81h4.106a1 1 0 00.95-.69l1.286-3.904z" />
              </svg>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmitReview}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
