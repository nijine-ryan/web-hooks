const db = require('../../database');
const crypto = require('crypto');

// Create Account
exports.createAccount = (req, res) => {
    const { email, name, website } = req.body;
    const secret_token = crypto.randomBytes(16).toString('hex');
    db.run(`INSERT INTO accounts (email, name, secret_token, website) VALUES (?, ?, ?, ?)`,
        [email, name, secret_token, website], function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.json({ id: this.lastID, secret_token });
        });
};

// Read Accounts
exports.getAccounts = (req, res) => {
    db.all("SELECT * FROM accounts", [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ accounts: rows });
    });
};

// Update Account
exports.updateAccount = (req, res) => {
    const { email, name, website } = req.body;
    db.run(`UPDATE accounts SET email = ?, name = ?, website = ? WHERE id = ?`,
        [email, name, website, req.params.id], function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.json({ updatedID: this.changes });
        });
};

// Delete Account
exports.deleteAccount = (req, res) => {
    db.run(`DELETE FROM accounts WHERE id = ?`, req.params.id, function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ deletedID: this.changes });
    });
};
