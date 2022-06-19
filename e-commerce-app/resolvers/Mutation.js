const { v4: uuid } = require("uuid");

exports.Mutation = {
  addCategory: (parent, { input }, { db }) => {
    const { name } = input;

    const newCategory = {
      id: uuid(),
      name,
    };

    db.categories.push(newCategory);

    return newCategory;
  },

  addProduct: (parent, { input }, { db }) => {
    const { name, description, quantity, price, onSale, image, categoryId } =
      input;

    const newProduct = {
      id: uuid(),
      name,
      description,
      quantity,
      price,
      onSale,
      image,
      categoryId,
    };

    db.products.push(newProduct);

    return newProduct;
  },

  addReview: (parent, { input }, { db }) => {
    const { title, date, comment, rating, productId } = input;

    const newReview = {
      id: uuid(),
      title,
      date,
      comment,
      rating,
      productId,
    };

    db.reviews.push(newReview);

    return newReview;
  },

  deleteCategory: (parent, { id: idCategory }, { db }) => {
    db.categories = db.categories.filter(
      (category) => category.id !== idCategory
    );

    db.products = db.products.array.map((product) => {
      if (product.categoryId === idCategory)
        return {
          ...product,
          categoryId: null,
        };

      return product;
    });

    return true;
  },

  deleteProduct: (parent, { id: idProduct }, { db }) => {
    db.products = db.products.filter((product) => product.id !== idProduct);

    db.reviews = db.reviews.filter((review) => review.productId !== idProduct);

    return true;
  },

  deleteReview: (parent, { id: idReview }, { db }) => {
    db.reviews = db.reviews.filter((review) => review.id !== idReview);

    return true;
  },

  updateCategory: (parent, { id, input }, { db }) => {
    const index = db.categories.findIndex((category) => category.id === id);
    if (index === -1) return null;
    db.categories[index] = {
      ...db.categories[index],
      ...input,
    };

    return db.categories[index];
  },

  updateProduct: (parent, { id, input }, { db }) => {
    const index = db.products.findIndex((product) => product.id === id);
    if (index === -1) return null;
    db.products[index] = {
      ...db.products[index],
      ...input,
    };

    return db.products[index];
  },

  updateReview: (parent, { id, input }, { db }) => {
    const index = db.reviews.findIndex((review) => review.id === id);
    if (index === -1) return null;
    db.reviews[index] = {
      ...db.reviews[index],
      ...input,
    };

    return db.reviews[index];
  },
};
