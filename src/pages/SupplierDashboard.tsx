import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  LogOut,
  Edit2,
  Save,
  X,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

interface SupplierRequest {
  id: number;
  mat_id: number | null;
  client_name: string | null;
  material_required: string | null;
  created_at: string;
  material_supplier?: {
    id?: number;
    name?: string;
  };
  status?: string;
}

export default function SupplierDashboard() {
  const { user, userRole, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  const [requests, setRequests] = useState<SupplierRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [supplierName, setSupplierName] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedRequest, setEditedRequest] = useState<Partial<SupplierRequest>>(
    {}
  );

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/auth/login");
      return;
    }
    if (userRole !== "supplier") {
      navigate("/");
      return;
    }

    const fetchSupplierData = async () => {
      setLoading(true);
      try {
        const { data: supplierData } = await supabase
          .from("material_supplier")
          .select("id, name")
          .eq("user_id", user.id)
          .single();

        if (!supplierData) {
          setRequests([]);
          setLoading(false);
          return;
        }

        setSupplierName(supplierData.name || "Supplier");

        const { data, error } = await supabase
          .from("material_supplier_request")
          .select(
            `
              id,
              client_name,
              material_required,
              created_at,
              mat_id,
              status,
              material_supplier (
                id,
                name
              )
            `
          )
          .eq("mat_id", supplierData.id)
          .order("id", { ascending: false });

        if (error) console.error("Error fetching requests:", error.message);

        setRequests(
          (data as SupplierRequest[])?.map((r) => ({
            ...r,
            status: r.status || "pending",
          })) || []
        );
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplierData();
  }, [user, userRole, authLoading, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate("/auth/login");
  };

  const handleEdit = (req: SupplierRequest) => {
    setEditingId(req.id);
    setEditedRequest({ ...req });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedRequest({});
  };

  const handleSave = async (id: number) => {
    const { error } = await supabase
      .from("material_supplier_request")
      .update({
        client_name: editedRequest.client_name,
        material_required: editedRequest.material_required,
      })
      .eq("id", id);

    if (!error) {
      setRequests((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...editedRequest } : p))
      );
      setEditingId(null);
      setEditedRequest({});
    }
  };

  // Updates status in Supabase + UI
  const handleComplete = async (id: number) => {
    try {
      const { error } = await supabase
        .from("material_supplier_request")
        .update({ status: "completed" })
        .eq("id", id);

      if (error) {
        console.error("Error updating status:", error.message);
        return;
      }

      // Update status locally in UI
      setRequests((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "completed" } : p))
      );
    } catch (err) {
      console.error("Unexpected error while completing request:", err);
    }
  };

  const activeRequests = requests.filter((r) => r.status !== "completed");
  const completedRequests = requests.filter((r) => r.status === "completed");

  if (authLoading || loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700 text-lg">
        Loading dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 font-inter text-gray-900">
      {/* Navbar */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-md bg-white/70 shadow-sm sticky top-0 z-10 flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-200"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-blue-600 font-medium hover:underline"
        >
          <ArrowLeft size={18} /> Back
        </button>
        <h1 className="text-base md:text-xl font-semibold tracking-tight text-center">
          {supplierName}'s Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-red-600 font-medium hover:underline"
        >
          <LogOut size={18} /> Logout
        </button>
      </motion.div>

      {/* Dashboard Content */}
      <div className="p-4 md:p-8 space-y-10 max-w-6xl mx-auto">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {[
            {
              title: "Total Requests",
              count: requests.length,
              gradient: "from-blue-500 to-blue-700",
              icon: "📦",
            },
            {
              title: "Active Requests",
              count: activeRequests.length,
              gradient: "from-green-500 to-emerald-600",
              icon: "⚙️",
            },
            {
              title: "Completed Requests",
              count: completedRequests.length,
              gradient: "from-purple-500 to-indigo-600",
              icon: "✅",
            },
          ].map((card, i) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              key={i}
              className={`bg-gradient-to-br ${card.gradient} text-white rounded-2xl p-5 shadow-lg`}
            >
              <div className="flex justify-between items-center">
                <p className="text-sm uppercase tracking-wide opacity-80">
                  {card.title}
                </p>
                <span className="text-2xl">{card.icon}</span>
              </div>
              <p className="text-3xl md:text-4xl font-bold mt-3">{card.count}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Active Requests */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-4 md:p-6 border border-gray-100 overflow-x-auto"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            🔧 Active Requests
          </h2>
          {activeRequests.length > 0 ? (
            <table className="min-w-full border-separate border-spacing-y-2 text-sm md:text-base">
              <thead>
                <tr className="text-gray-500 uppercase text-xs md:text-sm">
                  <th className="px-3 py-2 text-left">Client</th>
                  <th className="px-3 py-2 text-left">Material</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {activeRequests.map((r) => (
                  <motion.tr
                    key={r.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-gray-50 hover:bg-gray-100 transition rounded-xl shadow-sm"
                  >
                    <td className="px-3 py-3 font-medium">
                      {editingId === r.id ? (
                        <input
                          value={editedRequest.client_name || ""}
                          onChange={(e) =>
                            setEditedRequest({
                              ...editedRequest,
                              client_name: e.target.value,
                            })
                          }
                          className="border p-2 rounded w-full"
                        />
                      ) : (
                        r.client_name
                      )}
                    </td>

                    <td className="px-3 py-3">
                      {editingId === r.id ? (
                        <input
                          value={editedRequest.material_required || ""}
                          onChange={(e) =>
                            setEditedRequest({
                              ...editedRequest,
                              material_required: e.target.value,
                            })
                          }
                          className="border p-2 rounded w-full"
                        />
                      ) : (
                        r.material_required
                      )}
                    </td>

                    <td className="px-3 py-3">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          r.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {r.status || "pending"}
                      </span>
                    </td>

                    <td className="px-3 py-3 flex gap-3">
                      {editingId === r.id ? (
                        <>
                          <button
                            onClick={() => handleSave(r.id)}
                            className="text-green-600 hover:text-green-700"
                            title="Save"
                          >
                            <Save size={18} />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-red-600 hover:text-red-700"
                            title="Cancel"
                          >
                            <X size={18} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(r)}
                            className="text-blue-600 hover:text-blue-700"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleComplete(r.id)}
                            className="text-gray-700 hover:text-gray-900"
                            title="Mark Completed"
                          >
                            <CheckCircle size={18} />
                          </button>
                        </>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600 text-center py-4">
              No active requests found.
            </p>
          )}
        </motion.div>

        {/* Completed Requests */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-4 md:p-6 border border-gray-100 overflow-x-auto"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            🏁 Completed Requests
          </h2>
          {completedRequests.length > 0 ? (
            <table className="min-w-full border-separate border-spacing-y-2 text-sm md:text-base">
              <thead>
                <tr className="text-gray-500 uppercase text-xs md:text-sm">
                  <th className="px-3 py-2 text-left">Client</th>
                  <th className="px-3 py-2 text-left">Material</th>
                </tr>
              </thead>
              <tbody>
                {completedRequests.map((r) => (
                  <motion.tr
                    key={r.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-gray-50 hover:bg-gray-100 transition rounded-xl shadow-sm"
                  >
                    <td className="px-3 py-3 font-medium">{r.client_name}</td>
                    <td className="px-3 py-3">{r.material_required}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600 text-center py-4">
              No completed requests yet.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}