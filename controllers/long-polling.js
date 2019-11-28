'use strict';

const responsesPool = [];

class LongPollingController {
    /**
     * Lonng polling Middlewares
     */
    constructor() {
        this.registerNewRequest = this.registerNewRequest.bind(this);
    }

    /**
     * Register new request for updates
     * @param  {Object} req
     * @param  {Object} res
     */
    async registerNewRequest(req, res) {
        responsesPool.push(res);
    }

    static notify(type, data) {
        for (let i = 0; i < responsesPool.length; i++) {
            responsesPool[i].status(200).send({ type, data });
        }
    }
}

module.exports = LongPollingController;
