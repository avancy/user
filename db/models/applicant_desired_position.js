const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'ApplicantDesiredPosition',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      applicant_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'applicant_desired_positions',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'applicant_desired_positions_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'idx_applicant_desired_positions_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
      ],
    },
  );
};
