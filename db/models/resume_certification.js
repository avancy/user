const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'ResumeCertification',
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
      name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      expiration: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'resume_certifications',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_resume_certifications_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'resume_certifications_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
