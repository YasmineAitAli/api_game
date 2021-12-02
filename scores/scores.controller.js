const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const scoreService = require('./score.service');

// routes

router.get('/', authorize(), getAll);
router.post('/', createSchema, createScore);

module.exports = router;

function getAll(req, res, next) {
    scoreService.getAll()
        .then(scores => res.json(scores))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        score: Joi.number().required(),
        UserId: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}
function createScore(req, res, next){
    scoreService.create(req.body)
        .then(() => res.json({ message: 'Score creation successful' }))
        .catch(next);
}