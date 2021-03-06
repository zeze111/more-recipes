const data = {
  favoriteResponse: {
    status: 'Successful',
    message: 'Recipe has been added to your Favorites',
    favorite: {
      id: 1,
      recipeId: 2,
      userId: 45
    }
  },

  deleteFavoriteResponse: {
    status: 'Successful',
    message: 'Recipe has been removed from your Favorites',
  },

  allFavoritesResponse: {
    status: 'Successful',
    favorites: [{
      id: 2,
      name: 'Amala and Ewedu',
      description: 'Yummy amala for everyday consumption',
      preparationTime: '40 mins',
      type: 'Main',
      User: {
        firstName: 'Jane',
        surname: 'Doe'
      }
    }],
    pagination: {
      pageSize: 3,
      totalCount: 2,
      page: 1,
      pageCount: 1
    }
  },

  favoriteError: {
    status: 'Unsuccessful',
    message: 'Recipe Not Found',
  },

  favoriteServerError: {
    message: 'Internal Server Error'
  }
}

export default data;
