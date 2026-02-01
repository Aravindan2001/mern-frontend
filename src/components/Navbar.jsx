import {Link} from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navTitle">Task Management</div>

      <div className="navRight">
        <Link to="/add" className="btn btnPrimary" style={{ height: 44 }}>
          Add Task
        </Link>
      </div>
    </div>
  );
}

