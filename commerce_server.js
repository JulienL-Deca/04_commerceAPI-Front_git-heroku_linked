//https://github.com/JulienL-Deca/04_commerceAPI-Front_git-heroku_linked
const express = require("express");
const nunjucks = require("nunjucks");

const app = express();
const port = process.env.PORT || 3000;

const brands = require("./handlers/getBrands");
const category = require("./handlers/getCategories");
const products = require("./handlers/getProducts");

nunjucks.configure("views", {
  autoescape: true,
  express: app
});
app.set("views", __dirname + "/views");
app.set("view engine", "njk");


app.get("/", function (request, result) {
  result.render("template_index");
});

app.get("/categories", function (request, result) {
  category.sendCategories()
    .then(function(resultDB){
      result.render("template_categories", {categoriesList: resultDB})
    });
});
app.get("/categories/:categoryID", function (request, result) {
  const categoryId = request.params.categoryID;
  category.findProductByCategoryId(categoryId, result)
    .then((resultDB) => {
      result.render("template_productsByCategory", {productsList: resultDB})
    });
});

app.get("/brands", function (request, result) {
  brands.sendBrands()
    .then(function(resultDB){
      result.render("template_brands", {brandsList: resultDB})
    });
});
app.get("/brands/:brandID", function (request, result) {
  const brandId = request.params.brandID;
  brands.findProductByCategoryId(brandId, result)
    .then((resultDB) => {
      result.render("template_productsByBrands", {brandsList: resultDB})
    });
});

app.get("/products", function (request, result) {
  products.sendProducts()
  .then(function(resultDB){
      result.render("template_products", {productsList: resultDB})
    });
});
app.get("/products/:productID", function (request, result) {
  const productId = request.params.productID;
  products.findProductById(productId, result)
    .then(function(resultDB){
        result.render("template_products", {productsList: resultDB})
      });
});

app.get("/api/categories", function (request, result) {
  category.sendCategories()
  .then(function(resultDB){
    result.send(resultDB);
  });
});
app.get("/api/brands", function (request, result) {
  brands.sendBrands()
  .then(function(resultDB){
    result.send(resultDB);
  });
});
app.get("/api/products", function (request, result) {
  products.sendProducts()
  .then(function(resultDB){
    result.send(resultDB);
  });
});

app.use(express.static("public"));

app.use(function (req, res, next) {
  res.status(404).render("template_error", {catchedError: "404 NOT FOUND"});
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('ERROR 500 : Something broken!')
});

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});
