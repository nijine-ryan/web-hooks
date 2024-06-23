const db = require('../../database');

// Create Destination
exports.createDestination = (req, res) => {
    const { account_id, url, method, headers } = req.body;
    db.run(`INSERT INTO destinations (account_id, url, method, headers) VALUES (?, ?, ?, ?)`,
        [account_id, url, method, JSON.stringify(headers)], function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.json({ id: this.lastID });
        });
};

// Read Destinations by Account ID
exports.getDestinationsByAccountId = (req, res) => {
    db.all(`SELECT * FROM destinations WHERE account_id = ?`, [req.params.accountId], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ destinations: rows });
    });
};

// Update Destination
exports.updateDestination = (req, res) => {
    const { url, method, headers } = req.body;
    db.run(`UPDATE destinations SET url = ?, method = ?, headers = ? WHERE id = ?`,
        [url, method, JSON.stringify(headers), req.params.id], function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.json({ updatedID: this.changes });
        });
};

// Delete Destination
exports.deleteDestination = (req, res) => {
    db.run(`DELETE FROM destinations WHERE id = ?`, req.params.id, function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ deletedID: this.changes });
    });
};
