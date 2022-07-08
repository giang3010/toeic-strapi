'use strict';

/**
 *  vocabulary controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const qs = require('qs');
const Vocabulary = 'api::vocabulary.vocabulary';
const VocabQuestion = 'api::vocab-question.vocab-question';
const Question = 'api::question.question';
module.exports = createCoreController(Vocabulary, {
    async updateVocabQuestion(ctx) {
        try {
            const { id } = ctx.params;
            const { questionList } = ctx.request.body;

            const res = await strapi.query(Vocabulary).findOne({
                where: {
                    id: id,
                },
            });

            if (!res) {
                return reject(errors.RECORD_NOT_FOUND);
            }
            const kq = await strapi.db.query(VocabQuestion).findMany({
                where: {
                    vocabularyId: res.id,
                },
            });
            for (const item of kq) {
                await strapi.entityService.delete(VocabQuestion, item.id);
            }
            // const questions = await strapi
            //     .service(Question)
            //     .findList(questionList);
            //===
            const questions = await strapi.db.query(Question).findMany({
                where: {
                    id: {
                        $in: questionList,
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
            for (const iterator of questions) {
                await strapi.entityService.create(VocabQuestion, {
                    data: {
                        questionId: iterator.id,
                        vocabularyId: res.id,
                    },
                });
            }
            const data = await strapi.query(Vocabulary).findOne({
                where: {
                    id,
                },
                populate: ['questions'],
            });
            return this.transformResponse(data);
        } catch (error) {
            return this.transformResponse(error);
        }
    },

    async findByListIds(ctx) {
        try {
            const { ids } = ctx.body;
            console.log(1, ctx.body);
            const rs = await strapi.query(Vocabulary).findMany({
                where: {
                    id: { $in: [2, 3, 4] },
                },
            });
            return this.transformResponse(rs);
        } catch (error) {
            return this.transformResponse(error);
        }
    },

    async findAll(ctx) {
        try {
            let { page, pageSize, sort, filters } = ctx.query;
            let curPage = 0;
            page ? page : (page = 1);
            pageSize ? pageSize : (pageSize = 10);
            curPage = page - 1;
            const rs = await strapi.query(Vocabulary).findMany({
                limit: pageSize,
                offset: pageSize * curPage,
                orderBy: sort || { id: 'asc' },
                filters: filters,
                populate: ['questions'],
            });

            const data = JSON.parse(JSON.stringify(rs));
            for (const iterator of data) {
                const ids = iterator.questions.map((gq) => gq.questionId);
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
                iterator.questions = questions;
            }

            return this.transformResponse(data);
        } catch (error) {
            return this.transformResponse(error);
        }
    },

    async findById(ctx) {
        try {
            const { id } = ctx.params;
            const res = await strapi.query(Vocabulary).findOne({
                where: {
                    id: id,
                },
                populate: ['questions'],
            });
            if (!res) {
                return 'common.recordNotFound';
            }
            const ids = res.questions.map((gq) => gq.questionId);
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
            const raw = JSON.parse(JSON.stringify(res));
            raw.questions = questions;
            return this.transformResponse(raw);
        } catch (error) {
            return this.transformResponse(error);
        }
    },
});