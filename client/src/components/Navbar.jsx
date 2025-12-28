import {apiFetch} from "../api" 
import React, { useEffect, useState } from "react";
import logo from "../assets/icon.png";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isOpen, setIsOpen }) => { 
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      try {
        const data = await apiFetch("/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar w-full sticky top-0 bg-black text-white flex justify-between items-center px-4 md:px-10 py-3 border-b border-b-gray-800 z-100">
      
      <button

        className="block text-2xl sm:hidden z-50"
        onClick={(e) => {
          e.stopPropagation(); 
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Logo */}
      <div className="company flex items-center gap-2 p-2 text-2xl md:text-3xl font-bold">
        <img src={logo} alt="logo" height={40} width={40} className="logo" />
        <h2 className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          LocalConnect
        </h2>
      </div>

      {/* User */}
      <div className="flex items-center gap-6 text-lg font-medium">
        <div className="group relative">
          <button className="flex items-center gap-2 hover:text-blue-400 transition">
            <FaUserCircle className="text-2xl" />
            <span>{user ? user.name : "Guest"}</span>
          </button>

          {user && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
