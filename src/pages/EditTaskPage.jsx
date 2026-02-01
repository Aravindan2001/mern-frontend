import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { api } from "../api/api";
import { validateTitle } from "../utils/validateTitle";


export default function EditTaskPage() {

   const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [error, setError] = useState("");


  //get single Task
useEffect(() => {
  const fetchSingleTask = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await api.get(`/tasks/${id}`);
      setTitle(res.data.title || "");
      setDescription(res.data.description || "");
    } catch (err) {
      console.log(err);
      setError("Task not load. ID or Backend Issue?");
    } finally {
      setLoading(false);
    }
  };

  fetchSingleTask();
}, [id]);


//handleUpdate 
const handleUpdate = async () => {

const trimmedTitle = title.trim();

setTitle(trimmedTitle);
setError("");

const titleMsg = validateTitle(title);
if (titleMsg) {
  setError(titleMsg);
  return;
}


  try {
    setError("");
    setSaving(true);
    await api.patch(`/tasks/${id}`, { title: trimmedTitle, description });

    navigate("/"); // update ஆனதும் list page
  } catch (err) {
    console.log(err);
    setError("Update failed");
  }finally{
    setSaving(false);
  }
};



  return (
    <div style={{ background: "#F2F2F2", minHeight: "100vh" }}>
      <Navbar />
      <div style={{
  maxWidth: 800,
  width: "92%",
  margin: "20px auto",
  background: "white",
  padding: 24,
  borderRadius: 18
}}>

        <h2>Edit Task</h2>
        {error && <div style={styles.errorBox}>{error}</div>}


        {
        loading ? ( <p>Loading...</p>) : 
        (
        <div>
       <form>
<label style={styles.label}>Title</label>
<input
  style={styles.input}
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>

<label style={{ ...styles.label, marginTop: 16 }}>Description</label>
<textarea
  style={styles.textarea}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>

</form>

<div style={styles.btnRow}>
 <button type="button" 
 
 style={styles.updateBtn} 
 onClick={handleUpdate}
 disabled={saving || loading || !!error}

 >
    {saving ? "Updating..." : "Update"}
  Update
</button>


  <button
    type="button"
    style={styles.cancelBtn}
    onClick={() => navigate("/")}
  >
    Cancel
  </button>
</div>


        </div>
        )
        }
      </div>
    </div>
    );

    
}

const styles = {
  label: { display: "block", fontWeight: 700, marginBottom: 8 },
  input: {
    width: "100%",
    height: 48,
    borderRadius: 12,
    border: "1px solid #CBD5E1",
    background: "#F1F5F9",
    padding: "0 14px",
    outline: "none",
    fontSize: 15,
  },
  textarea: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    border: "1px solid #CBD5E1",
    background: "#F1F5F9",
    padding: 14,
    outline: "none",
    fontSize: 15,
    resize: "none",
  },

  btnRow: { 
    display: "flex",
    gap: 12, 
    marginTop: 20 },

updateBtn: {
  width: 220,
  height: 50,
  borderRadius: 22,
  border: "none",
  background: "#10B981",
  color: "white",
  fontWeight: 800,
  cursor: "pointer",
},
cancelBtn: {
  width: 160,
  height: 50,
  borderRadius: 22,
  border: "none",
  background: "#E5E7EB",
  fontWeight: 800,
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
