const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('health_records', {
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
    height: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    },
    weight: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    },
    health_notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    recorded_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    tableName: 'health_records',
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
        name: "student_id",
        using: "BTREE",
        fields: [
          { name: "student_id" },
        ]
      },
    ]
  });
};
