#!/usr/bin/env node

import { openDB, run, get, close } from "../sqlite-helpers.js";

const db = await openDB();

await run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);

const result = await run(db, "INSERT INTO books (title) VALUES (?)", ["本A"]);

console.log(result.lastID);

console.log(await get(db, "SELECT id, title FROM books"));

await run(db, "DROP TABLE books");

await close(db);
