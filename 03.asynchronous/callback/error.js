#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", () => {
  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    () => {
      db.run("INSERT INTO books (title) VALUES (?)", [], function (err) {
        if (err) {
          console.error(err.message);
        } else {
          console.log(this.lastID);
        }

        db.get("SELECT id, title, content FROM books", (err, row) => {
          if (err) {
            console.error(err.message);
          } else {
            console.log(row);
          }

          db.run("DROP TABLE books", () => {
            db.close();
          });
        });
      });
    },
  );
});
