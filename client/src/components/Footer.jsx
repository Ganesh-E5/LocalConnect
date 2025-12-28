import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../assets/icon.png";

const FooterColumn = ({ title, links }) => (
  <div>
    <h4 className="text-white font-semibold mb-3">{title}</h4>
    <ul className="space-y-2 text-sm">
      {links.map((link, index) => (
        <li key={index}>
          <Link to={link.url} className="hover:text-white">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// Footer Data
const footerData = [
  {
    title: "Company",
    links: [
      { label: "About Us", url: "#" },
      { label: "Careers", url: "#" },
      { label: "Press", url: "#" },
      { label: "Partnerships", url: "#" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Features", url: "/features" },
      { label: "Pricing", url: "#" },
      { label: "Integrations", url: "#" },
      { label: "API", url: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 px-10 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-5 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="LocalConnect logo" width={35} height={35} />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">
              LocalConnect
            </span>
          </div>
          <p className="text-sm">
            Connecting local talent with global opportunities, powered by AI.
          </p>

          <div className="flex gap-4 mt-4 text-lg">
            <Link to="#"><FaFacebookF className="hover:text-white" /></Link>
            <Link to="#"><FaTwitter className="hover:text-white" /></Link>
            <Link to="#"><FaLinkedinIn className="hover:text-white" /></Link>
            <Link to="#"><FaInstagram className="hover:text-white" /></Link>
            <Link to="#"><FaYoutube className="hover:text-white" /></Link>
          </div>
        </div>

        {footerData.map((column, index) => (
          <FooterColumn key={index} title={column.title} links={column.links} />
        ))}
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 pt-6 flex justify-between items-center">
        <p className="text-sm">&copy; 2025 LocalConnect+. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
