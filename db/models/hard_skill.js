const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'HardSkill',
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
    },
    {
      sequelize,
      tableName: 'hard_skills',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'hard_skills_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'idx_hard_skills_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
      ],
    },
  );
};
