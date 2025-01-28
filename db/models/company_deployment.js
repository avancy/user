const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'CompanyDeployment',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      company_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id',
        },
      },
      domain: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      action: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      logs: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      last_update: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'company_deployments',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'company_deployments_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'idx_company_deployments_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
      ],
    },
  );
};
