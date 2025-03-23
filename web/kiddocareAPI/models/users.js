const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const Users = sequelize.define(
    "users",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: "username",
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: "email",
      },
      password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      avt_link: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      full_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "users",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "username",
          unique: true,
          using: "BTREE",
          fields: [{ name: "username" }],
        },
        {
          name: "email",
          unique: true,
          using: "BTREE",
          fields: [{ name: "email" }],
        },
      ],
    }
  );
  
  return Users;
};
