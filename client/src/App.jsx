import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import MainLayout from './layouts/MainLayout';
import MyRequests from './pages/MyRequests';
import RaiseRequest from './pages/RaiseRequest';
import AcceptRequest from './pages/AcceptRequest';
import AssignedRequests from "./pages/AssignedRequests";
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import Settings from './pages/Settings';
import Help from './pages/Help';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/raise" element={<RaiseRequest />} />
          <Route path="/accept" element={<AcceptRequest />} />
          <Route path="/my-requests" element={<MyRequests />} />
          <Route path="/assigned-requests" element={<AssignedRequests />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
        </Route>
      </Route>

      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
};

export default App;
