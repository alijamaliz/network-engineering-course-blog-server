'use strict';

class PostController {
    /**
     * User API Middlewares
     */
    constructor() {
        this.getAllPosts = this.getAllPosts.bind(this);
    }

    /**
     * Get list of all posts
     * @param  {Object} req
     * @param  {Object} res
     */
    getAllPosts(req, res) {
        res.status(200).send("All posts");
    }
}

module.exports = PostController;
