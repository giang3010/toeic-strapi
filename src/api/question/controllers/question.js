'use strict';

/**
 *  question controller
 */
const _ = require('lodash');
const { createCoreController } = require('@strapi/strapi').factories;
const Question = 'api::question.question';
const ChildQuestion = 'api::child-question.child-question';
const Answer = 'api::answer.answer';
const PointLadderExam = 'api::point-ladder-exam.point-ladder-exam';

module.exports = createCoreController(Question, {
    async findListByIds(ctx) {
        try {
            const { ids } = ctx.request.body;
            const { code } = ctx.request.partition;
            const res1 = await strapi.db.query(Question).findMany({
                where: {
                    id: {
                        $in: ids,
                    },
                    partitionCode: code,
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

            return this.transformResponse(res1);
        } catch (error) {
            return this.transformResponse(error);
        }
    },

    async findById(ctx) {
        try {
            const { id } = ctx.params;
            const { code } = ctx.request.partition;
            const rs = await strapi.query(Question).findOne({
                where: {
                    id,
                    partitionCode: code,
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
            return this.transformResponse(rs);
        } catch (error) {
            return this.transformResponse(error);
        }
    },

    async findAll(ctx) {
        try {
            const { code } = ctx.request.partition;
            let { page, pageSize, sort, filters } = ctx.query;
            let curPage = 0;
            page ? page : (page = 1);
            pageSize ? pageSize : (pageSize = 10);
            curPage = page - 1;

            const rs = await strapi.query(Question).findMany({
                limit: pageSize,
                offset: pageSize * curPage,
                orderBy: sort || { id: 'asc' },
                filters: filters,
                where: {
                    partitionCode: code,
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

            return this.transformResponse(rs);
        } catch (error) {
            return this.transformResponse(error);
        }
    },

    async createMixQuestion(ctx) {
        try {
            const { body } = ctx.request;
            const qsDto = _.omit(body, ['children', 'pointLadder']);
            const qs = await strapi.entityService.create(Question, {
                data: {...qsDto, type: 'mix' },
            });
            for (const [index, child] of body.children.entries()) {
                const qscDto = _.omit(child, ['answers']);
                const datachild = {
                    ...qscDto,
                    type: body.typeSingleQuestion,
                    order: index,
                    parentId: qs.id,
                };
                const qsChild = await strapi.entityService.create(
                    ChildQuestion, {
                        data: datachild,
                    },
                );

                for (const answer of child.answers) {
                    const dataans = {
                        ...answer,
                        questionChildrenId: qsChild.id,
                    };

                    const ans = await strapi.entityService.create(Answer, {
                        data: dataans,
                    });
                    console.log(2, ans);
                }
            }
            for (const iterator of body.pointLadder) {
                const dataPLE = {
                    pointLadder: [iterator],
                    questionId: qs.id,
                };
                const pl = await strapi.entityService.create(PointLadderExam, {
                    data: dataPLE,
                });
                console.log(3, pl);
            }
            const rs = await strapi.query(Question).findOne({
                where: {
                    id: qs.id,
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
            return this.transformResponse(rs);
        } catch (error) {
            return this.transformResponse(error);
        }
    },

    async updateMixQuestion(ctx) {
        try {
            const { id } = ctx.params;
            const { body } = ctx.request;

            const qsDto = _.omit(body, ['children', 'pointLadder']);

            const qs = await strapi.query(Question).findOne({
                where: {
                    id,
                },
            });
            if (!qs) {
                return 'common.recordNotFound';
            }
            await strapi.entityService.update(Question, qsDto);
            const childqs = await strapi.query(ChildQuestion).findAll({
                where: {
                    parentId: qs.id,
                },
            });
            const childId = [];
            for (const iterator of childqs) {
                childId.push(iterator.id);
            }
            await strapi.entityService.delete(ChildQuestion, {
                where: {
                    parentId: childId,
                },
            });
            await strapi.entityService.delete(Answer, {
                where: {
                    questionChildrenId: childId,
                },
            });
            if (body.pointLadder) {
                await strapi.entityService.delete(PointLadderExam, {
                    where: {
                        questionId: qs.id,
                    },
                });
                for (const iterator of body.pointLadder) {
                    await strapi.entityService.create(PointLadderExam, {
                        data: {
                            pointLadder: iterator,
                            questionId: qs.id,
                        },
                    });
                }
            }

            for (const [index, child] of body.children.entries()) {
                const qscDto = _.omit(child, ['answers']);
                const qsChild = await strapi.entityService.create(
                    ChildQuestion, {
                        data: {
                            ...qscDto,
                            type: body.typeSingleQuestion,
                            order: index,
                            parentId: qs.id,
                        },
                    },
                );
                for (const answer of child.answers) {
                    const ans = await strapi.entityService.create(Answer, {
                        data: {
                            ...answer,
                            questionChildrenId: qsChild.id,
                        },
                    });
                }
            }
            const rs = await strapi.query(Question).findOne({
                where: {
                    id: qs.id,
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
            return this.transformResponse(rs);
        } catch (error) {
            return error;
        }
    },
});