const { categories } = require('../db');

exports.Product = {
  category: (parents, args, context) => {
    const { categoryId } = parents;
    return categories.find((category) => category.id === categoryId);
  },
};
