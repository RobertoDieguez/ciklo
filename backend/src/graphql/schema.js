const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const CamionModel = require("../mongo_models/camion");
const PilotoModel = require("../mongo_models/piloto");
const UsuarioModel = require("../mongo_models/usuario");
const PaqueteModel = require("../mongo_models/paquete");

const CamionType = new GraphQLObjectType({
  name: "Camion",
  fields: () => ({
    id: { type: GraphQLID }, //Las placas del camion
    marca: { type: GraphQLString },
    modelo: { type: GraphQLString },
    anio: { type: GraphQLString },
    color: { type: GraphQLString },
    piloto: {
      type: PilotoType,
      resolve(parent, args) {
        return PilotoModel.findById(parent.pilotoID);
      }
    }
  })
});

const PilotoType = new GraphQLObjectType({
  name: "Piloto",
  fields: () => ({
    id: { type: GraphQLID }, //Numero de DPI
    nombre: { type: GraphQLString },
    genero: { type: GraphQLString },
    edad: { type: GraphQLString },
    camion: {
      type: CamionType,
      resolve(parent, args) {
        return CamionModel.findById(parent.camionID);
      }
    }
  })
});

const UsuarioType = new GraphQLObjectType({
  name: "Usuario",
  fields: () => ({
    id: { type: GraphQLID }, //username
    nombre: { type: GraphQLString },
    genero: { type: GraphQLString },
    edad: { type: GraphQLString },
    privilegios: { type: GraphQLString },
    contrasena: { type: GraphQLString }
  })
});

