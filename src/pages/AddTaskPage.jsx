import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { api } from "../api/api";
import { validateTitle } from "../utils/validateTitle";


export default function AddTaskPage() {

const navigate = useNavigate();
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [saving, setSaving] = useState(false);
const [error, setError] = useState("");
const [titleError, setTitleError] = useState("");
const [descriptionError, setDescriptionError] = useState("");
const handleSave = async (e) => {
const trimmedTitle = title.trim();

setTitle(trimmedTitle);
setError("");
e.preventDefault();
setTitleError("");
setDescriptionError("");

const titleMsg = validateTitle(title);
if (titleMsg) {
  setTitleError(titleMsg);
  return;
}

if (!title.trim()) {
  setTitleError("Title required");
  return;
}
if (!description.trim()) {
  setDescriptionError("Description required");
  return;
}
if (title.trim().length < 3) {
  setTitleError("Title Must be  3 letters");
  return;
}
if (description.trim().length < 10) {
  setDescriptionError("Description Must be  10 letters");
  return;
}


try {
    setError("");
    setSaving(true);
    await api.post("/tasks", { title: trimmedTitle, description });

    // save ஆனதும் list page-க்கு போ
    navigate("/");
} catch (err) {
    console.log(err);
    setError("Save failed");
} finally {
    setSaving(false);
}
};

  return (

    <div style={styles.page}>
      <Navbar />

      <div style={styles.card}>
        <h2 style={styles.heading}>Add New Task</h2>
        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSave}>
          <label style={styles.label}>Title</label>
          <input style={titleError ? { ...styles.input, ...styles.inputError } : styles.input}

            value={title}
            onChange={(e) => {
            setTitle(e.target.value);
            if (titleError) setTitleError("");
        }}
            placeholder="Enter task title"
          />
          {titleError && <p style={styles.errorText}>{titleError}</p>}


          <label style={{ ...styles.label, marginTop: 16 }}>Description</label>
        <textarea
  style={
    descriptionError
      ? { ...styles.textarea, ...styles.inputError }
      : styles.textarea
  }
  value={description}
  onChange={(e) => {
    setDescription(e.target.value);
    if (descriptionError) setDescriptionError("");
  }}
  placeholder="Enter description"
/>

            {descriptionError && <p style={styles.errorText}>{descriptionError}</p>}
          <div style={styles.btnRow}>
            <button type="submit" style={styles.saveBtn} disabled={saving}>
              {saving ? "Saving..." : "Save Task"}
            </button>

            <button
              type="button"
              style={styles.cancelBtn}
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: { background: "#F2F2F2", minHeight: "100vh" },
 card: {
  maxWidth: 800,
  width: "92%",
  margin: "20px auto",
  background: "white",
  borderRadius: 18,
  padding: 28,
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
},

  heading: { margin: 0, marginBottom: 20 },
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
  btnRow: { display: "flex", gap: 12, marginTop: 20 },
  saveBtn: {
    width: 220,
    height: 50,
    borderRadius: 22,
    border: "none",
    background: "#2563EB",
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
errorText: {
  margin: "8px 0 0",
  color: "#B91C1C",
  fontWeight: 600,
  fontSize: 14,
},
inputError: {
  border: "1px solid #EF4444",
  background: "#FEF2F2",
},

};
