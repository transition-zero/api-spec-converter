'use strict';

const express = require('express');
var bodyParser = require('body-parser');
var Converter = require('api-spec-converter');
const helmet = require("helmet");

// Constants
const PORT = process.env.PORT;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

console.log(process.env.key)


app.post('/', (req, res) => {
    
    // check our auth
    
    if (  req.body.key !== process.env.key ) {        
        res.status(401).send('Authentication required.')
    } else {
    
        Converter.convert({
            from: req.body.from,
            to: req.body.to,
            source: req.body.source,
        })
        .then(function(converted) {
            res.send(converted.stringify());
        });
    }
  
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});