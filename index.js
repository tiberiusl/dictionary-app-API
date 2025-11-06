const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(htmlPath, (err) => {
        res.send('error occurred')
    })
});


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});