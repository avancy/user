const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Recruiter',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      last_login: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      photo_path: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      photo_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      role: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_recruiter: {
        type: DataTypes.BOOLEAN,
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
    },
    {
      sequelize,
      tableName: 'recruiters',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_recruiters_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'recruiters_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
