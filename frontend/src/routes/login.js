import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

export default function(props) {
  const initialState = {
    usuario: "",
    contrasena: "",
    tipo: "Empleado"
  };

  const [credentials, setCredentials] = useState(initialState);

  return (
    <div>
      <div>
        <h1
          style={{
            textAlign: "center",
            fontFamily: "Permanent Marker",
            marginTop: "150px"
          }}
        >
          CIKLO
        </h1>
      </div>
      <div style={{ margin: "10%" }}>
        <Form>
          <Form.Control
            placeholder="Nombre de usuario"
            onChange={e =>
              setCredentials({ ...credentials, usuario: e.target.value })
            }
            required
          />
          <br />
          <Form.Control
            placeholder="Contraseña"
            type="password"
            onChange={e =>
              setCredentials({ ...credentials, contrasena: e.target.value })
            }
            required
          />
          <br />
          <Dropdown>
            <Dropdown.Toggle variant="info">{credentials.tipo}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={e =>
                  setCredentials({ ...credentials, tipo: "Administrador" })
                }
              >
                Administrador
              </Dropdown.Item>
              <Dropdown.Item
                onClick={e =>
                  setCredentials({ ...credentials, tipo: "Empleado" })
                }
              >
                Empleado
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <br />
          <Link to="/app">
            <Button variant="outline-info">Ingresar</Button>
          </Link>
        </Form>
      </div>
    </div>
  );
}
