module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define('Location', {
      identifier: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      tableName: 'location',
      underscored: true,
    });
  
    Location.associate = (models) => {
      Location.hasMany(models.Meter, { foreignKey: 'location_id' });
    };
  
    return Location;
  };