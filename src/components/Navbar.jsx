import {Link} from "react-router-dom";

export default function Navbar(){
    return(
        <div style={styles.nav}>
            <div style={styles.title}>Task Management</div>
            <Link to="/add" style={styles.addBtn}>
            Add Task
            </Link>

           
        </div>
    );
}

const styles = {
 nav: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 16px",
  flexWrap: "wrap",   // ✅ small screen-ல wrap ஆகும்
  gap: 12,
},
title: {
  fontSize: 22,
  fontWeight: 800,
},
right: {
  display: "flex",
  gap: 10,
  alignItems: "center",
},

  addBtn: {
    background: "#2563EB",
    color: "white",
    padding: "10px 18px",
    borderRadius: 22,
    textDecoration: "none",
    fontWeight: 600,

 }
};