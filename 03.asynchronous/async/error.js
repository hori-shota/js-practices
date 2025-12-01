#!/usr/bin/env node

import { openDB, run, all, close } from "../sqlite-helpers.js";

(async function () {
  const db = await openDB();

  await run(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );

  const titles = ["本A", "本B", "本C", "本D", "本A"];
  for (const title of titles) {
    try {
      await run(db, "INSERT INTO books (title) VALUES (?)", [title]);
    } catch (error) {
      console.error(error.message);
    }
  }

  try {
    await all(db, "SELECT id, title, content FROM books");
  } catch (error) {
    console.error(error.message);
  }

  await run(db, "DROP TABLE books");

  await close();
})();
