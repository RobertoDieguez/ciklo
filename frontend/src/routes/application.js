import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import Inicio from "../routes/inicio";
import Paquetes from "../routes/paquetes";
import Camiones from "../routes/camiones";
import Pilotos from "../routes/pilotos";
import Usuarios from "../routes/usuarios";

export default function(props) {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/app" component={Inicio} />
        <Route path="/inicio" component={Inicio} />
        <Route path="/paquetes" component={Paquetes} />
        <Route path="/camiones" component={Camiones} />
        <Route path="/pilotos" component={Pilotos} />
        <Route path="/usuarios" component={Usuarios} />
      </Switch>
    </BrowserRouter>
  );
}
