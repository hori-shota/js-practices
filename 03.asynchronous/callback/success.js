#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", () => {
  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    () => {
      db.run("INSERT INTO books (title) VALUES (?)", ["本A"], function () {
        console.log(this.lastID);
        db.get("SELECT id, title FROM books", (_, row) => {
          console.log(row);
          db.run("DROP TABLE books", () => {
            db.close();
          });
        });
      });
    },
  );
});
