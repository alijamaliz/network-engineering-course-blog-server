'use strict';

const DBHelper = require('../helper/db');
const Exceptions = require('../util/exceptions');

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

    /**
     * Get specifoc post by id
     * @param  {Number} postId
     */
    async getSpecificPostById(postId) {
        return new Promise((resolve, reject) => {
            this.db
                .query(`SELECT * FROM posts WHERE id=$1::integer`, [postId])
                .then(res => {
                    if (res.rows.length === 1) resolve(res.rows[0]);
                    else throw new Exceptions.NotFoundException();
                })
                .catch(err => reject(err));
        });
    }

    /**
     * Create new post
     * @param {Object} post
     */
    async createNewPost(post) {
        return new Promise((resolve, reject) => {
            this.db
                .query(
                    `INSERT INTO posts (title, description, create_date, image_path)
                    VALUES ($1, $2, current_timestamp, NULL) RETURNING *`,
                    [post.title, post.description]
                )
                .then(res => resolve(res.rows[0]))
                .catch(err => reject(err));
        });
    }

    /**
     * Delete specifoc post by id
     * @param  {Number} postId
     */
    async deleteSpecificPostById(postId) {
        return new Promise((resolve, reject) => {
            this.db
                .query(`DELETE FROM posts WHERE id=$1`, [postId])
                .then(res => {
                    if (res.rowCount > 0) resolve();
                    else throw new Exceptions.NotFoundException();
                })
                .catch(err => reject(err));
        });
    }
}

module.exports = PostService;
