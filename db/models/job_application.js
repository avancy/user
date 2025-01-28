const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'JobApplication',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      job_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'jobs',
          key: 'id',
        },
      },
      applicant_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'applicants',
          key: 'id',
        },
      },
      hired_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      stage_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'stages',
          key: 'id',
        },
      },
      stage_order: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      disqualified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      disqualified_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      finished: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      hired: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      grade: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'job_applications',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_job_applications_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'job_applications_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
