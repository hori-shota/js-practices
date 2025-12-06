import sqlite3 from "sqlite3";

export function openDB() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(":memory:", (err) => {
      err ? reject(err) : resolve(db);
    });
  });
}

export function run(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    const callback = function (err) {
      if (err) {
        return reject(err);
      }
      resolve({ lastID: this.lastID, changes: this.changes });
    };

    db.run(sql, params, callback);
  });
}

export function get(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

export function close(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      err ? reject(err) : resolve();
    });
  });
}
