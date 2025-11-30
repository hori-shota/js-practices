#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", () => {
  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    () => {
      const titles = ["本A", "本B", "本C", "本D", "本A"];
      let count = titles.length;
      titles.forEach((title) => {
        db.run("INSERT INTO books (title) VALUES (?)", [title], function (err) {
          if (err) {
            console.error(err.message);
          } else {
            console.log(this.lastID);
          }

          count--;
          if (count === 0) {
            db.all("SELECT id, title, content FROM books", (err, rows) => {
              if (err) {
                console.error(err.message);
                db.run("DROP TABLE books", () => {
                  db.close();
                });
              } else {
                rows.forEach((row) => {
                  console.log(row);
                });
                db.run("DROP TABLE books", () => {
                  db.close();
                });
              }
            });
          }
        });
      });
    },
  );
});
