const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'PartnerPlanSubscription',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      partner_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'partners',
          key: 'id',
        },
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      allow_opened_positions: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      allow_companies: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'partner_plan_subscriptions',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_partner_plan_subscriptions_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'partner_plan_subscriptions_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
