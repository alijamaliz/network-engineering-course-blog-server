'use strict';

const PostService = require('../services/post');

class PostController {
    /**
     * Post API Middlewares
     */
    constructor() {
        this.getAllPosts = this.getAllPosts.bind(this);
        this.postService = new PostService();
    }

    /**
     * Get list of all posts
     * @param  {Object} req
     * @param  {Object} res
     */
    async getAllPosts(req, res) {
        res.status(200).send(await this.postService.getAllPosts());
    }
}

module.exports = PostController;
