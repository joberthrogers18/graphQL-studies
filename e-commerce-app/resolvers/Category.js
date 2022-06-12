exports.Category = {
  products: ({ id }, args, { products }) => {
    const productsByCategory = products.filter(
      (product) => product.categoryId === id
    );
    return productsByCategory;
  },
};
