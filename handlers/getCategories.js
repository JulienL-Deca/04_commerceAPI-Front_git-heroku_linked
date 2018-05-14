const PG = require("pg");
const connectionString = process.env.DATABASE_URL;

function sendCategories(){
  const client = new PG.Client({connectionString: connectionString,});
  client.connect();
  return client.query("SELECT * FROM categories;")
    .then(function (resultDB) {
        console.log("inside select * from categories");
        return resultDB.rows;
    });
}
function findCategoryById(categoryId, answer){
  const client = new PG.Client({connectionString: connectionString,});
  client.connect();
  return client.query("SELECT * FROM categories WHERE id = $1::uuid;", [categoryId])
    .then(function (resultDB) {
        console.log("inside select * from categories where id == " + categoryId);
        return resultDB.rows[0];
    });
}

function findProductByCategoryId(categoryId, answer){
  const client = new PG.Client({connectionString: connectionString,});
  client.connect();
  return client.query("SELECT * FROM products INNER JOIN category_products on (products.id = category_products.product_id) WHERE category_products.category_id = $1::uuid;", [categoryId])
    .then(function (resultDB) {
        console.log("inside innerjoin where category id == " + categoryId);
        return resultDB.rows;
    });
}
// function findProductByCategoryId(categoryId, answer){
//   const client = new PG.Client();
//   client.connect();
//   client.query(
//     "SELECT * FROM products INNER JOIN join_categories_products on (products.id = join_categories_products.products_id) WHERE join_categories_products.category_id = $1::uuid;", [categoryId],
//     function(error, result) {
//       if (error) {
//         console.warn(error);
//         return error;
//       } else {
//         return answer.json(result.rows);
//       }
//     }
//   );
// }
module.exports = {
  sendCategories: sendCategories,
  findCategoryById: findCategoryById,
  findProductByCategoryId: findProductByCategoryId
};
