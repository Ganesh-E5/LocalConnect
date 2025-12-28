import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  FiPlusCircle,
  FiCheckCircle,
  FiList,
  FiInbox,
  FiUser,
  FiSettings,
  FiHelpCircle,
} from "react-icons/fi";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeSidebar]);

  const menuSections = [
    {
      title: "Main",
      items: [
        { key: "raise_a_request", label: "Raise a Request", path: "/raise", icon: <FiPlusCircle /> },
        { key: "accept_request", label: "Accept a Request", path: "/accept", icon: <FiCheckCircle /> },
        { key: "my_requests", label: "My Requests", path: "/my-requests", icon: <FiList /> },
      ],
    },
    {
      title: "Management",
      items: [
        { key: "assigned_requests", label: "Assigned Requests", path: "/assigned-requests", icon: <FiInbox /> },
        { key: "my_profile", label: "My Profile", path: "/my-profile", icon: <FiUser /> },
      ],
    },
    {
      title: "Support",
      items: [
        { key: "settings", label: "Settings", path: "/settings", icon: <FiSettings /> },
        { key: "help", label: "Help/FAQ", path: "/help", icon: <FiHelpCircle /> },
      ],
    },
  ];

  const baseClass =
    "flex items-center gap-3 px-4 py-2 rounded-md transition duration-200 font-medium";

  return (
    <aside
  ref={sidebarRef}
  className={`bg-black text-white w-56 sm:w-64 p-4 md:p-6 fixed top-16 left-0 h-[calc(100%-64px)] z-50 transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
    sm:translate-x-0 sm:static sm:block overflow-y-auto hide-scrollbar`}
>

      {menuSections.map((section, idx) => (
        <div key={idx} className={idx !== 0 ? "mt-6 pt-4 border-t border-gray-700" : ""}>
          <h3 className="text-gray-500 mb-3 text-sm font-semibold uppercase tracking-wide">
            {section.title}
          </h3>
          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.key}>
                <NavLink
                  to={item.path}
                  onClick={closeSidebar} 
                  className={({ isActive }) =>
                    `${baseClass} ${
                      isActive
                        ? "bg-gray-700 border-l-4 border-blue-500 text-white"
                        : "hover:bg-gray-800 text-gray-300 hover:text-white"
                    }`
                  }
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;