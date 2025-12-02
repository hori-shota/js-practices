#!/usr/bin/env node

import { openDB, run, all, close } from "../sqlite-helpers.js";

const db = await openDB();

await run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);

const titles = ["本A", "本B", "本C", "本D", "本A"];
let results = [];

for (const title of titles) {
  try {
    results.push(
      await run(db, "INSERT INTO books (title) VALUES (?)", [title]),
    );
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT") {
      console.error(err.message);
    } else {
      throw err;
    }
  }
}

results.forEach((result) => {
  console.log(result.lastID);
});

try {
  const rows = await all(db, "SELECT id, title, content FROM books");

  rows.forEach((row) => {
    console.log(row);
  });
} catch (err) {
  if (err.code === "SQLITE_ERROR") {
    console.error(err.message);
  } else {
    throw err;
  }
}

await run(db, "DROP TABLE books");

await close(db);
