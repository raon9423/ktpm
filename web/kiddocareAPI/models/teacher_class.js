const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teacher_class', {
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'classes',
        key: 'id'
      }
    },
    assignment_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    tableName: 'teacher_class',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "teacher_id" },
          { name: "class_id" },
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
