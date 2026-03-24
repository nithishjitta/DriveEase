const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/cars', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    res.json(data.cars);
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})