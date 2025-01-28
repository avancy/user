const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Applicant',
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
      email: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'cities',
          key: 'id',
        },
      },
      state_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'states',
          key: 'id',
        },
      },
      photo_path: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      photo_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      has_special_needs: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      born_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      gender: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      phone: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_phone_wtsapp: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      available_for_trips: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      available_for_relocation: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      position_title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'applicants',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'applicants_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'idx_applicants_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
      ],
    },
  );
};
