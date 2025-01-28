const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'ResumeSkill',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      applicant_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'applicants',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'resume_skills',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_resume_skills_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'resume_skills_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
