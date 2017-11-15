const axios = require('axios');

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/container/:containerId', async (req, res) => {
    const containerId = req.params.containerId;
    const data = await axios.get(`http://localhost:5000/msc/${containerId}`);
    const response = {
        id: containerId,
        company: "MSC",
        containerMovements: data.data
    };
    res.json(response);
})

app.listen(8081, () => {
    console.log('escutando a porta 8081')
});