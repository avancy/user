const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'ResumeCourse',
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
      course: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      institution: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'resume_courses',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_resume_courses_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'resume_courses_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
