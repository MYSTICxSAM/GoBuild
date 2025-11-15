import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ContractorFormProps {
  onSuccess: () => void;
}

const ContractorForm: React.FC<ContractorFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    Name: "",
    PhoneNo: "",
    Description: "",
    Specialization: "",
    location: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ---------------- IMAGE UPLOAD FUNCTION ----------------
  const handleImageUpload = async () => {
    if (!imageFile) return null;

    const fileName = `contractor_${Date.now()}_${imageFile.name}`;

    const { data, error } = await supabase.storage
      .from("contractor")
      .upload(fileName, imageFile);

    if (error) {
      console.log(error);
      alert("Image upload failed!");
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("contractor")
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const uploadedImageUrl = await handleImageUpload();
    const user = (await supabase.auth.getUser()).data.user;

    const { error } = await supabase.from("contractors_register").insert([
      {
        Name: formData.Name,
        Phone_No: formData.PhoneNo,
        Description: formData.Description,
        Specialization: formData.Specialization,
        location: formData.location,
        image_url: uploadedImageUrl || null,
        user_id: user?.id || null,
      },
    ]);

    setLoading(false);

    if (error) {
      console.log(error);
      alert("Error saving contractor!");
    } else {
      alert("Contractor Registered Successfully!");
      onSuccess(); // parent ko inform
      setFormData({
        Name: "",
        PhoneNo: "",
        Description: "",
        Specialization: "",
        location: "",
      });
      setImageFile(null);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="block text-lg font-semibold">Name</label>
        <input
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Your Name"
          required
        />
      </div>

      <div>
        <label className="block text-lg font-semibold">Phone Number</label>
        <input
          name="PhoneNo"
          type="number"
          value={formData.PhoneNo}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Enter Phone Number"
          required
        />
      </div>

      <div>
        <label className="block text-lg font-semibold">Specialization</label>
        <input
          name="Specialization"
          value={formData.Specialization}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Mason, Electrician, Plumber..."
          required
        />
      </div>

      <div>
        <label className="block text-lg font-semibold">Location</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Your city / Area"
        />
      </div>

      <div>
        <label className="block text-lg font-semibold">Description</label>
        <textarea
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg h-28"
          placeholder="Describe your work experience"
        />
      </div>

      <div>
        <label className="block text-lg font-semibold">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="w-full border p-3 rounded-lg bg-gray-50"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-600 text-white py-3 rounded-lg font-bold hover:bg-yellow-700 transition"
      >
        {loading ? "Submitting..." : "Register Contractor"}
      </button>
    </form>
  );
};

export default ContractorForm;
