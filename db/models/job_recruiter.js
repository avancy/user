const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'JobRecruiter',
    {
      recruiter_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        references: {
          model: 'recruiters',
          key: 'id',
        },
      },
      job_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        references: {
          model: 'jobs',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'job_recruiter',
      schema: 'public',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'job_recruiter_pkey',
          unique: true,
          fields: [{ name: 'recruiter_id' }, { name: 'job_id' }],
        },
      ],
    },
  );
};
