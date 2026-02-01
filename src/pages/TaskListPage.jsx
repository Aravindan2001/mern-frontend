import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function TaskListPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
const [error, setError] = useState("");

  // ✅ stable function (reusable after delete too)
  const fetchTasks = useCallback(async (signal) => {
    setError("");

    try {
        setError("");
      setLoading(true);
      const res = await api.get("/tasks", { signal }); // ✅ abort support
      setTasks(res.data.reverse());

    } catch (err) {
      // ✅ ignore abort error (happens on unmount or fast route changes)
      if (err?.name === "CanceledError" || err?.name === "AbortError") return;

      console.log(err);
      setError("Task Not Loaded Check  is Running or not");

    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ real-world mount fetch + cleanup
  useEffect(() => {
    const controller = new AbortController();
    fetchTasks(controller.signal);

    return () => controller.abort(); // ✅ prevents memory leaks
  }, [fetchTasks]);

  const handleDelete = async (id) => {
    const ok = window.confirm("Confirm to Delete ?");
    if (!ok) return;

    try {
      await api.delete(`/tasks/${id}`);
      // ✅ re-fetch (fresh list)
      const controller = new AbortController();
      fetchTasks(controller.signal);
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (

    
    <div style={styles.page}>
      <Navbar />
      <div style={styles.card}>
        <h2 style={styles.heading}>My Tasks</h2>
        {error && <div style={styles.errorBox}>{error}</div>}

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
  <p style={{ color: "#6B7280" }}>Server not reachable.</p>
): tasks.length === 0 ? (
          <p>No Tasks Yet. Add the New task</p>
        ) : (
          <div style={styles.list}>
            {tasks.map((t) => (
              <div key={t._id} style={styles.row}>
                <div>
                  <div style={styles.taskTitle}>{t.title}</div>
                  <div style={styles.taskDesc}>{t.description}</div>
                </div>

                <div style={styles.actions}>
                  <button
                    style={styles.editBtn}
                    onClick={() => navigate(`/edit/${t._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    style={styles.delBtn}
                    onClick={() => handleDelete(t._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { background: "#F2F2F2", minHeight: "100vh" },
card: {
  maxWidth: 1100,        // பெரிய screen-ல limit
  width: "92%",          // phone/tablet-ல fit ஆகும்
  margin: "30px auto",
  background: "white",
  borderRadius: 18,
  padding: 24,
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
},
  heading: { margin: 0, marginBottom: 18 },
  list: { display: "flex", flexDirection: "column", gap: 12 },
  row: {
    background: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: 14,
    padding: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskTitle: { fontSize: 18, fontWeight: 700 },
  taskDesc: { fontSize: 14, color: "#4B5563", marginTop: 4 },
  actions: { display: "flex", gap: 10 },
  editBtn: {
    width: 90,
    height: 40,
    borderRadius: 12,
    border: "none",
    background: "#E5E7EB",
    fontWeight: 600,
    cursor: "pointer",
  },
  delBtn: {
    width: 100,
    height: 40,
    borderRadius: 12,
    border: "none",
    background: "#EF4444",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  },
  errorBox: {
  background: "#FEE2E2",
  border: "1px solid #EF4444",
  color: "#991B1B",
  padding: "12px 14px",
  borderRadius: 12,
  marginBottom: 14,
  fontWeight: 600,
},

};
