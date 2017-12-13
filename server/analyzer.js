var express = require('express')
var bodyParser = require('body-parser')
var s11 = require('sharp11')
var cors = require('cors')

const app = express();
app.use(cors)

const PORT = 3000 || process.env.PORT;

app.post('/chord', (req, res) => {
    console.log(req.body)
    
})

app.get('/', (req, res) => {
    res.send('Running on port ' + PORT)
})

const getChord = (notes) => {
    return s11.identifyArray(notes);
}

app.listen(PORT, () => {
    console.log('Analyzer listening on port ' + PORT);
})