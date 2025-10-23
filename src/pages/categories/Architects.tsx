import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";

const ArchitectsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [architects, setArchitects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
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

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Register architect
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

    const { error } = await supabase
      .from("architects")
      .insert([
        {
          name,
          specialization,
          description,
          image_url,
          user_id: user.id, // must match your Supabase table column exactly
        },
      ]);

    setLoading(false);

    if (error) {
      console.error(error);
      setMessage(`Failed to register: ${error.message}`);
    } else {
      setMessage("Successfully registered as architect!");
      setFormData({ name: "", specialization: "", description: "", image_url: "" });
      setShowForm(false);
      fetchArchitects();
    }
  };

  // Filtered architects
  const filteredArchitects = architects.filter(
    (arch) =>
      arch.name?.toLowerCase().includes(search.toLowerCase()) ||
      arch.specialization?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 md:px-0 pt-12 sm:pt-20 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="md:w-1/2">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Find <span className="text-purple-600">Top Architects</span> for Your Project
          </h1>

          {user && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              {showForm ? "Cancel" : "Register as Architect"}
            </button>
          )}
        </div>

        <div className="md:w-1/2 flex justify-center hidden md:flex">
          <img
            src="https://thearchitectsdiary.com/wp-content/uploads/2019/12/architect-construction-plans.jpg"
            alt="Architectural planning"
            className="rounded-2xl shadow-xl object-cover w-full h-[300px] sm:h-[340px] md:max-w-[420px]"
          />
        </div>
      </section>

      {/* Registration Form */}
      {showForm && (
        <section className="max-w-4xl mx-auto mt-10 bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
            Register as an Architect
          </h2>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
              required
            />
            <input
              type="text"
              name="specialization"
              placeholder="Specialization (e.g. Interior Design)"
              value={formData.specialization}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
              required
            />
            <textarea
              name="description"
              placeholder="Short Description about your work"
              value={formData.description}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
              rows={4}
              required
            />
            <input
              type="text"
              name="image_url"
              placeholder="Image URL (optional)"
              value={formData.image_url}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />

            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Register
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

      {/* Search Bar */}
      <section className="max-w-6xl mx-auto px-4 md:px-0 mt-8">
        <input
          type="text"
          placeholder="Search architects by name or specialization"
          className="w-full sm:w-1/2 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:outline-none mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      {/* Architects Grid */}
      <section className="max-w-6xl mx-auto px-4 md:px-0 mt-4 mb-20">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin w-8 h-8 text-purple-600" />
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
                      {arch.description || "Expert in architectural design and planning."}
                    </p>
                  </div>

                  {/* View Details Button */}
                  <button
  onClick={() => navigate(`/categories/architect-detail/${arch.id}`)}
  className="mt-auto bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
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
