const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'JobSoftSkill',
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
      job_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'jobs',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'job_soft_skills',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_job_soft_skills_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'job_soft_skills_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
