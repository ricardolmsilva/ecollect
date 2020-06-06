import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("items")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("items").insert([
        { title: "Lamps", image: "lamps.svg" },
        { title: "Bateries", image: "bateries.svg" },
        { title: "Papers", image: "papers.svg" },
        { title: "Eletronics", image: "eletronics.svg" },
        { title: "Organics", image: "organics.svg" },
        { title: "Kitchen Oil", image: "oils.svg" },
      ]);
    });
}
