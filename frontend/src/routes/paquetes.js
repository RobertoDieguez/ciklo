import React from "react";
import Table from "react-bootstrap/Table";
import { useQuery } from "react-apollo";
import { paquetes } from "../graphql/queries";

function Paquete(props) {
  return (
    <tr>
      <th>{props.id}</th>
      <th>{props.data}</th>
      <th>{props.destino}</th>
      <th>{props.camion.id}</th>
      <th>{props.camion.piloto.nombre}</th>
      <th>{props.placedBy.nombre}</th>
    </tr>
  );
}

export default function(props) {
  const { loading, error, data } = useQuery(paquetes);

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>
            <h4>ID</h4>
          </th>
          <th>
            <h4>Objecto</h4>
          </th>
          <th>
            <h4>Destino</h4>
          </th>
          <th>
            <h4>Camion</h4>
          </th>
          <th>
            <h4>Piloto</h4>
          </th>
          <th>
            <h4>Puesto Por</h4>
          </th>
        </tr>
      </thead>
      <tbody>
        {loading
          ? null
          : data.Paquetes.map(paquete => <Paquete {...paquete} />)}
      </tbody>
    </Table>
  );
}
