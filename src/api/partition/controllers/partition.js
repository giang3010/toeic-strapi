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
        strapi.service(Sms).sendSms();
        strapi
            .service(Sms)
            .sendMail(
                'truonggiang301098@gmail.com',
                '0995225462g@gmail.com',
                'Welcome',
                `A partition has been created with name: ok`,
            );
        let entity;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            entity = await strapi.service(Partition).create(data, { files });
        } else {
            entity = await strapi.service(Partition).create(ctx.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models.partition });
    },
});