const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('students', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('male','female'),
      allowNull: false
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'classes',
        key: 'id'
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    tableName: 'students',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "parent_id",
        using: "BTREE",
        fields: [
          { name: "parent_id" },
        ]
      },
      {
        name: "class_id",
        using: "BTREE",
        fields: [
          { name: "class_id" },
        ]
      },
    ]
  });
};
