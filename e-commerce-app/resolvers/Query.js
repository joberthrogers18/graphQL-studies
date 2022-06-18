exports.Query = {
  hello: () => {
    return ["hello", null, "friends"];
  },
  products: (parent, { filter }, { products }) => {
    let filteredProducts = products;

    if (filter) {
      console.log(filter);
      if ("onSale" in filter) {
        filteredProducts = filteredProducts.filter((product) => {
          return product.onSale === filter.onSale;
        });
      }
    }

    return filteredProducts;
  },
  product: (parent, { id }, { products }) => {
    const product = products.find((product) => product.id === id);
    if (!product) return null;
    return product;
  },
  categories: (parent, args, { categories }) => {
    return categories;
  },
  category: (parent, { id }, { categories }) => {
    const category = categories.find((category) => category.id === id);
    if (!category) return null;
    return category;
  },
};
