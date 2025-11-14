import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, Upload, X } from "lucide-react";
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

  // Request state
  const [requesting, setRequesting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form fields matching your schema
  const [clientName, setClientName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");

  // Get current logged-in user
  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setCurrentUser(user);
      } catch (err) {
        console.error("Error getting user:", err);
      }
    };
    getUser();
  }, []);

  // Fetch architect data
  useEffect(() => {
    const fetchArchitect = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("architects")
          .select("*")
          .eq("id", Number(id))
          .single();
        if (error) {
          console.error("Error fetching architect:", error);
          setArchitect(null);
        } else {
          setArchitect(data);
        }
      } catch (err) {
        console.error("Error fetching architect:", err);
        setArchitect(null);
      } finally {
        setLoading(false);
      }
    };
    fetchArchitect();
  }, [id]);

  // Determine if user can upload (owner)
  useEffect(() => {
    if (currentUser && architect) {
      setCanUpload(currentUser.id === architect.user_id);
    }
  }, [currentUser, architect]);

  // Fetch photos from storage
  const fetchPhotos = async () => {
    if (!id) return;
    setPhotoError(null);
    try {
      const folderName = `architect_${id}`;
      const { data, error } = await supabase.storage
        .from("Architects")
        .list(folderName, { limit: 100 });
      if (error) {
        console.error("Error listing files:", error);
        setPhotoError("Failed to load photos. Please refresh the page.");
        setPhotos([]);
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
    } catch (err) {
      console.error("Error fetching photos:", err);
      setPhotoError("Failed to load photos. Please refresh the page.");
      setPhotos([]);
    }
  };

  useEffect(() => {
    fetchPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Handle photo upload
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
        console.error("Upload error:", uploadError);
        setPhotoError("Failed to upload photo. Please try again.");
        return;
      }
      await fetchPhotos();
    } catch (err) {
      console.error("Error uploading photo:", err);
      setPhotoError("Failed to upload photo. Please try again.");
    } finally {
      setUploading(false);
      // reset file input value if desired (no ref here)
      // e.currentTarget.value = "";
    }
  };

  // Submit request (matches your supplied schema)
  const handleSubmitRequest = async () => {
    // Basic validation
    if (
      !clientName.trim() ||
      !location.trim() ||
      !phone.trim() ||
      !budget.trim() ||
      !projectType.trim()
    ) {
      alert("Please fill all required details (Name, Location, Phone, Budget, Project Type).");
      return;
    }

    setRequesting(true);

    try {
      const insertObj: any = {
        arcID: Number(id),
        client_name: clientName.trim(),
        location: location.trim(),
        phoneNumber: phone ? Number(phone) : null,
        status: "pending",
        budget: budget ? Number(budget) : null,
        message: message?.trim() || null,
        projectType: projectType.trim(),
        date: date || null,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("ArchitectRequest").insert([insertObj]);

      if (error) {
        console.error("Insert error:", error);
        throw error;
      }

      // success
      alert("Service request sent successfully!");
      setShowForm(false);

      // Clear inputs
      setClientName("");
      setLocation("");
      setPhone("");
      setBudget("");
      setProjectType("");
      setMessage("");
      setDate("");
    } catch (err) {
      console.error("Error creating request:", err);
      alert("Failed to send request. Please try again.");
    } finally {
      setRequesting(false);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-gray-600" />
      </div>
    );
  }

  // Architect not found
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

      {/* Banner */}
      <div className="relative w-full h-64 md:h-80 bg-gray-100">
        <img
          src={architect.image_url || photos[0] || "/placeholder-banner.jpg"}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25"></div>
      </div>

      {/* Profile */}
      <div className="max-w-6xl mx-auto p-6 -mt-20 relative z-10 bg-white rounded-2xl shadow-md">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={architect.image_url || "/placeholder-architect.jpg"}
            alt={architect.name}
            className="w-40 h-40 object-cover rounded-2xl shadow-md border-4 border-white"
          />
          <div className="flex flex-col flex-1">
            <h1 className="text-3xl font-bold text-purple-700">{architect.name}</h1>
            <p className="text-gray-700 mt-1">{architect.specialization}</p>
            <p className="text-gray-600 mt-3 leading-relaxed">{architect.description}</p>

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

            {/* Request button (only for non-owner) */}
            {!canUpload && (
              <button
                onClick={() => setShowForm(true)}
                disabled={requesting}
                className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
              >
                {requesting ? "Requesting..." : "Request Service"}
              </button>
            )}

            {photoError && <p className="text-red-500 text-sm mt-2">{photoError}</p>}
          </div>
        </div>
      </div>

      {/* Request Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold text-center mb-4 text-purple-700">Request Service</h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full"
              />

              <input
                type="text"
                placeholder="Your Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full"
              />

              <input
                type="number"
                placeholder="Project Budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full"
              />

              <input
                type="text"
                placeholder="Project Type (e.g., Home, Office)"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full"
              />

              <textarea
                placeholder="Message (Optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full"
                rows={3}
              />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full"
              />

              <button
                onClick={handleSubmitRequest}
                disabled={requesting}
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
              >
                {requesting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gallery */}
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Design Gallery</h2>

        {photos.length === 0 ? (
          <p className="text-center text-gray-500">No photos uploaded yet. Be the first to upload!</p>
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
