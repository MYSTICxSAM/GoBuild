import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";

export default function ArchitectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [architect, setArchitect] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArchitect = async () => {
      if (!id) return;

      setLoading(true);
      const { data, error } = await supabase
        .from("architects")
        .select("*")
        .eq("id", Number(id))
        .single();

      console.log("Supabase data:", data);
      console.log("Supabase error:", error);

      if (error) {
        console.error("Error fetching architect:", error);
      } else {
        setArchitect(data);
      }
      setLoading(false);
    };

    fetchArchitect();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-gray-600" />
      </div>
    );
  }

  if (!architect) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <p className="text-lg text-gray-600 mb-4">Architect not found 😢</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6 mt-10">
        <h1 className="text-4xl font-bold mb-4 text-center text-purple-700">
          {architect.name}
        </h1>
        <p className="text-center text-gray-600 mb-8 text-lg">
          {architect.specialization || "Architecture Expert"}
        </p>

        <div className="flex justify-center mb-8">
          <img
            src={architect.image_url || "/placeholder-architect.jpg"}
            alt={architect.name}
            className="w-full sm:w-2/3 rounded-2xl shadow-lg"
          />
        </div>

        <p className="text-gray-700 leading-relaxed text-center text-lg">
          {architect.description || "No additional details available."}
        </p>
      </div>

      <Footer />
    </div>
  );
}
