import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(cors());

app.use(routes);
app.get('/', (req, res) => {
        res.send('404 Not Found.')
})

app.listen(port, () => {
    console.log(`Server is running and listenning at http://localhost:${port}`)
})