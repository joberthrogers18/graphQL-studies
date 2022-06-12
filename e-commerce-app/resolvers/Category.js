const { products } = require('../db');

exports.Category = {
  products: (parents, args, context) => {
    const { id } = parents;
    const productsByCategory = products.filter(
      (product) => product.categoryId === id
    );
    return productsByCategory;
  },
};
