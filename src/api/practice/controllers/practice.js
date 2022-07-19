'use strict';

/**
 *  practice controller
 */
const _ = require('lodash');
const { createCoreController } = require('@strapi/strapi').factories;
const Practice = 'api::practice.practice';
const PointLadder = 'api::point-ladder.point-ladder';
module.exports = createCoreController(Practice, {
    async findAll(ctx) {
        try {
            const { code } = ctx.request.partition;
            let { page, pageSize, sort, filters } = ctx.query;
            let curPage = 0;
            page ? page : (page = 1);
            pageSize ? pageSize : (pageSize = 10);
            curPage = page - 1;
            console.log(page, pageSize);
            const rs = await strapi.query(Practice).findMany({
                limit: pageSize,
                offset: pageSize * curPage,
                orderBy: sort || { id: 'asc' },
                filters: filters,
                where: {
                    partitionCode: code,
                },
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
            const { code } = ctx.request.partition;
            console.log(code);
            const rs = await strapi.query(Practice).findOne({
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

    async createPrac(ctx) {
        try {
            const { body } = ctx.request;
            const tp = _.omit(body, ['pointLadder']);
            const nPrac = await strapi.entityService.create(Practice, {
                data: tp,
            });
            for (const iterator of body.pointLadder) {
                const pl = {
                    practiceId: nPrac.id,
                    pointLadder: iterator,
                };
                await strapi.entityService.create(PointLadder, {
                    data: pl,
                });
            }
            const rs = await strapi.query(Practice).findOne({
                where: {
                    id: nPrac.id,
                },
                populate: ['pointLadder'],
            });
            return this.transformResponse(rs);
        } catch (error) {
            return this.transformResponse(error);
        }
    },

    async generate(ctx) {
        try {
            const { id } = ctx.params;
            const practice = await strapi.entityService.findOne(Practice, {
                where: {
                    id: id,
                },
                populate: ['pointLadder'],
            });
            //....
            return this.transformResponse(practice);
        } catch (error) {
            return this.transformResponse(error);
        }
    },
});