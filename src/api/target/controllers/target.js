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
            console.log(id, target, point);
            const curTarget = await strapi.query(Target).findOne({
                where: {
                    userId: id,
                },
            });
            console.log(1, curTarget);
            if (!curTarget) {
                const newTarget = await strapi.entityService.create(Target, {
                    data: {
                        userId: id,
                        target: target,
                        point: point || null,
                    },
                });
                console.log(2, newTarget);
                return this.transformResponse(newTarget);
            }
            const data = {
                target: target || null,
                point: point || null,
            };
            console.log(data);
            const rs = await strapi.query(Target).update({
                where: {
                    userId: id,
                },
                data: {
                    target: target || null,
                    point: point || null,
                },
                populate: ['userId'],
            });

            delete rs.password;
            delete rs.resetPasswordToken;
            delete rs.confirmationToken;
            return this.transformResponse(rs);
        } catch (error) {
            return this.transformResponse(error);
        }
    },
    async updatePoint(ctx) {
        try {
            const { id } = ctx.state.user;
            const { point, target } = ctx.request.body;
            const curTarget = await strapi.query(Target).findOne({
                where: {
                    userId: id,
                },
            });
            if (!curTarget) {
                return 'common.RecordNotFound';
            }
            console.log(point, target);
            const data = await strapi.db.query(Target).update({
                where: {
                    id,
                },
                data: {
                    point,
                },
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
            const rs = await strapi.query(Target).findMany({
                limit: pageSize,
                offset: pageSize * curPage,
                orderBy: sort || { id: 'asc' },
                filters: filters,
                populate: ['userId'],
            });
            delete rs.password;
            delete rs.resetPasswordToken;
            delete rs.confirmationToken;
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
            delete rs.password;
            delete rs.resetPasswordToken;
            delete rs.confirmationToken;
            console.log(3, rs);
            return this.transformResponse(rs);
        } catch (error) {
            return this.transformResponse(error);
        }
    },
});