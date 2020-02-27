import React from "react";
import Table from "react-bootstrap/Table";
import { useQuery } from "react-apollo";
import { camiones } from "../graphql/queries";

function Item(props) {
  return (
    <tr>
      <th>{props.id}</th>
      <th>{props.marca}</th>
      <th>{props.modelo}</th>
      <th>{props.anio}</th>
      <th>{props.color}</th>
      <th>{props.piloto.nombre}</th>
    </tr>
  );
}

export default function(props) {
  const { loading, error, data } = useQuery(camiones);

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>
            <h4>Placas</h4>
          </th>
          <th>
            <h4>Marca</h4>
          </th>
          <th>
            <h4>Modelo</h4>
          </th>
          <th>
            <h4>Año</h4>
          </th>
          <th>
            <h4>Color</h4>
          </th>
          <th>
            <h4>Piloto</h4>
          </th>
        </tr>
      </thead>
      <tbody>
        {loading ? null : data.Camiones.map(item => <Item {...item} />)}
      </tbody>
    </Table>
  );
}
