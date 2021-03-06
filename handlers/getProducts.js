const PG = require("pg");
const connectionString = process.env.DATABASE_URL;

function sendProducts(){
  const client = new PG.Client({connectionString: connectionString,});
  client.connect();
  return client.query("SELECT * FROM products;")
    .then(function (resultDB) {
        console.log("inside select * from products");
        return resultDB.rows;
    });
}
function findProductById(productId, answer){
  const client = new PG.Client({connectionString: connectionString,});
  client.connect();
  return client.query("SELECT * FROM products WHERE id = $1::uuid;", [productId])
    .then(function (resultDB) {
        console.log("inside select * from products where id == " + productId);
        return resultDB.rows;
    });
}

module.exports = {
  sendProducts: sendProducts,
  findProductById: findProductById
};
