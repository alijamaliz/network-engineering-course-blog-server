'use strict';

const PostService = require('../services/post');
const Exceptions = require('../util/exceptions');

class PostController {
    /**
     * Post API Middlewares
     */
    constructor() {
        this.postService = new PostService();

        this.getAllPosts = this.getAllPosts.bind(this);
        this.getSpecificPost = this.getSpecificPost.bind(this);
    }

    /**
     * Get list of all posts
     * @param  {Object} req
     * @param  {Object} res
     */
    async getAllPosts(req, res) {
        res.status(200).send(await this.postService.getAllPosts());
    }

    /**
     * Get list of all posts
     * @param  {Object} req
     * @param  {Object} res
     */
    async getSpecificPost(req, res) {
        let postId = req.params.postId;
        try {
            const post = await this.postService.getSpecificPostById(postId);
            res.status(200).send(post);
        } catch (exception) {
            if (exception instanceof Exceptions.NotFoundException) {
                res.status(404).send(JSON.parse(String(exception)));
            }
            res.status(401).end();
        }
    }
}

module.exports = PostController;
