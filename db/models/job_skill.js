const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'JobSkill',
    {
      job_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        references: {
          model: 'jobs',
          key: 'id',
        },
      },
      skill_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        references: {
          model: 'skills',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'job_skills',
      schema: 'public',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'job_skills_pkey',
          unique: true,
          fields: [{ name: 'job_id' }, { name: 'skill_id' }],
        },
      ],
    },
  );
};
