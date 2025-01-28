const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Stage',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      job_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'jobs',
          key: 'id',
        },
      },
      stage_order: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      category: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_system_stage: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      welcome_feedback_body: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      welcome_feedback_title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      welcome_feedback_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      welcome_feedback_auto_send_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      goodbye_feedback_body: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      goodbye_feedback_title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      goodbye_feedback_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      goodbye_feedback_auto_send_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      require_evaluation: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      auto_advance: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      require_all_evaluation: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      deadline_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'stages',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'idx_stages_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
        {
          name: 'stages_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
