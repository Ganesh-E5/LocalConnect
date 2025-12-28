import React from 'react';
import image1 from '../assets/images/landingpage/image1.jpg';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';
import logo from "../assets/icon.png";
import { useNavigate } from 'react-router-dom';
import { AiOutlineRobot, AiOutlineProfile, AiOutlineLineChart } from "react-icons/ai";
import { FiUsers, FiSearch } from "react-icons/fi";
import { MdCardGiftcard, MdAccessibility, MdDiversity1, MdSupportAgent } from "react-icons/md";

const LandingPage = () => {
    const navigate = useNavigate();

    const Data = [
        {
            head: "Smart Service Recognition",
            para: "Our intelligent AI understands the services you offer based on your experience, portfolio, and interests. No tedious forms — just smart insights that showcase what you can do best.",
            features: [
                { icon: <AiOutlineRobot size={40} />, head: "AI-Powered Service Matching", para: "Automatically identifies and promotes your services to the right local customers and businesses." },
                { icon: <AiOutlineProfile size={40} />, head: "Dynamic Service Profile", para: "As your expertise grows, your profile evolves in real time — highlighting your most in-demand services." },
                { icon: <AiOutlineLineChart size={40} />, head: "Personalized Growth Insights", para: "Receive tailored recommendations to expand your offerings and attract more local clients." }
            ]
        },
        {
            head: "Connect with Local Clients",
            para: "Find customers and projects in your area that need your services. LocalConnect bridges the gap between service providers and people looking for trusted local help.",
            features: [
                { icon: <FiSearch size={40} />, head: "Verified Local Requests", para: "Access a curated list of real customer requests from your area looking for your expertise." },
                { icon: <FiUsers size={40} />, head: "Community Engagement", para: "Join local groups, share experiences, and grow your reputation within your community." },
            ]
        },
        {
            head: "Reward Growth & Equal Access",
            para: "At LocalConnect, we reward your effort and ensure fair access for every service provider. Earn Service Credits as you complete projects and grow your business — and enjoy exclusive tools to take your services further.",
            features: [
                { icon: <MdCardGiftcard size={40} />, head: "Service Credit System", para: "Earn Service Credits for completed jobs, great reviews, and verified projects." },
                { icon: <MdCardGiftcard size={40} />, head: "Redeemable Rewards", para: "Use your credits to unlock premium features, promotions, or training resources to grow faster." },
                { icon: <MdAccessibility size={40} />, head: "Inclusive Access", para: "Our platform welcomes every provider — from individuals to small teams — ensuring equal opportunity for all." },
                { icon: <MdDiversity1 size={40} />, head: "Diversity & Inclusion", para: "We celebrate diversity, ensuring fair exposure for all types of service providers." },
                { icon: <MdSupportAgent size={40} />, head: "Supportive Community", para: "Join a trusted network that values your service, supports your journey, and helps you succeed." }
            ]
        }
    ];

    return (
        <>
            <nav className="navbar w-full sticky top-0 bg-black text-white flex justify-between items-center px-10 py-3 border-b border-b-gray-800 z-50">
                <div className="company flex items-center gap-2 p-2 text-3xl font-bold">
                    <img src={logo} alt="logo" height={50} width={50} className="logo" />
                    <h2 className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">LocalConnect</h2>
                </div>
                <div className="auth flex gap-5 text-xl font-semibold">
                    <button
                        className="px-4 py-2 rounded-md transition duration-300 hover:bg-gray-700 cursor-pointer"
                        onClick={() => navigate('/login')}
                    >
                        Sign In
                    </button>
                    <button
                        className="px-6 py-2 rounded-md bg-blue-500 text-white transition duration-300 hover:bg-blue-600 cursor-pointer"
                        onClick={() => navigate('/signup')}
                    >
                        Join as a Provider
                    </button>
                </div>
            </nav>

            <div className="bg-black text-white py-5 min-h-screen w-full overflow-x-hidden box-border">
                <div className="flex w-full items-stretch my-20 bg-[#001b2c] rounded-2xl box-border overflow-x-hidden">
                    <div className="w-1/2 flex flex-col justify-center items-start px-10 gap-10 box-border">
                        <h1 className="text-6xl font-bold leading-tight">
                            Empower Your Local Service Business with AI-Powered LocalConnect
                        </h1>
                        <p className="text-lg text-gray-200">
                            LocalConnect transforms how local service providers find clients.
                            Our AI-driven platform recognizes your services, connects you with
                            the right local opportunities, and rewards your growth through our
                            innovative Service Credit System.
                        </p>
                        <button
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition hover:bg-blue-600 tracking-wide"
                            onClick={() => { navigate('/signup') }}
                        >
                            Start Providing Services
                        </button>
                    </div>
                    <div className="w-1/2 flex items-center justify-center box-border">
                        <img
                            src={image1}
                            alt="LocalConnect service platform overview"
                            className="w-full h-auto rounded-lg shadow-lg object-cover"
                        />
                    </div>
                </div>

                {Data.map((item, index) => (
                    <FeaturesSection
                        key={index}
                        bgColor={index % 2 === 0 ? 'bg-slate-900' : 'bg-black'}
                        sectionHead={item.head}
                        sectionPara={item.para}
                        features={item.features}
                    />
                ))}
            </div>

            <Footer />
        </>
    );
};

export default LandingPage;
