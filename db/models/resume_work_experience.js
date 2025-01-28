const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'ResumeWorkExperience',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      applicant_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'applicants',
          key: 'id',
        },
      },
      job_title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      company: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      currently_working_here: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      hiring_policy: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      location: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      workplace_policy: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'resume_work_experiences',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_resume_work_experiences_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'resume_work_experiences_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
