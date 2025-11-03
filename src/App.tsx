import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthLayout from "./pages/auth/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ServicesPage from "./pages/ServicesPage";
import Blogs from "./pages/Blogs"
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/auth/Forgot";
import Workers from "./pages/categories/Workers";
import Suppliers from "./pages/categories/Suppliers";
import HouseOwner from "./pages/categories/HouseOwner";
import Developers from "./pages/categories/Developers";
import Architects from "./pages/categories/Architects";
import Contractors from "./pages/categories/Contractors";
import CategoriesLayout from "./pages/categories/CategoriesLayout";
import ArchitectDetail from "./pages/categories/ArchitectDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import ArchitectDashboard from "./pages/ArchitectDashboard.tsx";
import MaterialSupplierDetail from "./pages/categories/MaterialSupplierDetail";
import SupplierDashboard from "./pages/SupplierDashboard";
// Import i18n configuration
import './i18n';

const queryClient = new QueryClient();

// Create a component that uses the auth context
const AppRoutes = () => {
  const { userRole } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/blog" element={<Blogs user_role={userRole} />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/architectDashboard" element={<ProtectedRoute requiredRole="architect"><ArchitectDashboard /></ProtectedRoute>} />
      <Route path="/supplierDashboard" element={<ProtectedRoute requiredRole="supplier"><SupplierDashboard /></ProtectedRoute>} />
      <Route path="/categories" element={<CategoriesLayout />}>
        <Route path="workers" element={<Workers />} />   
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="houseowners" element={<HouseOwner />} />
        <Route path="developers" element={<Developers />} />
        <Route path="architects" element={<Architects />} />
        <Route path="contractors" element={<Contractors />} />
        <Route path="architect-detail/:id" element={<ArchitectDetail />} />
        <Route path="material-supplier-detail/:id" element={<MaterialSupplierDetail />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="Forgot" element={<ForgotPassword />} />
        
      </Route>
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <ScrollToTop/>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
