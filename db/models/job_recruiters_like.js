const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'JobRecruitersLike',
    {
      job_application_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        references: {
          model: 'job_applications',
          key: 'id',
        },
      },
      recruiter_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        references: {
          model: 'recruiters',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'job_recruiters_likes',
      schema: 'public',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'job_recruiters_likes_pkey',
          unique: true,
          fields: [{ name: 'job_application_id' }, { name: 'recruiter_id' }],
        },
      ],
    },
  );
};
