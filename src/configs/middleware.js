module.exports = {
    name: 'strapi::cors',
    config: {
        origin: [],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
        headers: ['Content-Type', 'Authorization', 'partition'],
        keepHeaderOnError: true,
    },
};