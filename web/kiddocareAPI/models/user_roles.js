const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const UserRoles = sequelize.define('user_roles', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    }
  }, {
    tableName: 'user_roles',
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
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "role_id",
        using: "BTREE",
        fields: [
          { name: "role_id" },
        ]
      },
    ]
  });

  UserRoles.associate = (models) => {
    // Bảng user_roles liên kết với bảng users
    UserRoles.belongsTo(models.users, {
      as: "user",
      foreignKey: "user_id",
    });

    // Bảng user_roles liên kết với bảng roles
    UserRoles.belongsTo(models.roles, {
      as: "role",
      foreignKey: "role_id",
    });
  };

  return UserRoles;
};
