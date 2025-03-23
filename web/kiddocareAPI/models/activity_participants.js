const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('activity_participants', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'extracurricular_activities',
        key: 'id'
      }
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'students',
        key: 'id'
      }
    }
  }, {
    tableName: 'activity_participants',
    timestamps: false,
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
        name: "activity_id",
        using: "BTREE",
        fields: [
          { name: "activity_id" },
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
