const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teacher_activities', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'activities',
        key: 'id'
      }
    }
  }, {
    tableName: 'teacher_activities',
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
        name: "teacher_id",
        using: "BTREE",
        fields: [
          { name: "teacher_id" },
        ]
      },
      {
        name: "activity_id",
        using: "BTREE",
        fields: [
          { name: "activity_id" },
        ]
      },
    ]
  });
};
