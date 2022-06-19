exports.Query = {
  hello: () => {
    return ["hello", null, "friends"];
  },
  products: (parent, { filter }, { products, reviews }) => {
    let filteredProducts = products;

    if (filter) {
      const { avgRating, onSale } = filter;

      if (onSale) {
        filteredProducts = filteredProducts.filter(
          (product) => product.onSale == filter.onSale
        );
      }

      if (avgRating && avgRating >= 1 && avgRating <= 5) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRatingProduct = 0;
          let numberOfReviews = 0;

          reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRatingProduct += review.rating;
              numberOfReviews++;
            }
          });

          let avgProductRating = sumRatingProduct / numberOfReviews;

          return avgProductRating >= avgRating;
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
