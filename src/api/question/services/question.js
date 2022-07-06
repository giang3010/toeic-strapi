'use strict';

/**
 * question service.
 */

const { createCoreService } = require('@strapi/strapi').factories;
const Question = 'api::question.question';

module.exports = createCoreService(Question, {
    findList(ids) {
        return new Promise(async(resolve, reject) => {
            try {
                const res1 = await strapi.db.query(Question).findMany({
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
                return resolve(res1);
            } catch (error) {
                return reject(error);
            }
        });
    },

    findAll() {
        return new Promise(async(resolve, reject) => {
            try {
                const res = await strapi.entityService.findMany(Question, {
                    populate: ['children', 'pointLadder'],
                });
                return resolve(res);
            } catch (error) {
                return reject(error);
            }
        });
    },
});