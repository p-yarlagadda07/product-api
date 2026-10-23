const express = require("express");
const products = require("./products");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

function findIndexById(id) {
  return products.findIndex((p) => p.productId === Number(id));
}

app.get("/", (req, res) => {
  res.send("product api is up. try GET /products");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/brand/:brand", (req, res) => {
  const brand = req.params.brand.toLowerCase();
  const result = products.filter((p) => p.brand.toLowerCase() === brand);

  if (result.length === 0) {
    return res.status(404).json({ error: `no products found for brand '${req.params.brand}'` });
  }
  res.json(result);
});

app.get("/products/:productId", (req, res) => {
  const i = findIndexById(req.params.productId);
  if (i === -1) {
    return res.status(404).json({ error: "product not found" });
  }
  res.json(products[i]);
});

app.post("/products", (req, res) => {
  const { name, brand, price } = req.body || {};

  if (!name || !brand || price === undefined) {
    return res.status(400).json({ error: "name, brand and price are required" });
  }
  if (isNaN(price) || Number(price) < 0) {
    return res.status(400).json({ error: "price should be a positive number" });
  }

  let productId = req.body.productId;
  if (productId === undefined) {
    productId = products.length ? Math.max(...products.map((p) => p.productId)) + 1 : 1;
  } else if (findIndexById(productId) !== -1) {
    return res.status(409).json({ error: `productId ${productId} is already taken` });
  }

  const product = {
    productId: Number(productId),
    name,
    brand,
    price: Number(price)
  };
  products.push(product);

  res.status(201).json(product);
});

app.put("/products/:productId", (req, res) => {
  const i = findIndexById(req.params.productId);
  if (i === -1) {
    return res.status(404).json({ error: "product not found" });
  }

  const { name, brand, price } = req.body || {};
  if (price !== undefined && (isNaN(price) || Number(price) < 0)) {
    return res.status(400).json({ error: "price should be a positive number" });
  }

  if (name) products[i].name = name;
  if (brand) products[i].brand = brand;
  if (price !== undefined) products[i].price = Number(price);

  res.json(products[i]);
});

app.delete("/products/:productId", (req, res) => {
  const i = findIndexById(req.params.productId);
  if (i === -1) {
    return res.status(404).json({ error: "product not found" });
  }

  const [removed] = products.splice(i, 1);
  res.json({ deleted: removed });
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`listening on http://localhost:${port}`);
});
