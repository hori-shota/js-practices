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
    return run(db, "INSERT INTO books (title) VALUES (?)", ["本A"]);
  })
  .then((result) => {
    console.log(result.lastID);

    return get(db, "SELECT id, title FROM books");
  })
  .then((row) => {
    console.log(row);

    return run(db, "DROP TABLE books");
  })
  .then(() => close(db));
