const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'CompanyIam',
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
        primaryKey: true,
        references: {
          model: 'companies',
          key: 'id',
        },
      },
      realm: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      issuer: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      client_secret: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      client_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      public_key: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'company_iam',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'company_iam_pkey',
          unique: true,
          fields: [{ name: 'id' }, { name: 'company_id' }],
        },
        {
          name: 'idx_company_iam_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
      ],
    },
  );
};
