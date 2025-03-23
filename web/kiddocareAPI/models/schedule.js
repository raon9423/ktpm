const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('schedule', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'classes',
        key: 'id'
      }
    },
    day_of_week: {
      type: DataTypes.ENUM('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'),
      allowNull: false
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'schedule',
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
        name: "class_id",
        using: "BTREE",
        fields: [
          { name: "class_id" },
        ]
      },
      {
        name: "teacher_id",
        using: "BTREE",
        fields: [
          { name: "teacher_id" },
        ]
      },
    ]
  });
};
