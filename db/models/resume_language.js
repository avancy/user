const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'ResumeLanguage',
    {
      applicant_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        references: {
          model: 'applicants',
          key: 'id',
        },
      },
      language_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        references: {
          model: 'languages',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'resume_languages',
      schema: 'public',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'resume_languages_pkey',
          unique: true,
          fields: [{ name: 'applicant_id' }, { name: 'language_id' }],
        },
      ],
    },
  );
};
