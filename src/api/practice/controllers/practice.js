'use strict';

/**
 *  practice controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const Practice = 'api::practice.practice';
module.exports = createCoreController(Practice, {
    async findAll() {
        try {
            const rs = await strapi.entityService.findMany(Practice, {
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
            console.log(id);
            const rs = await strapi.entityService.findMany(Practice, {
                where: {
                    id: id,
                },
                populate: ['pointLadder'],
            });
            return this.transformResponse(rs);
        } catch (error) {
            return this.transformResponse(error);
        }
    },
});