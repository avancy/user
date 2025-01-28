const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'SysFeedback',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bye_message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      positive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      category: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'sys_feedbacks',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_sys_feedbacks_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'sys_feedbacks_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
