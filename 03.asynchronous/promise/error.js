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

    return Promise.allSettled(promises);
  })
  .then((results) => {
    let ids = [];
    let errors = [];

    results.forEach((result) => {
      if (result.status === "rejected") {
        errors.push(result.reason.message);
      } else {
        ids.push(result.value.lastID);
      }
    });

    ids.forEach((id) => {
      console.log(id);
    });

    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }
  })
  .catch((err) => {
    console.error(err.message);

    return all(db, "SELECT id, title, content FROM books");
  })
  .then((rows) => {
    rows.forEach((row) => {
      console.log(row);
    });

    return run(db, "DROP TABLE books");
  })
  .catch((err) => {
    console.error(err.message);
  })
  .then(() => close(db));
