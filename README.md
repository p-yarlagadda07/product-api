# product-api

Assignment 14 for the HTML-CSS-JS course. A small Express server that does CRUD on a list of products. There's no database, the products just live in an array (`products.js`) so anything you add is gone once the server restarts.

Each product has a `productId`, `name`, `brand` and `price`. It starts with two of them.

## running it

```
npm install
npm start
```

Server runs on http://localhost:3000

## routes

| method | route | what it does |
|--------|-------|--------------|
| GET | `/products` | get all products |
| GET | `/products/:productId` | get one product |
| GET | `/products/brand/:brand` | get products of a brand (not case sensitive) |
| POST | `/products` | add a product |
| PUT | `/products/:productId` | update a product |
| DELETE | `/products/:productId` | delete a product |

For POST, `name`, `brand` and `price` are needed. `productId` can be sent too, otherwise it just picks the next free number.

```json
{
  "name": "Linen Shirt",
  "brand": "Puma",
  "price": 1899
}
```

For PUT you only need to send the fields you want to change, eg `{ "price": 2999 }`.

Easiest way to test is Postman or the Thunder Client extension in VS Code.
