const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'StageApplicantEvaluatorsRemark',
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
          model: 'recruiters',
          key: 'id',
        },
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      grade: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      advice: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'stage_applicant_evaluators_remarks',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_stage_applicant_evaluators_remarks_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'stage_applicant_evaluators_remarks_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
