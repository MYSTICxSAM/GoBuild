import React, { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, CheckCircle2, Smile } from "lucide-react";

const MaterialSupplierPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const formRef = useRef<HTMLElement>(null);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
  });
  const [message, setMessage] = useState("");
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

  // Fetch suppliers
  const fetchSuppliers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("material_supplier").select("*");
    if (error) console.error(error);
    setSuppliers(data || []);
    setLoading(false);
  };

  // Check if user already registered
  const checkIfRegistered = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("material_supplier")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();
    if (!error && data) setIsAlreadyRegistered(true);
    else setIsAlreadyRegistered(false);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (user) checkIfRegistered();
  }, [user]);

  useEffect(() => {
    const shouldShowForm = searchParams.get("showForm");
    if (shouldShowForm === "true" && user && !isAlreadyRegistered) {
      setShowForm(true);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("showForm");
      setSearchParams(newSearchParams, { replace: true });
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [user, isAlreadyRegistered]);

  // Handle input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!user) {
        setMessage("Please log in to upload an image.");
        return;
      }

      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("material-supplier-images") // Correct bucket name
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("material-supplier-images")
        .getPublicUrl(fileName);

      if (publicUrlData?.publicUrl) {
        setFormData((prev) => ({ ...prev, image_url: publicUrlData.publicUrl }));
        setMessage("Image uploaded successfully!");
      }
    } catch (error: any) {
      console.error(error);
      setMessage(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  // Handle form submit (Updated to use user_role = 'supplier')
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setMessage("Please log in first.");
      return;
    }

    const { name, description, image_url } = formData;
    if (!name || !description) {
      setMessage("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { data: existing } = await supabase
        .from("material_supplier")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (existing) {
        setMessage("You are already registered as a material supplier.");
        setLoading(false);
        setIsAlreadyRegistered(true);
        return;
      }

      const { error } = await supabase.from("material_supplier").insert([
        {
          name,
          description,
          image_url,
          user_id: user.id,
        },
      ]);

      if (error) throw error;

      // Set user_role to 'supplier' to match constraint
      const { error: roleError } = await supabase
        .from("profiles")
        .update({ user_role: "supplier" })
        .eq("id", user.id);

      if (roleError) throw roleError;

      setMessage("Successfully registered as material supplier!");
      setFormData({ name: "", description: "", image_url: "" });
      setShowForm(false);
      setIsAlreadyRegistered(true);
      fetchSuppliers();
    } catch (err: any) {
      console.error(err);
      setMessage(`Failed to register: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // FIXED: Redirect only to /categories/material-supplier (no ?showForm=true)
  const handleRegisterClick = () => {
    if (!user) {
      navigate("/auth/login?redirect=/categories/suppliers&showForm=true");
    } else if (isAlreadyRegistered) {
      setMessage("You are already registered as a material supplier.");
    } else {
      setShowForm(true);
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const filteredSuppliers = suppliers.filter((s) =>
    s.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 pb-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Find the <span className="text-blue-600">Best Material Suppliers</span> <br /> for
            Your Construction Needs
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Connect with trusted material suppliers offering high-quality building materials
            including cement, steel, wood, tiles, and more.
          </p>
          <div className="relative w-full max-w-md mb-6">
            <input
              type="text"
              placeholder="Search suppliers..."
              className="w-full py-3 px-5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Search →
            </button>
          </div>

          <button
            onClick={handleRegisterClick}
            className={`${
              isAlreadyRegistered
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white px-6 py-2 rounded-lg font-semibold transition`}
            disabled={isAlreadyRegistered}
          >
            {isAlreadyRegistered ? "Already Registered" : "Register as Supplier"}
          </button>
        </div>

        {/* Right Side Video */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <iframe
              width="100%"
              height="320"
              src="https://www.youtube.com/embed/5aJjXXQPqpM"
              title="Material Supplier Video"
              allowFullScreen
              className="w-full rounded-2xl"
            ></iframe>
          </div>

          {/* Floating Cards */}
          <div className="absolute -top-8 -right-6 bg-white rounded-lg p-4 shadow-lg md:block animate-bounce">
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 rounded-full p-2">
                <CheckCircle2 className="text-green-600 w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-800">Verified Suppliers</p>
                <p className="text-xs text-gray-500">Trusted & Rated</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-8 -left-6 bg-white rounded-lg p-4 shadow-lg md:block animate-pulse">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 rounded-full p-2">
                <Smile className="text-blue-600 w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Happy Builders</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      {showForm && user && !isAlreadyRegistered && (
        <section
          ref={formRef}
          className="max-w-4xl mx-auto mt-10 bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-200 relative"
        >
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-3xl font-bold"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
            Register as Material Supplier
          </h2>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Supplier Name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
            <textarea
              name="description"
              placeholder="Describe your materials or services"
              value={formData.description}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              rows={4}
              required
            />
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium">Upload Business Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="p-2 border border-gray-300 rounded-lg"
              />
              {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
              {formData.image_url && (
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="w-40 h-40 rounded-lg object-cover mt-2 border border-gray-200"
                />
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              disabled={uploading}
            >
              {uploading ? "Please wait..." : "Register"}
            </button>
          </form>

          {message && (
            <p
              className={`mt-3 text-center font-medium ${
                message.includes("Successfully") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </section>
      )}

      {/* Supplier Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-0 mt-16 mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Different Material Suppliers
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          Explore trusted suppliers for construction materials.
        </p>
      </section>

      {/* Supplier Cards */}
      <section className="max-w-6xl mx-auto px-4 md:px-0 mt-6 mb-20">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
          </div>
        ) : filteredSuppliers.length === 0 ? (
          <p className="text-center text-gray-500">No suppliers found.</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSuppliers.map((supplier) => (
              <div
                key={supplier.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 overflow-hidden flex flex-col"
              >
                <img
                  src={supplier.image_url || "/placeholder.jpg"}
                  alt={supplier.name}
                  className="w-full h-56 sm:h-64 object-cover"
                />
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-gray-900 line-clamp-2">
                      {supplier.name}
                    </h3>
                    <p className="text-gray-700 mb-5 text-sm line-clamp-3">
                      {supplier.description ||
                        "Supplier of quality construction materials."}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      navigate(`/categories/material-supplier-detail/${supplier.id}`)
                    }
                    className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default MaterialSupplierPage;