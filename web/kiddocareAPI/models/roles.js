const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Roles = sequelize.define('roles', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'roles',
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
    ]
  });
  Roles.associate = (models) => {
    // Một role có thể gán cho nhiều user thông qua bảng trung gian user_roles
    Roles.belongsToMany(models.users, {
      through: models.user_roles,
      as: "users",
      foreignKey: "role_id",
    });

    // Nếu có thêm quyền cụ thể liên quan đến role (ví dụ: permissions)
    Roles.hasMany(models.permissions, {
      as: "permissions",
      foreignKey: "role_id",
    });
  };
  return Roles;
};
