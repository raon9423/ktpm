const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student_vaccines', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'students',
        key: 'id'
      }
    },
    vaccine_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vaccines',
        key: 'id'
      }
    },
    vaccination_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('completed','pending','failed'),
      allowNull: false
    }
  }, {
    tableName: 'student_vaccines',
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
        name: "student_id",
        using: "BTREE",
        fields: [
          { name: "student_id" },
        ]
      },
      {
        name: "vaccine_id",
        using: "BTREE",
        fields: [
          { name: "vaccine_id" },
        ]
      },
    ]
  });
};
