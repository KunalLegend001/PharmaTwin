import { Routes, Route } from "react-router-dom";
import Layout from "@/layout/Layout";

// Auth
import Login from "@/features/auth/pages/Login";
import Signup from "@/features/auth/pages/Signup";

// Home
import Home from "@/features/home/pages/Home";
import NotFound from "@/features/other/NotFound";
import Analysis from "@/features/analysis/Analysis";
import HistoryPage from "@/features/analysis/HistoryPage";
import { PharmaChatbotForm } from "@/features/chat/Chatbot";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Layout-wrapped routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/support" element={<PharmaChatbotForm />} />


      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
