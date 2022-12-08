import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddCatalogo from "./components/add-catalogo.component";
import Catalogo from "./components/catalogo.component";
import CatalogosList from "./components/catalogos-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/catalogos"} className="navbar-brand">
            Proyecto_Integracion_Continua
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/catalogos"} className="nav-link">
                Catalogos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<CatalogosList/>} />
            <Route path="/catalogos" element={<CatalogosList/>} />
            <Route path="/add" element={<AddCatalogo/>} />
            <Route path="/catalogos/:id" element={<Catalogo/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
