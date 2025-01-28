const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'PartnerCustomization',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      partner_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'partners',
          key: 'id',
        },
      },
      small_logo_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      mid_logo_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      large_logo_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      original_logo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      filename: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      public_about: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      base_domain: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      domain_prefix: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'partner_customization',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_partner_customization_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'partner_customization_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
