'use strict';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './helpers.js';

//polyfilling everything else
import 'core-js/stable';
//polyfilling async/await
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlSevings = function (goTo) {
  if (goTo < 1) return;
  model.changeQuantityServings(goTo);
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    resultView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    await model.loadRecipe(id);
    //2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.log(err);
  }
};

const controlPaginationResults = function (side) {
  side === 'left' ? model.state.search.page-- : model.state.search.page++;
  const { left, right } = model.getButtonsValues();
  paginationView.showPagination(left, right);
  resultView.render(model.getSearchResultsPage(model.state.search.page));
};

const controlSearchResults = async function () {
  try {
    model.state.search.page = 1;
    resultView.renderSpinner();
    const query = searchView.getQuery();
    await model.loadSearchResults(query);
    resultView.render(model.getSearchResultsPage());
    const { left, right } = model.getButtonsValues();
    paginationView.showPagination(left, right);
    if (!query) return;
  } catch (error) {}
};
const controlAddBookmark = function () {
  //Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //Update recipe view
  recipeView.update(model.state.recipe);
  //Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
    //change id in url without reload the page
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(function () {
      // addRecipeView._toggleWindow();
      addRecipeView.renderMessage();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.log('🚨', error);
    addRecipeView.renderError(error.message);
  }
};
const newFeature = function () {
  console.log('Welcome to the aplication');
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.handlerButtonClick(controlPaginationResults);
  recipeView.handlerServingQuantity(controlSevings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  addRecipeView.addHanlderUpload(controlAddRecipe);
  newFeature();
};
init();
