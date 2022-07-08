'use strict';

/**
 *  grammar controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const Grammar = 'api::grammar.grammar';
const GrammarQuestion = 'api::grammar-question.grammar-question';
const Question = 'api::question.question';
module.exports = createCoreController(Grammar, {
    async findList(ctx) {
        try {
            const { limit, start } = ctx.query;
            console.log(limit, start);
            const rs = await strapi
                .query(Vocabulary)
                .findMany({ limit: 10, offset: 0 });
            console.log(rs);
            return this.transformResponse(rs);
        } catch (error) {
            return this.transformResponse(error);
        }
    },
    async updateGrammarQuestion() {
        try {
            const { id } = ctx.params;
            const { questionList } = ctx.request.body;

            const res = await strapi.query(Grammar).findOne({
                where: {
                    id: id,
                },
            });

            if (!res) {
                return reject(errors.RECORD_NOT_FOUND);
            }
            const kq = await strapi.db.query(GrammarQuestion).findMany({
                where: {
                    grammarId: res.id,
                },
            });
            for (const item of kq) {
                await strapi.entityService.delete(GrammarQuestion, item.id);
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
                await strapi.entityService.create(GrammarQuestion, {
                    data: {
                        questionId: iterator.id,
                        grammarId: res.id,
                    },
                });
            }
            const data = await strapi.query(Grammar).findOne({
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
    async findAll(ctx) {
        try {
            let { page, pageSize, sort, filters } = ctx.query;
            let curPage = 0;
            page ? page : (page = 1);
            pageSize ? pageSize : (pageSize = 10);
            curPage = page - 1;
            const rs = await strapi.query(Grammar).findMany({
                limit: pageSize,
                offset: pageSize * curPage,
                orderBy: sort || { id: 'asc' },
                filters: filters,
                populate: ['pointLadder', 'questions'],
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
            const res = await strapi(Grammar).findOne({
                where: {
                    id: id,
                },
                populate: ['questions', 'pointLadder'],
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