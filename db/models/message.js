const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Message',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      conversation_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'conversations',
          key: 'id',
        },
      },
      sender_type: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      sender_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      receiver_type: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      receiver_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      seen_by_receiver: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      seen_by_sender: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_html: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'messages',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_messages_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'messages_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
