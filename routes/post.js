'use strict';

const { Router } = require('express');
const PostController = require('../controllers/post');

class Api {
    /**
     * @param {Express} app
     * @return {Router}
     */
    constructor(app) {
        this.router = new Router();
        const {
            getAllPosts,
            getSpecificPost,
            createNewPost,
            deleteSpecificPost
        } = new PostController(app);

        this.router.use(
            '/',
            new Router()
                .get('/', getAllPosts)
                .post('/', createNewPost)
                .get('/:postId', getSpecificPost)
                .delete('/:postId', deleteSpecificPost)
        );

        return this.router;
    }
}

module.exports = Api;
