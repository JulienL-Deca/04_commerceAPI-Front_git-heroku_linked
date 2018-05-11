const PG = require("pg");

function sendBrands(){
  const client = new PG.Client();
  client.connect();
  return client.query("SELECT * FROM brands;")
    .then(function (resultDB) {
        console.log("inside select * from brands");
        return resultDB.rows;
    });
}
function findBrandsById(brandID, answer){
  const client = new PG.Client();
  client.connect();
  client.query(
    "SELECT * FROM brands WHERE id = $1::uuid;", [brandID],
    function(error, result) {
      if (error) {
        console.warn(error);
        return error;
      } else {
        answer.json(result.rows[0]);
      }
    }
  );
}
function findProductByCategoryId(brandId, answer){
  const client = new PG.Client();
  client.connect();
  return client.query("SELECT * FROM products where brand_id = $1::uuid;", [brandId])
    .then(function (resultDB) {
        console.log("inside SELECT * FROM products where brand_id == " + brandId);
        return resultDB.rows;
    });
}
module.exports = {
  sendBrands: sendBrands,
  findBrandsById: findBrandsById,
  findProductByCategoryId: findProductByCategoryId
};
