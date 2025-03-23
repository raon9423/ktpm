const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('messages', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    chat_room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chat_rooms',
        key: 'id'
      }
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    message_type: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    sent_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    tableName: 'messages',
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
        name: "chat_room_id",
        using: "BTREE",
        fields: [
          { name: "chat_room_id" },
        ]
      },
      {
        name: "sender_id",
        using: "BTREE",
        fields: [
          { name: "sender_id" },
        ]
      },
    ]
  });
};
