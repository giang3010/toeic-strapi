'use strict';

/**
 *  page1 controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const Page1 = 'api::page1.page1';
module.exports = createCoreController(Page1, {
    async findById(ctx) {
        try {
            const { id } = ctx.params;
            const rs = await strapi.query(Page1).findOne({
                where: {
                    id,
                },
                populate: {
                    seo: {
                        populate: {
                            Meta: true,
                            metaImage: true,
                        },
                    },
                    blocks: {
                        populate: {
                            images: true,
                            Header: true,
                            buttons: {
                                populate: {
                                    link: true,
                                },
                            },
                        },
                    },
                },
            });
            return this.transformResponse(rs);
        } catch (error) {
            return error;
        }
    },
    async findAll(ctx) {
        try {
            const rs = await strapi.query(Page1).findMany({
                populate: ['*'],
            });
            return this.transformResponse(rs);
        } catch (error) {
            return error;
        }
    },
});