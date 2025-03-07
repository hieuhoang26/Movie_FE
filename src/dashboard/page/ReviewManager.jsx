import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiCheck,
  FiX,
  FiFlag,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
// import { format } from "date-fns";

const ReviewManager = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    movieTitle: "",
    minRating: 1,
    maxRating: 5,
    status: "all",
    startDate: "",
    endDate: "",
    searchQuery: "",
    category: "",
    reportStatus: "all",
  });

  const mockReviews = [
    {
      id: 1,
      userName: "John Doe",
      movieTitle: "Inception",
      rating: 5,
      reviewText:
        "A mind-bending masterpiece that keeps you guessing until the end.",
      status: "approved",
      timestamp: new Date(2024, 0, 15),
      userAvatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
      spoilerAlert: false,
      helpful: 45,
      reported: false,
      category: "action",
    },
    {
      id: 2,
      userName: "Jane Smith",
      movieTitle: "The Dark Knight",
      rating: 4,
      reviewText: "Heath Ledger's performance as the Joker is legendary.",
      status: "pending",
      timestamp: new Date(2024, 0, 16),
      userAvatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      spoilerAlert: true,
      helpful: 32,
      reported: true,
      category: "drama",
    },
  ];

  useEffect(() => {
    setReviews(mockReviews);
    setFilteredReviews(mockReviews);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    let filtered = reviews.filter((review) => {
      const matchesTitle = review.movieTitle
        .toLowerCase()
        .includes(filters.movieTitle.toLowerCase());
      const matchesCategory =
        !filters.category || review.category === filters.category;
      const matchesStatus =
        filters.status === "all" || review.status === filters.status;
      const matchesReport =
        filters.reportStatus === "all" ||
        (filters.reportStatus === "reported"
          ? review.reported
          : !review.reported);

      return matchesTitle && matchesCategory && matchesStatus && matchesReport;
    });
    setFilteredReviews(filtered);
  };

  const handleStatusChange = (reviewId, newStatus) => {
    const updatedReviews = reviews.map((review) =>
      review.id === reviewId ? { ...review, status: newStatus } : review
    );
    setReviews(updatedReviews);
    setFilteredReviews(updatedReviews);
  };

  const handleDelete = (reviewId) => {
    const updatedReviews = reviews.filter((review) => review.id !== reviewId);
    setReviews(updatedReviews);
    setFilteredReviews(updatedReviews);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Movie Review Management
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Reviews
            </h3>
            <p className="text-3xl font-bold text-blue-600">{reviews.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700">
              Pending Reviews
            </h3>
            <p className="text-3xl font-bold text-yellow-600">
              {reviews.filter((r) => r.status === "pending").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700">
              Reported Reviews
            </h3>
            <p className="text-3xl font-bold text-red-600">
              {reviews.filter((r) => r.reported).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700">
              Average Rating
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {(
                reviews.reduce((acc, curr) => acc + curr.rating, 0) /
                  reviews.length || 0
              ).toFixed(1)}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Movie Title
              </label>
              <input
                type="text"
                name="movieTitle"
                value={filters.movieTitle}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by movie title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                <option value="action">Action</option>
                <option value="drama">Drama</option>
                <option value="comedy">Comedy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Status
              </label>
              <select
                name="reportStatus"
                value={filters.reportStatus}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Reviews</option>
                <option value="reported">Reported Only</option>
                <option value="not_reported">Not Reported</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center transform hover:scale-105 transition-transform"
            >
              <FiSearch className="mr-2" /> Search
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center transform hover:scale-105 transition-transform">
              <FiDownload className="mr-2" /> Export
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Movie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReviews.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={review.userAvatar}
                        alt={review.userName}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {review.userName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {review.movieTitle}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {review.rating}/5
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        review.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : review.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {review.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* {format(review.timestamp, "MMM d, yyyy")} */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openModal(review)}
                      className="text-blue-600 hover:text-blue-900 mx-1"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() => handleStatusChange(review.id, "approved")}
                      className="text-green-600 hover:text-green-900 mx-1"
                    >
                      <FiCheck />
                    </button>
                    <button
                      onClick={() => handleStatusChange(review.id, "rejected")}
                      className="text-red-600 hover:text-red-900 mx-1"
                    >
                      <FiX />
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="text-gray-600 hover:text-gray-900 mx-1"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReviewManager;
