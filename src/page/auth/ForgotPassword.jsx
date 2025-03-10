import { useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import authApi from "../../api/auth";
import * as yup from "yup";
import { toast } from "react-toastify";

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });
  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    try {
      await authApi.forgot({ email: data.email });
      setMessage("Password reset link has been sent to your email.");
      toast.success("Password reset link has been sent to your email.");
    } catch (error) {
      setMessage("Failed to send password reset link.");
      toast.error("Failed to send password reset link.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="font-[sans-serif] bg-white">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">
                  Forgot Password
                </h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                  Enter your email address to receive a password reset link.
                  Follow the instructions in your email to set a new password.
                </p>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block text-left">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    // name="email"
                    type="text"
                    {...register("email")}
                    autoComplete="email"
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                    placeholder="Enter Email"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="10"
                      cy="7"
                      r="6"
                      data-original="#000000"
                    ></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } focus:outline-none`}
                >
                  {loading ? "Sending..." : "Send Email"}
                </button>

                <span className="flex items-center justify-center w-full my-2 space-x-2">
                  <span>or</span>
                </span>
                <button className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 hover:bg-gray-100">
                  <FcGoogle className="w-6 h-6 mr-2" />
                  <span>Login with Google</span>
                </button>
              </div>
            </form>
          </div>
          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
              alt="Dining Experience"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
