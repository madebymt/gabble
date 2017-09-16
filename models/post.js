'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    post: DataTypes.STRING,
    title: DataTypes.STRING,
    create_at: DataTypes.DATE
  }, {});
  return Post;
};
