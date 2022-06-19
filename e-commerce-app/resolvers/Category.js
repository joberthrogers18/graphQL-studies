exports.Category = {
  products: ({ id: categoryId }, { filter }, { products }) => {
    let filteredProducts = products.filter(
      (product) => product.categoryId === categoryId
    );

    if (filter) {
      const { onSale, avgRating } = filter;

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
};
