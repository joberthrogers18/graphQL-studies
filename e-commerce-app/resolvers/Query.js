const { categories, products } = require('../db');

exports.Query = {
  hello: () => {
    return ["hello", null, "friends"];
  },
  products: () => {
    return products;
  },
  product: (parents, args, context) => {
    const { id } = args;
    const product = products.find((product) => product.id === id);
    if (!product) return null;
    return product;
  },
  categories: () => {
    return categories;
  },
  category: (parents, args, context) => {
    const { id } = args;
    const category = categories.find((category) => category.id === id);
    if (!category) return null;
    return category;
  },
};
