import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">

      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex flex-1 relative">
        
        <Sidebar isOpen={isOpen} closeSidebar={() => setIsOpen(false)} />
        
        <main className="flex-1 p-4 bg-black border-l-2 border-gray-800">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;