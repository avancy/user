const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'DeploymentEvent',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      deployment_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'company_deployments',
          key: 'id',
        },
      },
      company_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id',
        },
      },
      ok: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      is_last_step: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      pretty_log: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      log: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'deployment_events',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'deployment_events_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'idx_deployment_events_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
      ],
    },
  );
};
