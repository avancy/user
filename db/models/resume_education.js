const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'ResumeEducation',
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
      degree: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      institution: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      graduated: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      currently_studying_here: {
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
      field_of_study: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'resume_educations',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_resume_educations_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'resume_educations_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
