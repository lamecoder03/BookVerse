const Joi = require('joi');
const joi = require('joi');

module.exports.bookSchema = joi.object({
        book : Joi.object({
            title: Joi.string().required(),
            year: Joi.number().required().min(0),
            // image: Joi.string().required(),
            genre: Joi.string().required(),
            description: Joi.string().required(),
            writer: Joi.string().required()
        }).required(),

        deleteImages: Joi.array()
});

module.exports.reviewSchema = joi.object({
        review : joi.object({
            rating: joi.number().required().min(1).max(5),
            body: joi.string().required()
        }).required()
});
