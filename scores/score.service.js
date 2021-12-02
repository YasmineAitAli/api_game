const config = require('config.json');
const jwt = require('jsonwebtoken');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
};


async function getAll() {
    return await db.Score.findAll({ order:[['score','DESC']], limit: 10, nest: true, include: {
        model: db.User,
        attributes:['id','username', 'firstName', 'lastName']
    } });
}

async function getById(id) {
    return await getScore(id);
}

async function create(params) {
    // save score
    await db.Score.create(params);
}