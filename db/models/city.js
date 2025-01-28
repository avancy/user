const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'City',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      lat: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      long: {
        type: DataTypes.DECIMAL,
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
    },
    {
      sequelize,
      tableName: 'cities',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'cities_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'idx_cities_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
      ],
    },
  );
};
