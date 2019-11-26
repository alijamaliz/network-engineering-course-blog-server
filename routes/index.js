'use strict';

const PostRoutes = require('./post');

module.exports = app => {
    app.use('/api/posts', new PostRoutes(app));

    app.get('/', (req, res) => {
        res.status(200).send("Blog server is running...");
    });
};
