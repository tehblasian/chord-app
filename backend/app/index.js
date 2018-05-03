import express from 'express';

const app = express();

app.get('/api/', (req, res) => {
    res.send('Hello world!');
});

app.listen(process.env.PORT, 'backend', () => console.log(`Server listening on port ${process.env.PORT}`));
