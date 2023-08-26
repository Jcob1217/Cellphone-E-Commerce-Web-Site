import { json } from "sequelize";
import { db } from "../connect.js";

export const getCartData = (req, res) => {
  const q =
    "SELECT carts.*, products.* FROM users JOIN carts ON users.id = carts.user_id JOIN products ON carts.product_id = products.id WHERE users.id = ?";
  const id = req.user;

  db.query(q, [id], (err, data) => {
    return res.status(200).json(data);
  });
};

export const addRemoveCart = (req, res) => {
  const q = "SELECT * FROM carts WHERE user_id = ? AND product_id = ?";

  const id = req.user;

  db.query(q, [id, req.body.product_id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) {
      const q = "DELETE FROM carts WHERE user_id = ? AND product_id = ?";

      db.query(q, [id, req.body.product_id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Item removed from Cart");
      });
    } else {
      const q =
        "INSERT INTO carts (`user_id`, `product_id`, `quantity`) VALUE (?)";

      const values = [id, req.body.product_id, req.body.quantity];
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Item added to Cart");
      });
    }
  });
};

export const updateCart = async (req, res) => {
  const data = req.body;
  const id = req.user;

  const dataToRemove = data.filter((element) => Number(element.quantity) === 0);
  const dataToUpdate = data.filter((element) => Number(element.quantity) !== 0);

  const productIdsToRemove = dataToRemove
    .map((data) => data.product_id)
    .join(", ");
  const deleteQuery = `DELETE FROM carts WHERE user_id = ${id} AND product_id IN (${productIdsToRemove})`;

  const updateQuery = `
    UPDATE carts
    SET quantity =
      CASE
        ${dataToUpdate
          .map(
            (data) =>
              `WHEN product_id = ${data.product_id} THEN ${data.quantity}`
          )
          .join("\n")}
      END
    WHERE user_id = ${id};
  `;

  try {
    if (dataToRemove.length) {
      await db.query(deleteQuery);
    }

    if (dataToUpdate.length) {
      await db.query(updateQuery);
    }

    const q =
      "SELECT carts.*, products.* FROM users JOIN carts ON users.id = carts.user_id JOIN products ON carts.product_id = products.id WHERE users.id = ?";

    await db.query(q, [id], (err, data) => {
      return res.status(200).json({ data, info: "Cart succesfully updated" });
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};
