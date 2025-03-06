import React, { useEffect, useState } from "react";
import { adminCategoryApi } from "../../../api/AdminCategory";
import Select from "react-select";
import { adminMovieApi } from "../../../api/AdminMovie";
import { toast } from "react-toastify";

export default function MovieModal({ movie }) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: movie?.title || "",
    description: movie?.description || "",
    author: movie?.author || "",
    actor: movie?.actor || "",
    pictureURL: movie?.pictureURL || "",
    moviesURL: movie?.moviesURL || "",
    year: movie?.year || "",
    categoryIds: movie?.categoryIds || [],
  });
  useEffect(() => {
    fetchCategory();
  }, []);
  // get all category
  const fetchCategory = async () => {
    try {
      const res = await adminCategoryApi.getAllCategory(0, 8);
      // setCategoryList(res?.data?.data?.content);
      const categories = res?.data?.data?.content || [];
      // Chuyển đổi categoryList thành format phù hợp cho react-select
      const formattedCategories = categories.map((c) => ({
        value: c.id, // Giá trị thực tế
        label: c.name, // Hiển thị tên category
      }));

      setCategoryList(formattedCategories);
    } catch (error) {
      console.error("Error creating category:", error);
      return null;
    }
  };
  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMovie = {
        title: formData.title,
        description: formData.description,
        author: formData.author,
        actor: formData.actor,
        pictureURL: formData.pictureURL,
        moviesURL: formData.moviesURL,
        year: formData.year,
        categoryIds: selectedCategories.map((c) => c.value), // Lấy danh sách ID từ category
      };

      const response = await adminMovieApi.createMovie(newMovie);

      toast.success("Movie created successfully:");
      console.log("Movie created successfully:", response);
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  return (
    <div className="relative flex flex-col w-full mb-6 mt-4 shadow-lg rounded-lg bg-white border-0">
      <div className="rounded-t bg-gray-100 px-4 py-4 flex justify-between">
        <h6 className="text-gray-700 text-xl font-bold">
          {movie ? "Update Movie" : "Create Movie"}
        </h6>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <label className="block text-gray-600 text-xs font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                className="border px-3 py-2 rounded w-full"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <label className="block text-gray-600 text-xs font-bold mb-2">
                Year
              </label>
              <input
                type="text"
                name="year"
                className="border px-3 py-2 rounded w-full"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full px-4">
              <label className="block text-gray-600 text-xs font-bold mb-2">
                Description
              </label>
              <textarea
                name="description"
                className="border px-3 py-2 rounded w-full"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <label className="block text-gray-600 text-xs font-bold mb-2">
                Author
              </label>
              <input
                type="text"
                name="author"
                className="border px-3 py-2 rounded w-full"
                value={formData.author}
                onChange={handleChange}
              />
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <label className="block text-gray-600 text-xs font-bold mb-2">
                Actor
              </label>
              <input
                type="text"
                name="actor"
                className="border px-3 py-2 rounded w-full"
                value={formData.actor}
                onChange={handleChange}
              />
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <label className="block text-gray-600 text-xs font-bold mb-2">
                Picture URL
              </label>
              <input
                type="text"
                name="pictureURL"
                className="border px-3 py-2 rounded w-full"
                value={formData.pictureURL}
                onChange={handleChange}
              />
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <label className="block text-gray-600 text-xs font-bold mb-2">
                Movies URL
              </label>
              <input
                type="text"
                name="moviesURL"
                className="border px-3 py-2 rounded w-full"
                value={formData.moviesURL}
                onChange={handleChange}
              />
            </div>
            {/* Category */}
            <div className="w-full px-4 mb-4">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Category
              </label>
              <Select
                options={categoryList}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                onChange={handleCategoryChange}
                value={selectedCategories}
                className="text-sm"
              />
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600"
            >
              {movie ? "Update Movie" : "Create Movie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
