const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'JobApplicationNote',
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
      recruiter_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'recruiters',
          key: 'id',
        },
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'job_application_notes',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_job_application_notes_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'job_application_notes_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
