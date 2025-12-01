#!/usr/bin/env node

import { openDB, run, all, close } from "../sqlite-helpers.js";

let db;

openDB()
  .then((_db) => {
    db = _db;

    return run(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    );
  })
  .then(() => {
    const titles = ["本A", "本B", "本C", "本D", "本A"];
    const sql = "INSERT INTO books (title) VALUES (?)";
    const promises = titles.map((title) => run(db, sql, [title]));

    return Promise.all(promises);
  })
  .then(() => all(db, "SELECT id, title, content FROM books"))
  .then(() => run(db, "DROP TABLE books"))
  .then(() => close(db))
  .catch((error) => console.error(error.message));
