module.exports = () => {
    return async(ctx, next) => {
        try {
            const { partition } = ctx.request.header;

            if (partition) {
                const part = await strapi
                    .query('api::partition.partition')
                    .findOne({
                        where: {
                            code: partition,
                        },
                    });

                if (part) {
                    ctx.request.partition = part;
                } else {
                    ctx.request.partition = null;
                }
            }
        } catch (error) {
            ctx.request.partition = null;
        }

        await next();
    };
};