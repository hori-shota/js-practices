#!/usr/bin/env node

import { openDB, run, all, close } from "../sqlite-helpers.js";

(async function () {
  const db = await openDB();

  await run(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );

  const titles = ["本A", "本B", "本C", "本D"];
  for (const title of titles) {
    await run(db, "INSERT INTO books (title) VALUES (?)", [title]);
  }

  await all(db, "SELECT id, title FROM books");

  await run(db, "DROP TABLE books");

  await close();
})();
