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

interface Project {
  id: string | number;
  arcID: string | number;
  projectType: string;     // NEW
  client_name: string;
  budget: number;          // NEW
  status: string;
}

export default function ArchitectDashboard() {
  const { user, userRole, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [architectName, setArchitectName] = useState<string>("");
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editedProject, setEditedProject] = useState<Partial<Project>>({});

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/auth/login");
      return;
    }
    if (userRole !== "architect") {
      navigate("/");
      return;
    }

    const fetchProjects = async () => {
      setLoading(true);

      const { data: architectData } = await supabase
        .from("architects")
        .select("id, name")
        .eq("user_id", user.id)
        .single();

      if (!architectData) {
        setProjects([]);
        setLoading(false);
        return;
      }

      setArchitectName(architectData.name || "Architect");

      const { data: projectsData } = await supabase
        .from("ArchitectRequest")
        .select("id, arcID, projectType, client_name, budget, status")
        .eq("arcID", architectData.id)
        .order("id", { ascending: false });

      setProjects(projectsData || []);
      setLoading(false);
    };

    fetchProjects();
  }, [user, userRole, authLoading, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate("/auth/login");
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setEditedProject({ ...project });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedProject({});
  };

  const handleSave = async (id: string | number) => {
    const { error } = await supabase
      .from("ArchitectRequest")
      .update({
        projectType: editedProject.projectType,
        budget: editedProject.budget,
        client_name: editedProject.client_name,
        status: editedProject.status,
      })
      .eq("id", Number(id));

    if (!error) {
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...editedProject } : p))
      );
      setEditingId(null);
      setEditedProject({});
    }
  };

  const handleComplete = async (id: string | number) => {
    await supabase
      .from("ArchitectRequest")
      .update({ status: "completed" })
      .eq("id", Number(id));

    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "completed" } : p))
    );
  };

  const activeProjects = projects.filter((p) => p.status !== "completed");
  const completedProjects = projects.filter((p) => p.status === "completed");

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
          {architectName}'s Dashboard
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
              title: "Total Projects",
              count: projects.length,
              gradient: "from-blue-500 to-blue-700",
              icon: "📁",
            },
            {
              title: "Active Projects",
              count: activeProjects.length,
              gradient: "from-green-500 to-emerald-600",
              icon: "⚙️",
            },
            {
              title: "Completed Projects",
              count: completedProjects.length,
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

        {/* Active Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-4 md:p-6 border border-gray-100 overflow-x-auto"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            🔧 Active Projects
          </h2>
          {activeProjects.length > 0 ? (
            <table className="min-w-full border-separate border-spacing-y-2 text-sm md:text-base">
              <thead>
                <tr className="text-gray-500 uppercase text-xs md:text-sm">
                  <th className="px-3 py-2 text-left">Project</th>
                  <th className="px-3 py-2 text-left">Client</th>
                  <th className="px-3 py-2 text-left">Budget</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {activeProjects.map((p) => (
                  <motion.tr
                    key={p.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-gray-50 hover:bg-gray-100 transition rounded-xl shadow-sm"
                  >
                    {/* Project Name */}
                    <td className="px-3 py-3 font-medium">
                      {editingId === p.id ? (
                        <input
                          value={editedProject.projectType || ""}
                          onChange={(e) =>
                            setEditedProject({
                              ...editedProject,
                              projectType: e.target.value,
                            })
                          }
                          className="border p-2 rounded w-full"
                        />
                      ) : (
                        p.projectType
                      )}
                    </td>

                    {/* Client */}
                    <td className="px-3 py-3">
                      {editingId === p.id ? (
                        <input
                          value={editedProject.client_name || ""}
                          onChange={(e) =>
                            setEditedProject({
                              ...editedProject,
                              client_name: e.target.value,
                            })
                          }
                          className="border p-2 rounded w-full"
                        />
                      ) : (
                        p.client_name
                      )}
                    </td>

                    {/* Budget */}
                    <td className="px-3 py-3">
                      {editingId === p.id ? (
                        <input
                          type="number"
                          value={editedProject.budget || ""}
                          onChange={(e) =>
                            setEditedProject({
                              ...editedProject,
                              budget: Number(e.target.value),
                            })
                          }
                          className="border p-2 rounded w-full"
                        />
                      ) : (
                        `₹${p.budget}`
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-3 py-3">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          p.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-3 py-3 flex gap-3">
                      {editingId === p.id ? (
                        <>
                          <button
                            onClick={() => handleSave(p.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Save size={18} />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X size={18} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(p)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleComplete(p.id)}
                            className="text-gray-700 hover:text-gray-900"
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
              No active projects found.
            </p>
          )}
        </motion.div>

        {/* Completed Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-4 md:p-6 border border-gray-100 overflow-x-auto"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            🏁 Completed Projects
          </h2>

          {completedProjects.length > 0 ? (
            <table className="min-w-full border-separate border-spacing-y-2 text-sm md:text-base">
              <thead>
                <tr className="text-gray-500 uppercase text-xs md:text-sm">
                  <th className="px-3 py-2 text-left">Project</th>
                  <th className="px-3 py-2 text-left">Client</th>
                  <th className="px-3 py-2 text-left">Budget</th>
                </tr>
              </thead>
              <tbody>
                {completedProjects.map((p) => (
                  <motion.tr
                    key={p.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-gray-50 hover:bg-gray-100 transition rounded-xl shadow-sm"
                  >
                    <td className="px-3 py-3 font-medium">{p.projectType}</td>
                    <td className="px-3 py-3">{p.client_name}</td>
                    <td className="px-3 py-3">₹{p.budget}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600 text-center py-4">
              No completed projects yet.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
