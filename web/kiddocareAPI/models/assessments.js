const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('assessments', {
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
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'activities',
        key: 'id'
      }
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    assessment_type: {
      type: DataTypes.ENUM('exam','quiz','assignment','participation','project','remark'),
      allowNull: false
    },
    score: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'assessments',
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
        name: "activity_id",
        using: "BTREE",
        fields: [
          { name: "activity_id" },
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
