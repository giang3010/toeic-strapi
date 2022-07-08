'use strict';

/**
 *  topic controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const Topic = 'api::topic.topic';
module.exports = createCoreController(Topic, {
    async findAll(ctx) {
        try {
            let { page, pageSize, sort, filters } = ctx.query;
            let curPage = 0;
            page ? page : (page = 1);
            pageSize ? pageSize : (pageSize = 10);
            curPage = page - 1;
            const rs = await strapi.query(Topic).findMany({
                limit: pageSize,
                offset: pageSize * curPage,
                orderBy: sort || { id: 'asc' },
                filters: filters,
                populate: ['pointLadder'],
            });
            return this.transformResponse(rs);
        } catch (error) {
            return this.transformResponse(error);
        }
    },
    async findById(ctx) {
        try {
            const { id } = ctx.params;
            const rs = await strapi.query(Topic).findOne({
                where: {
                    id,
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
});