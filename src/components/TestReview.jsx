import { useEffect, useState } from "react";
import { UserReviewApi } from "../api/UserReview";

const comments = [
  {
    id: 1,
    name: "Arlene",
    date: "12/06/2020",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    likes: 10,
  },
  {
    id: 2,
    name: "Arlene",
    date: "12/06/2020",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    likes: 10,
  },
];

export const TestReview = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const fetchReview = async () => {
    try {
      const response = await UserReviewApi.getReviewByMovieId(
        "1cea836a-f087-4ece-99b8-2a9a8318754a",
        1,
        5
      );
      console.log(response);
    } catch (error) {
      console.error("Lỗi khi lấy kết quả tìm kiếm:", error);
    }
  };
  useEffect(() => {
    fetchReview();
  });
  return (
    <div className="max-w-4xl mx-auto bg-black text-white p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {/* Input box */}
      <div className="flex items-center gap-3 mb-6">
        <img
          src="https://randomuser.me/api/portraits/men/15.jpg"
          alt="User"
          className="w-12 h-12 rounded-full"
        />
        <input
          type="text"
          placeholder="Write your comments here....."
          className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
        />
      </div>

      {/* Comments list */}
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-4 mb-6">
          <img
            src={comment.avatar}
            alt={comment.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold">{comment.name}</p>
            <p className="text-gray-400 text-sm">{comment.date}</p>
            <p className="mt-1">{comment.text}</p>
            <div className="flex items-center gap-4 mt-2 text-gray-400 text-sm">
              {/* <button className="flex items-center gap-1 hover:text-gray-200">
                  👍 {comment.likes}
                </button>
                <button className="flex items-center gap-1 hover:text-gray-200">
                  👎
                </button> */}
              <button className="hover:text-gray-200 px-7">Reply</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
