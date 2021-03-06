import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { token, token2, userId, userId2 } from './users';
import { recipe1, recipe2, errorRecipe, update } from './mockdata';

const should = chai.should();

chai.use(chaiHttp);

export let recipeId;
export let recipeId2;


describe('Empty data for get all recipes', () => {
  it('it should return an empty list', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        res.body.message.should.equal('There Are Currently No Recipes');
        done();
      });
  });
  it('it should return an empty list for popular recipes', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?sort=upvotes&order=des')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        res.body.message.should.equal('There Are Currently No Popular Recipes');
        done();
      });
  });
  it('it should return an empty list for searched recipes', (done) => {
    chai.request(app)
      .get('/api/v1/recipes/search/house')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Recipe(s) Not Found');
        done();
      });
  });
  it('it should return an empty list for recipe category', (done) => {
    chai.request(app)
      .get('/api/v1/recipes/categories/Main')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        res.body.message.should.equal('No Recipes In That Category Yet');
        done();
      });
  });
});


describe('Submit a Recipe', () => {
  it('Recipe should be created', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-token', token)
      .send(recipe1)
      .end((err, res) => {
        recipeId = res.body.recipe.id;
        should.not.exist(err);
        res.status.should.equal(201);
        res.body.status.should.equal('Success');
        done();
      });
  });
  it('Recipe should be created', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-token', token)
      .send(recipe2)
      .end((err, res) => {
        recipeId2 = res.body.recipe.id;
        should.not.exist(err);
        res.status.should.equal(201);
        res.body.status.should.equal('Success');
        done();
      });
  });
});


describe('Errors for submitting a recipe', () => {
  it('Unauthorised user should not submit recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .send(recipe1)
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(401);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Please sign up to perform this action');
        done();
      });
  });
  it('User should not create recipe twice', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-token', token)
      .send(recipe1)
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(409);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Cannot Create A Recipe With the Same Name');
        done();
      });
  });
  it('User should not input wrong data', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-token', token)
      .send(errorRecipe)
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(422);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Invalid data input');
        done();
      });
  });
});


describe('Get all recipes', () => {
  it('list of recipes should be returned', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        done();
      });
  });
});

describe('Search for a recipe', () => {
  it('Recipe(s) matching the search should be returned', (done) => {
    chai.request(app)
      .get('/api/v1/recipes/search/amala')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        done();
      });
  });
  it('Recipe(s) matching the category should be returned', (done) => {
    chai.request(app)
      .get('/api/v1/recipes/categories/Dessert')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        done();
      });
  });
});

describe('Updating a recipe', () => {
  it('Recipe should be updated', (done) => {
    chai.request(app)
      .put(`/api/v1/recipes/${recipeId}`)
      .set('x-token', token)
      .send({
        type: 'Main',
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        done();
      });
  });
});


describe('Errors for updating a recipe', () => {
  it('it should only accept a number for recipe id', (done) => {
    chai.request(app)
      .put('/api/v1/recipes/recipeId')
      .set('x-token', token)
      .send(update)
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(406);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Recipe ID Must Be A Number');
        done();
      });
  });
  it('it should reject an invalid token', (done) => {
    chai.request(app)
      .put(`/api/v1/recipes/${recipeId}`)
      .set('x-token', 'jefrsghndxfngxkjdgrldxgk.jdhffhkjvnuhdgn.jdudfshsk')
      .send(update)
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(401);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Invalid token');
        done();
      });
  });
  it('it should not find recipe', (done) => {
    chai.request(app)
      .put('/api/v1/recipes/500')
      .set('x-token', token)
      .send(update)
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(404);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Recipe Not Found');
        done();
      });
  });
  it('it should not allow wrong format of data input', (done) => {
    chai.request(app)
      .put(`/api/v1/recipes/${recipeId}`)
      .set('x-token', token)
      .send({
        name: 'm',
      })
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(422);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Invalid data input');
        done();
      });
  });
  it('User should not be able to update another user\'s recipe', (done) => {
    chai.request(app)
      .put(`/api/v1/recipes/${recipeId2}`)
      .set('x-token', token2)
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(403);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('You are Not Authorized to Update This Recipe');
        done();
      });
  });
});


describe('Delete a recipe', () => {
  it('recipe should be deleted', (done) => {
    chai.request(app)
      .delete(`/api/v1/recipes/${recipeId}`)
      .set('x-token', token)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        done();
      });
  });
});

describe('Submit a Recipe', () => {
  it('Recipe should be created', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-token', token)
      .send(recipe1)
      .end((err, res) => {
        recipeId = res.body.recipe.id;
        should.not.exist(err);
        res.status.should.equal(201);
        res.body.status.should.equal('Success');
        done();
      });
  });
})


describe('Errors for deleting a recipe', () => {
  it('it should not find recipe', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/500')
      .set('x-token', token)
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(404);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Recipe Not Found');
        done();
      });
  });
  it('User should not be able to delete another user\'s recipe', (done) => {
    chai.request(app)
      .delete(`/api/v1/recipes/${recipeId2}`)
      .set('x-token', token2)
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(403);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('You are Not Authorized to Delete This Recipe');
        done();
      });
  });
});


describe('Get one recipe', () => {
  it('Details of a recipe should be returned', (done) => {
    chai.request(app)
      .get(`/api/v1/recipes/${recipeId2}`)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        done();
      });
  });
});


describe('Error for getting one recipe', () => {
  it('it should not find recipe', (done) => {
    chai.request(app)
      .get('/api/v1/recipes/493')
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(404);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Recipe Not Found');
        done();
      });
  });
});


describe('Get all recipes for a user', () => {
  it('should return all the recipes submitted by a user', (done) => {
    chai.request(app)
      .get(`/api/v1/user/recipes`)
      .set('x-token', token)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        done();
      });
  });
});


describe('Empty return for getting all recipes of user', () => {
  it('it should return an error for no submitted recipes', (done) => {
    chai.request(app)
      .get(`/api/v1/user/recipes`)
      .set('x-token', token2)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        res.body.message.should.equal('You Currently Have No Recipes');
        done();
      });
  });
});
