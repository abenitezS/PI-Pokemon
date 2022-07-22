const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('pokemon', {
    id: { //data.id
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: { //data.name
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
     validate:{
      is: /^([a-zA-Z]+)(\s[a-zA-Z]+)*$/
    },
    },
    hp: { //data.stats[0].base_stat
      type: DataTypes.INTEGER,
      allowNull: true,
    validate:{
      min:10,
      max:200
    },  
    },
    attack: { //data.stats[1].base_stat
      type: DataTypes.INTEGER,
      allowNull: true,
      validate:{
        min:5,
        max:190
    },
    },
    defense: {  //data.stats[2].base_stat
      type: DataTypes.INTEGER,
      allowNull: true,
      validate:{
        min:5,
        max:250
    },
    },
    speed: { //data.stats[5].base_stat
      type: DataTypes.INTEGER,
      allowNull: true,
      validate:{
        min:5,
        max:180
      
    },
  },
    height: { //data.height
      type: DataTypes.FLOAT,
      allowNull: true,
      validate:{
        min:0.1,
        max:15.0
    }
  },
    weight: { //data.weight
      type: DataTypes.FLOAT,
      allowNull: true,
      validate:{
        min:0.1,
        max:1000.0
     }
    },
    image: { //data.sprites.front_default
      type: DataTypes.STRING
    },
    createdInDB: { //si tiene esta prop, es creado
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {
    timestamps: false
  });
};