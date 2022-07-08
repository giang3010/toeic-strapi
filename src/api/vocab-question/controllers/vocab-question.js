'use strict';

/**
 *  vocab-question controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const VocabQuestion = 'api::vocab-question.vocab-question';
const Question = 'api::question.question';
module.exports = createCoreController(VocabQuestion, {
    async findAll(ctx) {
        try {
            let { page, pageSize, sort, filters } = ctx.query;
            let curPage = 0;
            page ? page : (page = 1);
            pageSize ? pageSize : (pageSize = 10);
            curPage = page - 1;
            const rs = await strapi.query(VocabQuestion).findMany({
                limit: pageSize,
                offset: pageSize * curPage,
                orderBy: sort || { id: 'asc' },
                filters: filters,
                populate: ['vocabularyId'],
            });
            const data = JSON.parse(JSON.stringify(rs));
            for (const iterator of data) {
                const ids = [];
                ids.push(iterator.questionId);
                const questions = await strapi.db.query(Question).findMany({
                    where: {
                        id: {
                            $in: ids,
                        },
                    },
                    populate: {
                        children: {
                            populate: {
                                answers: true,
                            },
                        },

                        pointLadder: true,
                    },
                });
                iterator.questionId = questions;
            }
            return this.transformResponse(data);
        } catch (error) {
            return this.transformResponse(error);
        }
    },
    async findById(ctx) {
        try {
            let { id } = ctx.params;
            const rs = await strapi.query(VocabQuestion).findOne({
                where: {
                    id,
                },
                populate: ['vocabularyId'],
            });
            if (!rs) {
                return 'common.RecordNotFound';
            }
            const data = JSON.parse(JSON.stringify(rs));
            const question = await strapi.db.query(Question).findOne({
                where: {
                    id: data.questionId,
                },
                populate: {
                    children: {
                        populate: {
                            answers: true,
                        },
                    },

                    pointLadder: true,
                },
            });
            data.questionId = question;

            return this.transformResponse(data);
        } catch (error) {
            return this.transformResponse(error);
        }
    },
});