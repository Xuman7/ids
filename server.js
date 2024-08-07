require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { monitorDomain } = require('./monitor');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to monitor domain
app.post('/monitor', async (req, res) => {
    const { domain } = req.body;

    try {
        const isSuspicious = await monitorDomain(domain);

        if (isSuspicious) {
            res.status(200).json({ alert: true, message: `Suspicious activity detected for domain: ${domain}` });
        } else {
            res.status(200).json({ alert: false, message: `No suspicious activity detected for domain: ${domain}` });
        }
    } catch (error) {
        res.status(500).json({ alert: false, message: `Error monitoring domain: ${error.message}` });
    }
});

app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});
