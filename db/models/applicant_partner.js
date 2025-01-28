const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'ApplicantPartner',
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
      partner_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        references: {
          model: 'partners',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'applicant_partner',
      schema: 'public',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'applicant_partner_pkey',
          unique: true,
          fields: [{ name: 'applicant_id' }, { name: 'partner_id' }],
        },
      ],
    },
  );
};
