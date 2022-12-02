import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Footer from "./footer";

const Layout = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          background: "black",
          padding: "5px 0 5px 5px",
          fontSize: "20px",
        }}
      >
        <div style={{ margin: "10px" }}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? "greenyellow" : "white",
            })}
          >
            Página Inicial
          </NavLink>
        </div>
        <div style={{ margin: "10px" }}>
          <NavLink
            to="/produtos"
            style={({ isActive }) => ({
              color: isActive ? "greenyellow" : "white",
            })}
          >
            Produtos
          </NavLink>
        </div>
        <div style={{ margin: "10px" }}>
          <NavLink
            to="/categorias"
            style={({ isActive }) => ({
              color: isActive ? "greenyellow" : "white",
            })}
          >
            Categorias
          </NavLink>
        </div>
      </div>

      <div className="navbar-nav mr-auto"></div>

      <Outlet />
    </>
  );
};

export default Layout;
