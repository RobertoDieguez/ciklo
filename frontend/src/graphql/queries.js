import { gql } from "apollo-boost";

const paquetes = gql`
  query {
    Paquetes {
      id
      data
      destino
      camion {
        id
        piloto {
          nombre
        }
      }
      placedBy {
        nombre
      }
    }
  }
`;

const camiones = gql`
  query {
    Camiones {
      id
      marca
      modelo
      anio
      color
      piloto {
        nombre
      }
    }
  }
`;

export { paquetes, camiones };
