const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('class_activities', {
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'classes',
        key: 'id'
      }
    },
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'activities',
        key: 'id'
      }
    }
  }, {
    tableName: 'class_activities',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "class_id" },
          { name: "activity_id" },
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
