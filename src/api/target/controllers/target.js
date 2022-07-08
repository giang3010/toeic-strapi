'use strict';

/**
 *  target controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const Target = 'api::target.target';
module.exports = createCoreController(Target, {
    async setTarget(ctx) {
        try {
            const { id } = ctx.state.user;
            const { target, point } = ctx.request.body;
            const curTarget = await strapi.query(Target).findOne({
                where: {
                    userId: id,
                },
            });
            if (!curTarget) {
                const newTarget = await strapi.entityService.create(Target, {
                    data: {
                        userId: id,
                        target: target,
                        point: point || null,
                    },
                });
                return this.transformResponse(newTarget);
            }
            const data = await strapi.entityService.update(Target, {
                target,
                point,
            });
            return this.transformResponse(data);
        } catch (error) {
            return this.transformResponse(error);
        }
    },
    async updatePoint(ctx) {
        try {
            const { id } = ctx.state.user;
            const curTarget = await strapi.query(Target).findOne({
                where: {
                    userId: id,
                },
            });
            if (!curTarget) {
                return 'common.RecordNotFound';
            }
            const data = await strapi.entityService.update(Target, { point });
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
            const rs = await strapi.query(Target).findMany({
                limit: pageSize,
                offset: pageSize * curPage,
                orderBy: sort || { id: 'asc' },
                filters: filters,
                populate: ['userId'],
            });
            return this.transformResponse(rs);
        } catch (error) {
            return this.transformResponse(error);
        }
    },
    async findById(ctx) {
        try {
            const { id } = ctx.params;
            const rs = await strapi.query(Target).findOne({
                where: {
                    id,
                },
                populate: ['userId'],
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