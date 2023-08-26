import { json } from "sequelize";
import { db } from "../connect.js";

export const list = (req, res) => {
  const q = "SELECT * FROM products;";

  db.query(q, (err, data) => {
    return res.status(200).json(data);
  });
};

export const productPage = (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT * FROM products JOIN products_specifications ON products.id = products_specifications.id WHERE products.id = ?;";

  db.query(q, [id], (err, data) => {
    const q = "SELECT * FROM products_images WHERE product_id = ?;";
    const product_info = data;

    db.query(q, [id], (err, data) => {
      res.json({ product_info: product_info, product_images: data });
    });
  });
};

export const addToCart = (req, res) => {
  const product_id = req.body.product_id;
  const id = req.user;
  let q;

  const selectQuery = `SELECT * FROM carts WHERE user_id = ${id} AND product_id = ${product_id};`;

  db.query(selectQuery, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) {
      q = `UPDATE carts SET quantity = quantity + 1 WHERE user_id = ${id} AND product_id = ${product_id};`;
    } else {
      q = `INSERT INTO carts (user_id, product_id, quantity) VALUES (${id}, ${product_id}, 1);`;
    }
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Item added to cart");
    });
  });
};
