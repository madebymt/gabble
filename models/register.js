'use strict';
module.exports = (sequelize, DataTypes) => {
  var Register = sequelize.define('Register', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    confirmPassword: DataTypes.STRING
  }, {
    // classMethods: {
    //   associate: function(models) {
    //     // associations can be defined here
    //   }
    // }
  });
  return Register;
};
