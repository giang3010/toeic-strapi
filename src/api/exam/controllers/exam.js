'use strict';

/**
 *  exam controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const Exam = 'api::exam.exam';
const PointLadderExam = 'api::point-ladder-exam.point-ladder-exam';
const Question = 'api::question.question';
const ExamLog = 'api::exam-log.exam-log';
module.exports = createCoreController(Exam, {
    shuffle(array, numQs) {
        if (array.length < numQs) {
            numQs = array.length;
        }
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.slice(0, numQs);
    },

    async findAll(ctx) {
        try {
            const { code } = ctx.request.partition;
            let { page, pageSize, sort, filters } = ctx.query;
            let curPage = 0;
            page ? page : (page = 1);
            pageSize ? pageSize : (pageSize = 10);
            curPage = page - 1;
            const rs = await strapi.query(Exam).findMany({
                limit: pageSize,
                offset: pageSize * curPage,
                orderBy: sort || { id: 'asc' },
                filters: filters,
                where: {
                    partitionCode: code,
                },
                populate: ['pointLadder'],
            });
            for (const iterator of rs) {
                let numQ = 0;
                const paField = Object.keys(iterator.content);
                for (const part of paField) {
                    const field = Object.keys(iterator.content[part]);
                    for (const level of field) {
                        numQ += iterator.content[part][level];
                    }
                }
                iterator.numQuestion = numQ;
            }
            return this.transformResponse(rs);
        } catch (error) {
            return this.transformResponse(error);
        }
    },

    async findById(ctx) {
        try {
            const { id } = ctx.params;
            const { code } = ctx.request.partition;
            const rs = await strapi.query(Exam).findOne({
                where: {
                    id,
                    partitionCode: code,
                },
                populate: ['pointLadder'],
            });
            if (!rs) {
                return 'common.RecordNotFound';
            }
            return this.transformResponse(rs);
        } catch (error) {
            return this.transformResponse(error);
        }
    },

    async generateExam(ctx) {
        try {
            const { id } = ctx.params;
            const exam = await strapi.query(Exam).findOne({
                where: { id },
            });
            if (!exam) {
                return 'common.recordNotFound';
            }
            let len = 0;
            let arrQsFinal = [];
            const borFld = Object.keys(exam.content);
            for (const part of borFld) {
                const field = Object.keys(exam.content[part]);

                for (const pointLadder of field) {
                    const arr = [];
                    const arrQs = [];
                    len += exam.content[part][pointLadder];
                    console.log(1, pointLadder);
                    const lad = await strapi.query(PointLadderExam).findMany({
                        where: {
                            pointLadder: Number(pointLadder),
                        },
                        populate: ['questionId'],
                    });
                    console.log(2, lad);
                    for (const iterator of lad) {
                        if (iterator.questionId) {
                            arr.push(iterator.questionId.id);
                        }
                        console.log(3, arr);
                    }

                    const qs = await strapi.query(Question).findMany({
                        where: {
                            id: arr,
                            part: Number(part),
                        },
                    });
                    console.log(4, qs);
                    for (const iterator of qs) {
                        arrQs.push(iterator.id);
                    }
                    arrQsFinal = [
                        ...arrQsFinal,
                        ...this.shuffle(arrQs, exam.content[part][pointLadder]),
                    ];
                }
            }
            arrQsFinal = this.shuffle(arrQsFinal, arrQsFinal.length);
            if (arrQsFinal.length !== len) {
                return 'common.notEnoughQuestion';
            }

            const resQs = strapi.query(Question).findMany({
                where: { id: arrQsFinal },
                populate: {
                    answers: true,
                    children: {
                        populate: {
                            answers: true,
                        },
                    },
                },
            });

            let rs = JSON.parse(JSON.stringify(resQs));
            rs = this.shuffle(rs, rs.length);
            let data = JSON.parse(JSON.stringify(rs));
            data = _.sortBy(data, 'part');
            data = _.groupBy(data, 'part');
            return this.transformResponse(data);
        } catch (error) {
            return this.transformResponse(error);
        }
    },
    async generate(id) {
        try {
            const exam = await strapi.query(Exam).findOne({
                where: { id },
            });
            if (!exam) {
                return 'common.recordNotFound';
            }
            let len = 0;
            let arrQsFinal = [];
            const borFld = Object.keys(exam.content);
            for (const part of borFld) {
                const field = Object.keys(exam.content[part]);

                for (const pointLadder of field) {
                    const arr = [];
                    const arrQs = [];
                    len += exam.content[part][pointLadder];
                    console.log(1, pointLadder);
                    const lad = await strapi.query(PointLadderExam).findMany({
                        where: {
                            pointLadder: Number(pointLadder),
                        },
                        populate: ['questionId'],
                    });
                    console.log(2, lad);
                    for (const iterator of lad) {
                        if (iterator.questionId) {
                            arr.push(iterator.questionId.id);
                        }
                        console.log(3, arr);
                    }

                    const qs = await strapi.query(Question).findMany({
                        where: {
                            id: arr,
                            part: Number(part),
                        },
                    });
                    console.log(4, qs);
                    for (const iterator of qs) {
                        arrQs.push(iterator.id);
                    }
                    arrQsFinal = [
                        ...arrQsFinal,
                        ...this.shuffle(arrQs, exam.content[part][pointLadder]),
                    ];
                }
            }
            arrQsFinal = this.shuffle(arrQsFinal, arrQsFinal.length);
            if (arrQsFinal.length !== len) {
                return 'common.notEnoughQuestion';
            }

            const resQs = strapi.query(Question).findMany({
                where: { id: arrQsFinal },
                populate: {
                    answers: true,
                    children: {
                        populate: {
                            answers: true,
                        },
                    },
                },
            });

            let rs = JSON.parse(JSON.stringify(resQs));
            rs = this.shuffle(rs, rs.length);
            let data = JSON.parse(JSON.stringify(rs));
            data = _.sortBy(data, 'part');
            data = _.groupBy(data, 'part');
            return this.transformResponse(data);
        } catch (error) {
            return this.transformResponse(error);
        }
    },
    async listLog(ctx) {
        try {
            const { pointLadder } = ctx.params;
            const { id } = ctx.state.user;

            const [entries, count] = await strapi.query(ExamLog).findWithCount({
                where: {
                    $and: [{
                            userId: id,
                        },
                        {
                            pointLadder: pointLadder,
                        },
                    ],
                },
            });

            return entries;
        } catch (error) {
            return this.transformResponse(error);
        }
    },
    async generateInputTest() {
        try {
            const exams = await strapi.query(Exam).findMany({
                where: {
                    inputTest: true,
                },
            });
            if (exams.length === 0) {
                return 'common.recordNotFound';
            }

            const exam = this.shuffle(exams, 1)[0];
            let len = 0;
            const borFld = Object.keys(exam.content);
            for (const part of borFld) {
                const field = Object.keys(exam.content[part]);
                for (const pointLadder of field) {
                    len += exam.content[part][pointLadder];
                }
            }
            len;
            const a = exam.id;
            const rs = await this.generate(a);
            console.log(rs);
            return {
                time: exam.time,
                numQuestions: len,
                exam: rs,
            };
        } catch (error) {
            return this.transformResponse(error);
        }
    },

    async generateLevelTest(ctx) {
        try {
            const { pointLadder } = ctx.params;
            const pls = await strapi.query(PointLadderExam).findMany({
                where: {
                    pointLadder: pointLadder,
                },
            });
            const ids = pls.map((val) => val.questionId);
            const exams = await strapi.query(Exam).findMany({
                where: {
                    levelTest: true,
                    id: ids,
                },
            });
            if (exams.length === 0) {
                return 'common.recordNotFound';
            }
            const exam = this.shuffle(exams, 1)[0];
            const a = exam.id;
            const rs = await this.generate(a);
            console.log(rs);
            return this.transformResponse(rs);
        } catch (error) {
            return this.transformResponse(error);
        }
    },
});