const asyncWrap = require("../asyncWrap");

// Add product
module.exports.addProduct = asyncWrap((req, res) => {
  const product = req.body;
  const image1 = req.file.image1[0];
  const image2 = req.file.image2[0];
  const image3 = req.file.image3[0];
  const image4 = req.file.image4[0];

  console.log(product);
  console.log(image1, image2, image3, image4);
  res.json({});
});

// List product
module.exports.listProduct = asyncWrap((req, res) => {});

// removing product
module.exports.removeProduct = asyncWrap((req, res) => {});

// Add Product
module.exports.singleProductInfo = asyncWrap((req, res) => {});
