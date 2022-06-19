exports.Query = {
  hello: () => {
    return ["hello", null, "friends"];
  },
  products: (parent, { filter }, { db }) => {
    let filteredProducts = db.products;

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

          db.reviews.forEach((review) => {
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
  product: (parent, { id }, { db }) => {
    const product = db.products.find((product) => product.id === id);
    if (!product) return null;
    return product;
  },
  categories: (parent, args, { db }) => {
    return db.categories;
  },
  category: (parent, { id }, { db }) => {
    const category = db.categories.find((category) => category.id === id);
    if (!category) return null;
    return category;
  },
};
