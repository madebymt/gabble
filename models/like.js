'use strict';
module.exports = (sequelize, DataTypes) => {
  var Like = sequelize.define('Like', {
      like: DataTypes.BOOLEAN
}, {})

  Like.associate = function(models){
      Like.belongsTo(models.User,{as: 'User', foreignKey: 'userId'})
      Like.belongsTo(models.Post,{as: 'Post', foreignKey: 'postId'})
  }

  return Like;
};
