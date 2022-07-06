module.exports = () => {
    return (ctx, next) => {
        const paginate = this.paginate(ctx.request);
        const where = this.where(ctx.request);
        const order = this.sort(ctx.request);

        Object.assign(ctx.request, {
            options: Object.assign({}, paginate, where, order),
        });
        next();
    };
};

function where(ctx) {
    let { filter, tags, categories } = ctx.request.query;
    const where = {};
    if (this.isJson(filter)) {
        filter = JSON.parse(filter);

        if (Array.isArray(filter)) {
            filter.forEach((field) => {
                const { operator, property } = field;
                let { value } = field;

                if (typeof value === 'string' || value instanceof String) {
                    value = value.replace(/%/g, '\\%');
                    value = value.replace(/\\/g, '\\');
                }

                if (property && operator && operators[operator]) {
                    if (specific.indexOf(operator) >= 0) {
                        value = `%${value}%`;
                    }

                    Object.assign(where, {
                        [property]: {
                            [operators[operator]]: value,
                        },
                    });
                }
                if (operator === 'search') {
                    const value = {
                        [Op.iLike]: '%' + field.value.toString() + '%',
                    };
                    const fields = field.property.split(',');
                    const filters = {};
                    fields.forEach((item) => (filters[item] = value));
                    Object.assign(where, {
                        [Op.or]: filters,
                    });
                }
            });
        }
    }

    // Handle tags when query list by tag name
    if (this.isJson(tags)) {
        tags = JSON.parse(tags);
        if (Array.isArray(tags)) {
            tags.forEach((tag) => {
                const fields = tag.split(',');
                Object.assign(where, { tags: fields });
            });
        }
    }

    // Handle categories when query list by category name
    if (this.isJson(categories)) {
        categories = JSON.parse(categories);
        if (Array.isArray(categories)) {
            categories.forEach((category) => {
                const fields = category.split(',');
                Object.assign(where, { categories: fields });
            });
        }
    }

    if (req.partition) {
        Object.assign(where, {
            partitionCode: req.partition.code,
        });
    }

    return { where };
}

function sort(ctx) {
    let { sort } = ctx.request.query;
    const order = [];

    if (!this.isJson(sort)) {
        return order;
    }

    sort = JSON.parse(sort);

    if (Array.isArray(sort)) {
        sort.forEach((field) => {
            order.push([field.property, field.direction]);
        });
    }

    return {
        order,
    };
}

function paginate(ctx) {
    const { limit, start } = ctx.request.query;
    const paginate = { limit: 10, offset: 0 };
    const ourl = req.originalUrl;
    const bookstr = [
        'books?filter',
        'questions/get-other-info',
        'books/book-total-point',
        '/exercises?',
        'exams?start=0&limit=10000',
        'questions?',
        'trainingChapters?filter',
    ];

    // has
    if (
        ourl.indexOf(bookstr[0]) > -1 ||
        ourl.indexOf(bookstr[1]) > -1 ||
        ourl.indexOf(bookstr[2]) > -1 ||
        ourl.indexOf(bookstr[4]) > -1 ||
        ourl.indexOf(bookstr[5]) > -1 ||
        ourl.indexOf(bookstr[6]) > -1 ||
        ourl.indexOf(bookstr[3]) > -1
    ) {
        if (limit) {
            paginate.limit = limit;
        }
    } else {
        if (limit) {
            paginate.limit = limit;
            if (limit > 10) {
                paginate.limit = 10;
            }
        } else paginate.limit = 10;
    }

    if (start != undefined) {
        paginate.offset = start;
    }

    return paginate;
}

function isJson(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}