import { Request, Response } from "express";
import db from "../database/connection";

class ItemsController {
  /* -------------------------------------------------------------------------- */
  /*                                    INDEX                                   */
  /* -------------------------------------------------------------------------- */
  static async index(req: Request, res: Response) {
    const items = await db.table("items");

    // for (let item of items) {
    //   item.image = `http://localhost:3333/uploads/${item.image}`;
    // }

    return res.json(items);
  }
}

export default ItemsController;
