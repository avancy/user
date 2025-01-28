const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Partner',
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
      cnpj: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      postal_code: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address1: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address2: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address3: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'cities',
          key: 'id',
        },
      },
      state_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'states',
          key: 'id',
        },
      },
      phone1: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      phone2: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      name_responsible: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      email_responsible: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      idp_group_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'partners',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_partners_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'partners_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
