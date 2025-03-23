const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('class_students', {
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'classes',
        key: 'id'
      }
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'students',
        key: 'id'
      }
    }
  }, {
    tableName: 'class_students',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "class_id" },
          { name: "student_id" },
        ]
      },
      {
        name: "student_id",
        using: "BTREE",
        fields: [
          { name: "student_id" },
        ]
      },
    ]
  });
};
