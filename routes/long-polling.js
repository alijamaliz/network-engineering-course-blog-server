'use strict';

const { Router } = require('express');
const LongPollingController = require('../controllers/long-polling');

class LongPollingApi {
    /**
     * @param {Express} app
     * @return {Router}
     */
    constructor(app) {
        this.router = new Router();
        const { registerNewRequest } = new LongPollingController(app);

        this.router.use('/', new Router().get('/', registerNewRequest));

        return this.router;
    }
}

module.exports = LongPollingApi;
