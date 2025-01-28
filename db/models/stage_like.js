const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'StageLike',
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
      tableName: 'stage_likes',
      schema: 'public',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'stage_likes_pkey',
          unique: true,
          fields: [{ name: 'job_application_id' }, { name: 'recruiter_id' }],
        },
      ],
    },
  );
};
