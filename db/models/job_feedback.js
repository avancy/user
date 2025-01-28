const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'JobFeedback',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bye_message: {
        type: DataTypes.TEXT,
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
      job_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'jobs',
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
      applicant_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'applicants',
          key: 'id',
        },
      },
      action: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      action_triggered_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      action_triggered_by_recruiter_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'recruiters',
          key: 'id',
        },
      },
      sent_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      is_pending: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'job_feedbacks',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_job_feedbacks_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'job_feedbacks_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
