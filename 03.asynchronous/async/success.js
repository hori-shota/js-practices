#!/usr/bin/env node

import { openDB, run, all, close } from "../sqlite-helpers.js";

const db = await openDB();

await run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);

const titles = ["本A", "本B", "本C", "本D"];
let results = [];

for (const title of titles) {
  results.push(await run(db, "INSERT INTO books (title) VALUES (?)", [title]));
}

results.forEach((result) => {
  console.log(result.lastID);
});

const rows = await all(db, "SELECT id, title FROM books");

rows.forEach((row) => {
  console.log(row);
});

await run(db, "DROP TABLE books");

await close(db);
