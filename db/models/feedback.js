const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Feedback',
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
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      company_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id',
        },
      },
      positive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'feedbacks',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'feedbacks_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'idx_feedbacks_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
      ],
    },
  );
};
