'use strict';

/**
 *  question controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const Question = 'api::question.question';

module.exports = createCoreController(Question, {
    async findListByIds(ctx) {
        try {
            const { ids } = ctx.query;
            console.log(ids);
            const rs = await strapi
                .query(Question)
                .findMany({ where: { id: ids } });
            return this.transformResponse(rs);
        } catch (error) {
            return this.transformResponse(error);
        }
    },

    async findAll() {
        try {
            const rs = await strapi.service(Question).findAll();
            return this.transformResponse(rs);
        } catch (error) {
            return this.transformResponse(error);
        }
    },
});