exports.Category = {
  products: ({ id: categoryId }, { filter }, { products }) => {
    let filteredProducts = products.filter(
      (product) => product.categoryId === categoryId
    );

    if (filter) {
      if ("onSale" in filter) {
        filteredProducts = filteredProducts.filter(
          (product) => product.onSale == filter.onSale
        );
      }
    }

    return filteredProducts;
  },
};
