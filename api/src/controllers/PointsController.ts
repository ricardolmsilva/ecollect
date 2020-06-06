import { Request, Response } from "express";
import db from "../database/connection";

class PointsController {
  /* -------------------------------------------------------------------------- */
  /*                                    INDEX                                   */
  /* -------------------------------------------------------------------------- */
  static async index(req: Request, res: Response) {
    const { city, postcode, items } = req.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await db("points")
      .join("points_items", "points.id", "=", "points_items.point_id")
      .whereIn("points_items.item_id", parsedItems)
      .where("city", String(city))
      .where("postcode", String(postcode))
      .distinct()
      .select("points.*");

    return res.json(points);
  }

  /* -------------------------------------------------------------------------- */
  /*                                   CREATE                                   */
  /* -------------------------------------------------------------------------- */
  static async create(req: Request, res: Response) {
    const trx = await db.transaction();

    const {
      name,
      image,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      postcode,
      items,
    } = req.body;

    const points = {
      name,
      image:
        "https://images.unsplash.com/photo-1571032555647-37380b4bdfe5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=60",
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      postcode,
    };

    const insertedIds = await trx("points").insert(points);

    const point_id = insertedIds[0];
    const pointItems = items.map((item_id: number) => {
      return { item_id, point_id };
    });

    await trx("points_items").insert(pointItems);
    await trx.commit();

    return res.json({ id: point_id, ...points });
  }

  /* -------------------------------------------------------------------------- */
  /*                                    SHOW                                    */
  /* -------------------------------------------------------------------------- */
  static async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await db("points").where("id", id).first();

    if (!point) {
      return res.status(400).json({ message: "Point not found" });
    }

    const items = await db("items")
      .join("points_items", "items.id", "=", "points_items.item_id")
      .where("points_items.point_id", id)
      .select("items.title");

    return res.json({ point, items });
  }
}

export default PointsController;
