const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'JobApplicationEvent',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      job_application_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'job_applications',
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
      stage_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'stages',
          key: 'id',
        },
      },
      event_type: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      recruiter_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'recruiters',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'job_application_events',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_job_application_events_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'job_application_events_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
