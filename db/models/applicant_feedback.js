const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'ApplicantFeedback',
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
      applicant_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'applicants',
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
      job_application_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'job_applications',
          key: 'id',
        },
      },
      subject: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      recruiter_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'recruiters',
          key: 'id',
        },
      },
      company_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id',
        },
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      message_sent_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      email_sent_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'applicant_feedbacks',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'applicant_feedbacks_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'idx_applicant_feedbacks_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
      ],
    },
  );
};
