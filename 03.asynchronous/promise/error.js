#!/usr/bin/env node

import { openDB, run, get, close } from "../sqlite-helpers.js";

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
    return run(db, "INSERT INTO books (title) VALUES (?)", []);
  })
  .then(
    (result) => {
      console.log(result.lastID);

      return get(db, "SELECT id, title, content FROM books");
    },
    (err) => {
      console.error(err.message);

      return get(db, "SELECT id, title, content FROM books");
    },
  )
  .then(
    (row) => {
      console.log(row);

      return run(db, "DROP TABLE books");
    },
    (err) => {
      console.error(err.message);
    },
  )
  .then(() => close(db));
