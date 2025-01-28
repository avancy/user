const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Job',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      subtitle: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      slug: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      company_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'companies',
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
      salary_min: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      salary_max: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      publish_salary: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      public_salary: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      workplace_policy: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      state_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'states',
          key: 'id',
        },
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'cities',
          key: 'id',
        },
      },
      department_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'company_departments',
          key: 'id',
        },
      },
      job_code: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      posted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      available_for_new_applicants: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      close_automatically: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      hiring_policy: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      published: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      archived: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      visible: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      stat_job_views: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      has_required_survey_to_apply: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      survey_json: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'jobs',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_jobs_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'jobs_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
