const db = require('../../database');
const axios = require('axios');

exports.handleIncomingData = async (req, res) => {
    const { data } = req.body;
    const token = req.headers['cl-x-token'];

    if (!data) {
        return res.status(400).json({ error: 'Provide valid data' });
    }


    if (!token) {
        return res.status(401).json({ error: 'Un Authenticate' });
    }

    db.get(`SELECT * FROM accounts WHERE secret_token = ?`, [token], (err, account) => {
        if (err || !account) {
            return res.status(401).json({ error: 'Un Authenticate' });
        }

        db.all(`SELECT * FROM destinations WHERE account_id = ?`, [account.id], async (err, destinations) => {
            if (err || !destinations.length) {
                return res.status(404).json({ error: 'No destinations found for this account' });
            }

            try {
                const promises = destinations.map(destination => {
                    const headers = JSON.parse(destination.headers);
                    if (destination.method.toLowerCase() === 'get') {
                        return axios.get(destination.url, { params: data, headers });
                    } else {
                        return axios({
                            method: destination.method.toLowerCase(),
                            url: destination.url,
                            data,
                            headers
                        });
                    }
                });

                await Promise.all(promises);
                res.json({ message: 'Data sent to all destinations successfully.' });
            } catch (error) {
                res.status(500).json({ error: 'Error sending data to destinations' });
            }
        });
    });

}
