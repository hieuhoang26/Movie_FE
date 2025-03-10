import React, { useContext, useEffect, useState } from "react";
import { userDetail } from "../api/userDetail";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { userId } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ name: "", profilePicture: "" });

  useEffect(() => {
    if (userId) {
      userDetail
        .getUserById(userId)
        .then((res) => {
          setUser(res.data.data);
          setEditedUser(res.data.data);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy thông tin user:", error);
        });
    }
  }, [userId]);

  // Bật/Tắt chế độ chỉnh sửa
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Cập nhật giá trị input khi nhập
  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  // Gửi dữ liệu cập nhật lên server
  const handleSave = () => {
    const updatedData = {
      name: editedUser.name,
      profilePicture: editedUser.profilePicture,
    };

    console.log("Dữ liệu gửi lên API:", updatedData);

    userDetail
      .updateUser(userId, updatedData)
      .then(() => {
        setUser(updatedData); // Cập nhật state hiển thị
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật thông tin user:", error.response?.data || error.message);
      });
  };

  return (
    <main className="profile-page">
      <section className="relative block h-[500px]">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
          }}
        >
          <span className="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
      </section>

      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center relative mt-4">
                <div className="w-full lg:w-3/12 px-4 flex justify-center">
                  {isEditing ? (
                    <input
                      type="text"
                      name="profilePicture"
                      value={editedUser.profilePicture}
                      onChange={handleChange}
                      className="border p-2 rounded w-full"
                      placeholder="URL ảnh đại diện"
                    />
                  ) : (
                    <img
                      alt="Avatar"
                      src={user?.profilePicture || "https://via.placeholder.com/150"}
                      className="shadow-xl rounded-full h-auto align-middle border-none"
                    />
                  )}
                </div>
              </div>

              <div className="text-center mt-12">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={handleChange}
                    className="text-4xl font-semibold text-blueGray-700 border p-2 rounded"
                  />
                ) : (
                  <h3 className="text-4xl font-semibold leading-normal text-blueGray-700">
                    {user ? user.name : "Không có tên"}
                  </h3>
                )}
                <p className="text-blueGray-600">
                  Vai trò: {user?.role === 1 ? "Admin" : "Người dùng"}
                </p>
              </div>

              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                  Đây là trang thông tin cá nhân của bạn.
                </p>
                <button
                  onClick={handleEditClick}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  {isEditing ? "Hủy" : "Chỉnh sửa"}
                </button>
                {isEditing && (
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Lưu
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
