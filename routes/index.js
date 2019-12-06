'use strict';
const bodyParser = require('body-parser');
var cors = require('cors');
const PostRoutes = require('./post');
const LongPollingRoutes = require('./long-polling');

module.exports = app => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );

    app.use('/api/posts', new PostRoutes(app));

    app.use('/long-polling', new LongPollingRoutes(app));

    app.get('/', (req, res) => {
        res.status(200).send('Blog server is running...');
    });
};
