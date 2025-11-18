#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", () => {
  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    () => {
      const titles = ["本A", "本B", "本C", "本D"];
      let count = titles.length;
      titles.forEach((title) => {
        db.run("INSERT INTO books (title) VALUES (?)", [title], function () {
          console.log(this.lastID);
          count--;

          if (count === 0) {
            db.all("SELECT id, title FROM books", (err, rows) => {
              rows.forEach((row) => {
                console.log(row);
              });
              db.run("DROP TABLE books", () => {
                db.close();
              });
            });
          }
        });
      });
    },
  );
});
