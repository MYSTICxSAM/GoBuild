import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, CheckCircle2, Smile } from "lucide-react";

const ArchitectsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [architects, setArchitects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    description: "",
    image_url: "",
  });
  const [message, setMessage] = useState("");

  // Fetch architects
  const fetchArchitects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("architects").select("*");
    if (error) console.error(error);
    setArchitects(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchArchitects();
  }, []);

  // Handle input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle file upload
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

      const { data, error: uploadError } = await supabase.storage
        .from("Architects")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("Architects")
        .getPublicUrl(fileName);

      if (publicUrlData?.publicUrl) {
        setFormData((prev) => ({
          ...prev,
          image_url: publicUrlData.publicUrl,
        }));
        setMessage("Image uploaded successfully!");
      }
    } catch (error: any) {
      console.error(error);
      setMessage(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  // Handle form submit
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setMessage("Please log in first.");
      return;
    }

    const { name, specialization, description, image_url } = formData;
    if (!name || !specialization || !description) {
      setMessage("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("architects").insert([
      {
        name,
        specialization,
        description,
        image_url,
        user_id: user.id,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      setMessage(`Failed to register: ${error.message}`);
    } else {
      setMessage("Successfully registered as architect!");
      setFormData({
        name: "",
        specialization: "",
        description: "",
        image_url: "",
      });
      setShowForm(false);
      fetchArchitects();
    }
  };

  const handleRegisterClick = () => {
    if (!user) {
      navigate("/auth/login");
    } else {
      setShowForm(true);
    }
  };

  const filteredArchitects = architects.filter(
    (arch) =>
      arch.name?.toLowerCase().includes(search.toLowerCase()) ||
      arch.specialization?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Hire <span className="text-blue-600">Top Architects</span> <br /> for
            Your Dream Project
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Design your ideal space with the best architects — experts in
            innovative planning, interior design, and modern construction
            solutions.
          </p>
          <div className="relative w-full max-w-md mb-6">
            <input
              type="text"
              placeholder="Search architects..."
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
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register as Architect
          </button>
        </div>

        {/* Right Side Video */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <iframe
              width="100%"
              height="320"
              src="https://www.youtube.com/embed/5aJjXXQPqpM"
              title="Architect Promo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full rounded-2xl"
            ></iframe>
          </div>

          <div className="absolute top-4 right-4 bg-white shadow-lg rounded-xl px-4 py-2 flex items-center gap-2">
            <CheckCircle2 className="text-green-500 w-5 h-5" />
            <div className="text-sm">
              <p className="font-semibold text-gray-800">Verified Experts</p>
              <p className="text-gray-500 text-xs">Background Checked</p>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 bg-white shadow-lg rounded-xl px-4 py-2 flex items-center gap-2">
            <Smile className="text-blue-500 w-5 h-5" />
            <div className="text-sm">
              <p className="font-semibold text-gray-800">Happy Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Registration Form with Close Button */}
      {showForm && user && (
        <section className="max-w-4xl mx-auto mt-10 bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-200 relative">
          {/* ❌ Close Button */}
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-3xl font-bold"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
            Register as an Architect
          </h2>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
            <input
              type="text"
              name="specialization"
              placeholder="Specialization (e.g. Interior Design)"
              value={formData.specialization}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
            <textarea
              name="description"
              placeholder="Short Description about your work"
              value={formData.description}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              rows={4}
              required
            />

            {/* Image Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium">
                Upload Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="p-2 border border-gray-300 rounded-lg"
              />
              {uploading && (
                <p className="text-blue-500 text-sm">Uploading...</p>
              )}
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
                message.includes("Successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </section>
      )}

      {/* Architects Grid */}
      <section className="max-w-6xl mx-auto px-4 md:px-0 mt-12 mb-20">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
          </div>
        ) : filteredArchitects.length === 0 ? (
          <p className="text-center text-gray-500">No architects found.</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArchitects.map((arch) => (
              <div
                key={arch.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 overflow-hidden flex flex-col"
              >
                <img
                  src={arch.image_url || "/placeholder-architect.jpg"}
                  alt={arch.name}
                  className="w-full h-56 sm:h-64 object-cover"
                  loading="lazy"
                />
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-gray-900 line-clamp-2">
                      {arch.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {arch.specialization || "Specialization not specified"}
                    </p>
                    <p className="text-gray-700 mb-5 text-sm line-clamp-3">
                      {arch.description ||
                        "Expert in architectural design and planning."}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/categories/architect-detail/${arch.id}`)
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

export default ArchitectsPage;
