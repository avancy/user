const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'UploadedResume',
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
      path: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bucket: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      size: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      acl: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      location: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      storage_class: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      key: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      plain_text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'uploaded_resumes',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_uploaded_resumes_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'uploaded_resumes_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
