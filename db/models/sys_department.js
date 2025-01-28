const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'SysDepartment',
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
    },
    {
      sequelize,
      tableName: 'sys_departments',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_sys_departments_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'sys_departments_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
