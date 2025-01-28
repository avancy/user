const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'ApplicantStage',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      job_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      stage_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      applicant_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      is_finished: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      finished_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      finished_by: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      internal_notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'applicant_stages',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'applicant_stages_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'idx_applicant_stages_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
      ],
    },
  );
};
