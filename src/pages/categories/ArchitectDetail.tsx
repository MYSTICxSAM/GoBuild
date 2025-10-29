import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, Upload } from "lucide-react";
import { motion } from "framer-motion";

export default function ArchitectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [architect, setArchitect] = useState<any>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [canUpload, setCanUpload] = useState(false);

  // ✅ Get current logged-in user
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    getUser();
  }, []);

  // ✅ Fetch architect data
  useEffect(() => {
    const fetchArchitect = async () => {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from("architects")
        .select("*")
        .eq("id", Number(id))
        .single();
      if (!error && data) setArchitect(data);
      setLoading(false);
    };
    fetchArchitect();
  }, [id]);

  // ✅ Determine if user can upload
  useEffect(() => {
    if (currentUser && architect) {
      setCanUpload(currentUser.id === architect.user_id);
    }
  }, [currentUser, architect]);

  // ✅ Fetch photos
  const fetchPhotos = async () => {
    if (!id) return;
    const folderName = `architect_${id}`;
    const { data, error } = await supabase.storage
      .from("Architects")
      .list(folderName, { limit: 100 });
    if (error) {
      setPhotoError("Failed to load photos. Please refresh the page.");
      return;
    }
    const urls =
      data?.map((file) => {
        const { data: publicData } = supabase.storage
          .from("Architects")
          .getPublicUrl(`${folderName}/${file.name}`);
        return publicData?.publicUrl || "";
      }) || [];
    setPhotos(urls.filter(Boolean));
  };

  useEffect(() => {
    fetchPhotos();
  }, [id]);

  // ✅ Handle photo upload
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canUpload) {
      alert("You can only upload photos to your own profile.");
      return;
    }
    try {
      setPhotoError(null);
      const file = e.target.files?.[0];
      if (!file || !id) return;
      setUploading(true);
      const folderName = `architect_${id}`;
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `${folderName}/${fileName}`;
      const { error: uploadError } = await supabase.storage
        .from("Architects")
        .upload(filePath, file);
      if (uploadError) {
        setPhotoError("Failed to upload photo. Please try again.");
        return;
      }
      await fetchPhotos();
    } catch {
      setPhotoError("Failed to upload photo. Please try again.");
    } finally {
      setUploading(false);
    }
  };

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

      {/* ======= Banner Section ======= */}
      <div className="relative w-full h-64 md:h-80 bg-gray-100">
        <img
          src={architect.cover_url || photos[0] || "/placeholder-banner.jpg"}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25"></div>
      </div>

      {/* ======= Profile Section ======= */}
      <div className="max-w-6xl mx-auto p-6 -mt-20 relative z-10 bg-white rounded-2xl shadow-md">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={architect.image_url || "/placeholder-architect.jpg"}
            alt={architect.name}
            className="w-40 h-40 object-cover rounded-2xl shadow-md border-4 border-white"
          />
          <div className="flex flex-col flex-1">
            <h1 className="text-3xl font-bold text-purple-700">
              {architect.name}
            </h1>
            {/* Removed Rating Stars */}
            <p className="text-gray-700 mt-1">{architect.specialization}</p>
            <p className="text-gray-600 mt-3 leading-relaxed">
              {architect.description}
            </p>

            {canUpload && (
              <label className="mt-5 inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl shadow cursor-pointer transition w-fit">
                <Upload size={18} />
                {uploading ? "Uploading..." : "Upload New Photo"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                  disabled={uploading}
                />
              </label>
            )}
            {photoError && (
              <p className="text-red-500 text-sm mt-2">{photoError}</p>
            )}
          </div>
        </div>
      </div>

      {/* ======= Gallery Section ======= */}
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
          Design Gallery
        </h2>
        {photos.length === 0 ? (
          <p className="text-center text-gray-500">
            No photos uploaded yet. Be the first to upload!
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos.map((url, i) => (
              <motion.img
                key={i}
                src={url}
                alt={`Work ${i + 1}`}
                className="rounded-xl shadow-md object-cover w-full h-48"
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}