const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'CompanyCustomization',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      company_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'companies',
          key: 'id',
        },
      },
      small_logo_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      mid_logo_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      large_logo_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      original_logo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      f_logo_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'files',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      filename: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      mission: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      vision: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      values: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      hero_text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      public_about: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      base_domain: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      domain_prefix: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      idp_group_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      domain_status: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      stat_page_views: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      f_banner_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'files',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      f_video_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'files',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      primary_color: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      secondary_color: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      social_medias: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      max_gallery_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
      },
      max_testimony_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'company_customization',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      indexes: [
        {
          name: 'company_customization_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'idx_company_customization_deleted_at',
          fields: [{ name: 'deleted_at' }],
        },
      ],
    },
  );
};
