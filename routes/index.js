'use strict';
const bodyParser = require('body-parser');
const PostRoutes = require('./post');

module.exports = app => {
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );
    
    app.use('/api/posts', new PostRoutes(app));

    app.get('/', (req, res) => {
        res.status(200).send('Blog server is running...');
    });
};