const PaqueteType = new GraphQLObjectType({
  name: "Paquete",
  fields: () => ({
    id: { type: GraphQLID },
    data: { type: GraphQLString },
    destino: { type: GraphQLString },
    camion: {
      type: CamionType,
      resolve(parent, args) {
        return CamionModel.findById(parent.camionID);
      }
    },
    placedBy: {
      type: UsuarioType,
      resolve(parent, args) {
        return UsuarioModel.findById(parent.placedBy);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    Camion: {
      type: CamionType,
      args: { placas: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return CamionModel.findById(args.placas);
      }
    },
    Piloto: {
      type: PilotoType,
      args: { dpi: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return PilotoModel.findById(args.dpi);
      }
    },

    Usuario: {
      type: UsuarioType,
      args: { username: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return UsuarioModel.findById(args.username);
      }
    },
    Camiones: {
      type: new GraphQLList(CamionType),
      args: { number: { type: GraphQLInt } },
      resolve(parent, args) {
        return CamionModel.find({}).limit(args.number);
      }
    },
    Pilotos: {
      type: new GraphQLList(PilotoType),
      args: { number: { type: GraphQLInt } },
      resolve(parent, args) {
        return PilotoModel.find({}).limit(args.number);
      }
    },
    Usuarios: {
      type: new GraphQLList(UsuarioType),
      args: { number: { type: GraphQLInt } },
      resolve(parent, args) {
        return UsuarioModel.find({}).limit(args.number);
      }
    },
    Paquetes: {
      type: new GraphQLList(PaqueteType),
      args: { number: { type: GraphQLInt } },
      resolve(parent, args) {
        return PaqueteModel.find({}).limit(args.number);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCamion: {
      type: CamionType,
      args: {
        placas: { type: new GraphQLNonNull(GraphQLString) },
        marca: { type: new GraphQLNonNull(GraphQLString) },
        modelo: { type: new GraphQLNonNull(GraphQLString) },
        anio: { type: new GraphQLNonNull(GraphQLString) },
        color: { type: new GraphQLNonNull(GraphQLString) },
        pilotoID: { type: GraphQLString }
      },
      resolve(parent, args) {
        let camion = new CamionModel({
          _id: args.placas,
          marca: args.marca,
          modelo: args.modelo,
          anio: args.anio,
          color: args.color,
          pilotoID: args.pilotoID
        });
        return camion.save();
      }
    },

    addPiloto: {
      type: PilotoType,
      args: {
        dpi: { type: new GraphQLNonNull(GraphQLString) },
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        genero: { type: new GraphQLNonNull(GraphQLString) },
        edad: { type: new GraphQLNonNull(GraphQLString) },
        camionID: { type: GraphQLString }
      },
      resolve(parent, args) {
        let piloto = new PilotoModel({
          _id: args.dpi,
          nombre: args.nombre,
          genero: args.genero,
          edad: args.edad,
          camionID: args.camionID
        });
        return piloto.save();
      }
    },

    addUsuario: {
      type: UsuarioType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        genero: { type: new GraphQLNonNull(GraphQLString) },
        edad: { type: new GraphQLNonNull(GraphQLString) },
        privilegios: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let usuario = new UsuarioModel({
          _id: args.username,
          nombre: args.nombre,
          genero: args.genero,
          edad: args.edad,
          privilegios: args.privilegios
        });
        return usuario.save();
      }
    },

    addPaquete: {
      type: PaqueteType,
      args: {
        data: { type: new GraphQLNonNull(GraphQLString) },
        destino: { type: new GraphQLNonNull(GraphQLString) },
        camionID: { type: new GraphQLNonNull(GraphQLString) },
        placedBy: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let paquete = new PaqueteModel({
          data: args.data,
          destino: args.destino,
          camionID: args.camionID,
          placedBy: args.placedBy
        });
        return paquete.save();
      }
    },

    updatePiloto: {
      type: PilotoType,
      args: {
        dpi: { type: new GraphQLNonNull(GraphQLString) },
        nombre: { type: GraphQLString },
        genero: { type: GraphQLString },
        edad: { type: GraphQLString },
        camionID: { type: GraphQLString }
      },
      resolve(parent, args) {
        let newData = {};
        Object.entries(args).map(([key, value]) => {
          if (key != "dpi") {
            newData[key] = value;
          }
        });
        return PilotoModel.updateOne(
          { _id: args.dpi },
          { $set: newData },
          { upsert: true }
        )
          .then(() => console.log("Piloto updated"))
          .catch(error => console.log(error));
      }
    },

    updateCamion: {
      type: CamionType,
      args: {
        placas: { type: new GraphQLNonNull(GraphQLString) },
        marca: { type: GraphQLString },
        modelo: { type: GraphQLString },
        anio: { type: GraphQLString },
        color: { type: GraphQLString },
        pilotoID: { type: GraphQLString }
      },
      resolve(parent, args) {
        let newData = {};
        Object.entries(args).map(([key, value]) => {
          if (key != "placas") {
            newData[key] = value;
          }
        });
        return CamionModel.updateOne(
          { _id: args.placas },
          { $set: newData },
          { upsert: true }
        )
          .then(() => console.log("Camion updated"))
          .catch(error => console.log(error));
      }
    },
    updatePaquete: {
      type: PaqueteType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        data: { type: GraphQLString },
        destino: { type: GraphQLString },
        placedBy: { type: GraphQLString }
      },
      resolve(parent, args) {
        let newData = {};
        Object.entries(args).map(([key, value]) => {
          if (key != "id") {
            newData[key] = value;
          }
        });
        return PaqueteModel.updateOne(
          { _id: args.id },
          { $set: newData },
          { upsert: true }
        )
          .then(() => console.log("Paquete updated"))
          .catch(error => console.log(error));
      }
    },
    updateUsuario: {
      type: UsuarioType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLID) },
        nombre: { type: GraphQLString },
        genero: { type: GraphQLString },
        edad: { type: GraphQLString },
        privilegios: { type: GraphQLString },
        contrasena: { type: GraphQLString }
      },
      resolve(parent, args) {
        let newData = {};
        Object.entries(args).map(([key, value]) => {
          if (key != "username") {
            newData[key] = value;
          }
        });
        return UsuarioModel.updateOne(
          { _id: args.username },
          { $set: newData },
          { upsert: true }
        )
          .then(() => console.log("Paquete updated"))
          .catch(error => console.log(error));
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
