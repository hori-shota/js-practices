#!/usr/bin/env node

import { openDB, run, get, close } from "../sqlite-helpers.js";

const db = await openDB();

await run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);

try {
  const result = await run(db, "INSERT INTO books (title) VALUES (?)", []);

  console.log(result.lastID);
} catch (err) {
  if (err.code === "SQLITE_CONSTRAINT") {
    console.error(err.message);
  } else {
    throw err;
  }
}

try {
  console.log(await get(db, "SELECT id, title, content FROM books"));
} catch (err) {
  if (err.code === "SQLITE_ERROR") {
    console.error(err.message);
  } else {
    throw err;
  }
}

await run(db, "DROP TABLE books");

await close(db);
