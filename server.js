const express = require('express');
var cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const uri = "mongodb+srv://marina:marina@cluster0.iczim.mongodb.net/<dbname>?retryWrites=true&w=majority";
const dbName = "NoteDB";

// Некоторые настройки безопасности
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// Enable All CORS Requests
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

(async function () {
    let client;

    try {
        client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000
        });
        console.log("Connected correctly to server");

        const db = client.db(dbName);
        require('./app/routes')(app, db);

        app.listen(port, () => {
            console.log(`We're live on ${port}`);
        });
    } catch (err) {
        console.log(err.stack);
    }
})();
