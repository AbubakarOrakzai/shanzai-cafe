import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AdminContext } from "../Context/AdminContext";
import {
  HiOutlineViewGrid,
  HiOutlinePlusCircle,
  HiOutlineCube,
  HiOutlineMail,
  HiOutlineLogout,
} from "react-icons/hi";
import "./Sidebar.css";

function Sidebar() {
  const { logout } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `sidebar-link ${isActive ? "sidebar-link-active" : ""}`;

  return (
    <aside className="sidebar">
      <p className="sidebar-logo">
        Shan<span className="sidebar-logo-accent">zai</span>
      </p>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={linkClass}>
          <HiOutlineViewGrid /> Dashboard
        </NavLink>
        <NavLink to="/new-order" className={linkClass}>
          <HiOutlinePlusCircle /> New Order
        </NavLink>
        <NavLink to="/products" className={linkClass}>
          <HiOutlineCube /> Products
        </NavLink>
        <NavLink to="/messages" className={linkClass}>
          <HiOutlineMail /> Messages
        </NavLink>
      </nav>

      <button className="sidebar-logout" onClick={handleLogout}>
        <HiOutlineLogout /> Logout
      </button>
    </aside>
  );
}

export default Sidebar;