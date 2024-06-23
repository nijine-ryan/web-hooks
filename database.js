// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE accounts (id INTEGER PRIMARY KEY, email TEXT UNIQUE, name TEXT, secret_token TEXT, website TEXT)");
    db.run("CREATE TABLE destinations (id INTEGER PRIMARY KEY, account_id INTEGER, url TEXT, method TEXT, headers TEXT, FOREIGN KEY(account_id) REFERENCES accounts(id))");
});

module.exports = db;
