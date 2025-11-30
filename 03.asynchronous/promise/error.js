#!/usr/bin/env node

import { openDB, run, all, close } from "../common.js";

openDB()
  .then((db) => {
    return run(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    );
  })
  .then((db) => {
    const titles = ["本A", "本B", "本C", "本D", "本A"];
    const sql = "INSERT INTO books (title) VALUES (?)";
    const promises = titles.map((title) => run(db, sql, [title]));

    return Promise.all(promises).then(() => db);
  })
  .then((db) => {
    return all(db, "SELECT id, title, content FROM books");
  })
  .then((db) => {
    return run(db, "DROP TABLE books");
  })
  .then((db) => {
    return close(db);
  })
  .catch((error) => {
    console.error(error.message);
  });
