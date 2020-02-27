import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default function(props) {
  return (
    <Navbar expand="lg">
      <Navbar.Brand>
        <h1 style={{ fontFamily: "Permanent Marker", color: "#0891a6" }}>
          CIKLO
        </h1>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link
            to="/inicio"
            style={{ color: "black", padding: "10px", fontFamily: "Viga" }}
          >
            Inicio
          </Link>
          <Link
            to="/paquetes"
            style={{ color: "black", padding: "10px", fontFamily: "Viga" }}
          >
            Paquetes
          </Link>
          <Link
            to="/camiones"
            style={{ color: "black", padding: "10px", fontFamily: "Viga" }}
          >
            Camiones
          </Link>
          <Link
            to="/pilotos"
            style={{ color: "black", padding: "10px", fontFamily: "Viga" }}
          >
            Pilotos
          </Link>
          <Link
            to="/usuarios"
            style={{ color: "black", padding: "10px", fontFamily: "Viga" }}
          >
            Usuarios
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
