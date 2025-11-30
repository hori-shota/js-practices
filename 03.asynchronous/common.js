import sqlite3 from "sqlite3";

function openDB() {
  return new Promise((resolve) => {
    const db = new sqlite3.Database(":memory:", () => resolve(db));
  });
}

function run(db, sql, params) {
  return new Promise((resolve, reject) => {
    if (params) {
      db.run(sql, params, function (error) {
        if (error) {
          reject(error);
        } else {
          console.log(this.lastID);
        }
        resolve();
      });
    } else {
      db.run(sql, () => resolve(db));
    }
  });
}

function all(db, sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        reject(error);
      } else {
        rows.forEach((row) => console.log(row));
      }
      resolve(db);
    });
  });
}

function close(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      err ? reject(err) : resolve();
    });
  });
}

export { openDB, run, all, close };
