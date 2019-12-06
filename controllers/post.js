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
        this.createNewPost = this.createNewPost.bind(this);
        this.deleteSpecificPost = this.deleteSpecificPost.bind(this);
        this.likeSpecificPost = this.likeSpecificPost.bind(this);
        this.unlikeSpecificPost = this.unlikeSpecificPost.bind(this);
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

    /**
     * Create new post
     * @param  {Object} req
     * @param  {Object} res
     */
    async createNewPost(req, res) {
        try {
            if (!req.body.title) throw new Exceptions.FieldException('title');
            if (!req.body.description) throw new Exceptions.FieldException('description');

            const post = {
                title: req.body.title,
                description: req.body.description,
                image: req.body.image || null
            };

            const newPost = await this.postService.createNewPost(post);
            res.status(200).send(newPost);
        } catch (exception) {
            if (exception instanceof Exceptions.FieldException) {
                res.status(403).send(JSON.parse(String(exception)));
            }
            res.status(403).end();
        }
    }

    /**
     * Delete specific posts
     * @param  {Object} req
     * @param  {Object} res
     */
    async deleteSpecificPost(req, res) {
        let postId = req.params.postId;
        try {
            await this.postService.deleteSpecificPostById(postId);
            res.status(201).end();
        } catch (exception) {
            if (exception instanceof Exceptions.NotFoundException) {
                res.status(404).send(JSON.parse(String(exception)));
            }
            res.status(401).end();
        }
    }

    /**
     * Like specific posts
     * @param  {Object} req
     * @param  {Object} res
     */
    async likeSpecificPost(req, res) {
        let postId = req.params.postId;
        try {
            const post = await this.postService.likeSpecificPostById(postId);
            res.status(200).send(post);
        } catch (exception) {
            if (exception instanceof Exceptions.NotFoundException) {
                res.status(404).send(JSON.parse(String(exception)));
            }
            res.status(401).end();
        }
    }

    /**
     * Unlike specific posts
     * @param  {Object} req
     * @param  {Object} res
     */
    async unlikeSpecificPost(req, res) {
        let postId = req.params.postId;
        try {
            const post = await this.postService.unlikeSpecificPostById(postId);
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
