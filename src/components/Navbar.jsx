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
 nav:{
    height:70,
    background: "#6B667D",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px",
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: 1,
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