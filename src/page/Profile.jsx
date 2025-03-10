// import React, { useContext, useEffect, useState } from "react";

// import teamImage from "../assets/img/team-1-800x800.jpg";
// import { AuthContext } from "../context/AuthContext";
// import { UserApi } from "../api/UserAcc";

// export default function Profile() {
//   const { userId } = useContext(AuthContext);

//   const [user, setUser] = useState(null);

//   const fetchUser = async () => {
//     try {
//       const response = await UserApi.getById(userId);
//       setUser(response.data);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, [userId]);

//   return (
//     <>
//       {/* <Navbar transparent /> */}
//       <main className="profile-page">
//         <section className="relative block h-[500px]">
//           <div
//             className="absolute top-0 w-full h-full bg-center bg-cover"
//             style={{
//               backgroundImage:
//                 "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
//             }}
//           >
//             <span
//               id="blackOverlay"
//               className="w-full h-full absolute opacity-50 bg-black"
//             ></span>
//           </div>
//           <div
//             className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
//             style={{ transform: "translateZ(0)" }}
//           >
//             <svg
//               className="absolute bottom-0 overflow-hidden"
//               xmlns="http://www.w3.org/2000/svg"
//               preserveAspectRatio="none"
//               version="1.1"
//               viewBox="0 0 2560 100"
//               x="0"
//               y="0"
//             >
//               <polygon
//                 className="text-blueGray-200 fill-current"
//                 points="2560 0 2560 100 0 100"
//               ></polygon>
//             </svg>
//           </div>
//         </section>
//         <section className="relative py-16 bg-blueGray-200">
//           <div className="container mx-auto px-4">
//             <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
//               <div className="px-6">
//                 <div className="flex flex-wrap justify-center relative mt-4">
//                   <div className="w-full lg:w-3/12 px-4 flex justify-center">
//                     <img
//                       alt="..."
//                       src={teamImage}
//                       className="shadow-xl rounded-full h-auto align-middle border-none"
//                     />
//                   </div>
//                   <div className="absolute top-0 right-0">
//                     <button
//                       className="bg-blue-500 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
//                       type="button"
//                     >
//                       Edit
//                     </button>
//                   </div>
//                 </div>

//                 <div className="text-center mt-12">
//                   <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
//                     Jenna Stones
//                   </h3>
//                   <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
//                     <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
//                     Los Angeles, California
//                   </div>
//                   <div className="mb-2 text-blueGray-600 mt-10">
//                     <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
//                     Solution Manager - Creative Tim Officer
//                   </div>
//                   <div className="mb-2 text-blueGray-600">
//                     <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
//                     University of Computer Science
//                   </div>
//                 </div>
//                 <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
//                   <div className="flex flex-wrap justify-center">
//                     <div className="w-full lg:w-9/12 px-4">
//                       <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
//                         An artist of considerable range, Jenna the name taken by
//                         Melbourne-raised, Brooklyn-based Nick Murphy writes,
//                         performs and records all of his own music, giving it a
//                         warm, intimate feel with a solid groove structure. An
//                         artist of considerable range.
//                       </p>
//                       <a
//                         href="#pablo"
//                         className="font-normal text-lightBlue-500"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         Show more
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       {/* <Footer /> */}
//     </>
//   );
// }
import React, { useContext, useEffect, useState } from "react";
import { userDetail } from "../api/userDetail";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { userId } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: "",
    profilePicture: "",
  });

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
        console.error(
          "Lỗi khi cập nhật thông tin user:",
          error.response?.data || error.message
        );
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
                      src={
                        user?.profilePicture ||
                        "https://via.placeholder.com/150"
                      }
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
