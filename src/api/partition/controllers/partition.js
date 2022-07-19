'use strict';

/**
 *  partition controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { parseMultipartData, sanitizeEntity } = require('@strapi/utils');
const Partition = 'api::partition.partition';
const Sms = 'api::sms.sms';

module.exports = createCoreController(Partition, {
    async findAll(ctx) {
        try {
            let { page, pageSize, sort, filters } = ctx.query;
            let curPage = 0;
            page ? page : (page = 1);
            pageSize ? pageSize : (pageSize = 10);
            curPage = page - 1;
            const rs = await strapi.query(Partition).findMany({
                limit: pageSize,
                offset: pageSize * curPage,
                orderBy: sort || { id: 'asc' },
                filters: filters,
                populate: ['image'],
            });
            //strapi.services.sendmail.send(welcome, toEmail, 'Welcome', `A product has been created ${entity.name}`);
            return this.transformResponse(rs);
        } catch (error) {
            return this.transformResponse(error);
        }
    },
});