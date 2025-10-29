import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Define a TypeScript interface for the project
interface Project {
  id: string | number;
  arcID: string | number;
  project_Name: string;
  client_name: string;
  price: number;
  status: "active" | "completed" | string;
  created_at: string;
}

export default function ArchitectDashboard() {
  const { user, userRole, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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

      // ✅ Explicitly type the response to avoid deep type inference
      const {
        data: architectData,
        error: architectError,
      } = await supabase
        .from("architects")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (architectError || !architectData) {
        console.error("Error fetching architect:", architectError);
        setProjects([]);
        setLoading(false);
        return;
      }

      const architectId = architectData.id;

      // ✅ Explicit type annotation again to avoid inference recursion
      const {
        data: projectsData,
        error: projectsError,
      }: { data: Project[] | null; error: any } = await supabase
        .from("ArchitectRequest")
        .select("*")
        .eq("arcID", architectId)
        .order("created_at", { ascending: false });

      if (projectsError) {
        console.error("Error fetching projects:", projectsError);
        setProjects([]);
      } else {
        setProjects(projectsData || []);
      }
      setLoading(false);
    };

    fetchProjects();
  }, [user, userRole, authLoading, navigate]);

  if (authLoading || loading) {
    return <p className="p-6 text-lg">Loading dashboard...</p>;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">🏗️ Architect CRM Dashboard</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <p>Total Projects</p>
          <p className="text-2xl font-bold">{projects.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p>Active Projects</p>
          <p className="text-2xl font-bold">
            {projects.filter((p) => p.status === "active").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p>Completed Projects</p>
          <p className="text-2xl font-bold">
            {projects.filter((p) => p.status === "completed").length}
          </p>
        </div>
      </div>

      {/* Project Table */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl mb-4">Your Projects</h2>
        {projects.length > 0 ? (
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Client</th>
                <th className="px-4 py-2 border-b">Price</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Created</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{p.project_Name}</td>
                  <td className="px-4 py-2 border-b">{p.client_name}</td>
                  <td className="px-4 py-2 border-b">₹{p.price}</td>
                  <td
                    className={`px-4 py-2 border-b font-semibold ${p.status === "active" ? "text-green-600" : "text-gray-500"
                      }`}
                  >
                    {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {new Date(p.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
}
