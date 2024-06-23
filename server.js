// app.js
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./app/router')
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api', apiRoutes)

app.get('/', (req, res) => {
    return res.send("Server is listening")
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
