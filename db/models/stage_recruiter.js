const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'StageRecruiter',
    {
      stage_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        references: {
          model: 'stages',
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
      tableName: 'stage_recruiters',
      schema: 'public',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'stage_recruiters_pkey',
          unique: true,
          fields: [{ name: 'stage_id' }, { name: 'recruiter_id' }],
        },
      ],
    },
  );
};
