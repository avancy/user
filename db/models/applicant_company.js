const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'ApplicantCompany',
    {
      company_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        references: {
          model: 'companies',
          key: 'id',
        },
      },
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
    },
    {
      sequelize,
      tableName: 'applicant_company',
      schema: 'public',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'applicant_company_pkey',
          unique: true,
          fields: [{ name: 'company_id' }, { name: 'applicant_id' }],
        },
      ],
    },
  );
};
