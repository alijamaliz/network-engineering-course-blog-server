'use strict';

const DBHelper = require('../helper/db');

class PostService {
    /**
     * Post API Service
     */
    constructor() {
        this.getAllPosts = this.getAllPosts.bind(this);
        this.db = new DBHelper();
    }

    /**
     * Get list of all posts
     */
    async getAllPosts() {
        return new Promise((resolve, reject) => {
            this.db
                .query('SELECT * FROM posts ORDER BY id ASC')
                .then(res => resolve(res.rows))
                .catch(err => reject(err));
        });
    }
}

module.exports = PostService;
