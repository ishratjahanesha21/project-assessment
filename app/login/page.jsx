"use client";
import React, { useState } from "react";
import { User, Mail, Phone, Lock } from "lucide-react";
import { auth } from "../../common/firebaseConfig"; // Adjust the path based on your folder structure
import {signInWithEmailAndPassword } from "firebase/auth";
import { message } from "antd"; 
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        name: user.displayName || formData.name, // Save the name, fallback to form name
        phone: formData.phone, // Assuming you want to save phone from form
      }));
      window.dispatchEvent(new Event("userLogin"));
      message.success("Logged in successfully!");
      router.push("/user-cart");
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Enter your details to sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
        

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-colors"
              />
            </div>
          </div>


          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-500 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-yellow-500 hover:underline font-medium">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
