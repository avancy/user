const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Plan',
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
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      starts_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      yearly_en: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      yearly_price: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      semiannual_en: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      semiannual_price: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      quarterly_en: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      quarterly_price: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      monthly_en: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      monthly_price: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      allow_opened_positions: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'plans',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_plans_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'plans_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
