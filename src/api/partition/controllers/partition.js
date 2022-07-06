'use strict';

/**
 *  partition controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { parseMultipartData, sanitizeEntity } = require('@strapi/utils');
const Partition = 'api::partition.partition';
const Sms = 'api::sms.sms';

module.exports = createCoreController(Partition, {
    async create(ctx) {
        //strapi.service(Sms).sendSms();
        try {
            const { body } = ctx.request;
            console.log(body);
            const rs = await strapi.entityService.create(Partition, {
                data: body,
            });
            return this.transformResponse(rs);
        } catch (error) {
            return this.transformResponse(error);
        }
    },
});