const  express = require ('express');
const Joi = require ('joi');

//const { repositorios} = require ('../repositories);

async function getComments (req, res, next) {
    try {
        const comments = await commentsRepository.getComments ();
        res.send (comments);

    } catch (err) {
        next (err);
    }
    
}

async function createComments (req, res, next) {
    try {
        const {storiesId} = req. params;
        const {id} = req. auth;
        const {write} = req.body;

        const schema = Joi.object ({
            write : Joi.string().max(250),
        })
        await schema.validateAsync ({write});

        const story = await storiesRepository.findStoriesById(storiesId);
        if(!story) {
            const err = new Error ('La historia no existe');
            err.code = 404;
            throw err;
        }

        const dataComments = {userId:id, storiesId, write};
        const writeComments = await commentsRepository.addWriteComments (dataComments);

        res.status (201);

    } catch (err) {
        next(err);
    }
}

async function editComments (req, res, next) {
    try {
        const {storiesId} = req. params;
        const {id} = req. auth;
        const {write} = req.body;

        const schema = Joi.object ({
            write : Joi.string().max(250),
        })
        await schema.validateAsync ({write});

        const story = await storiesRepository.findStoriesById(storiesId);
        if(!story) {
            const err = new Error ('La historia no existe');
            err.code = 404;
            throw err;
        }

        const dataComments = {userId:id, storiesId, write};
        const writeComments = await commentsRepository.editWriteComments (dataComments);

        res.status (201);

    } catch (err) {
        next(err);
    }
}

async function  deleteComments (req, res, next) { /////////DELETE/////////////////////////////////////////////////////////////////////////////////
    try {
        const {storiesId} = req. params;
        const {id} = req. auth;
        const {write} = req.body;

        const schema = Joi.object ({
            write : Joi.string().max(250),
        })
        await schema.validateAsync ({write});

        const story = await storiesRepository.findStoriesById(storiesId);
        if(!story) {
            const err = new Error ('La historia no existe');
            err.code = 404;
            throw err;
        }

        const dataComments = {userId:id, storiesId, write};
        const writeComments = await commentsRepository.editWriteComments (dataComments);

        res.status (201);

    } catch (err) {
        next(err);
    }
}

module.exports = {getComments, createComments, editComments, deleteComments};