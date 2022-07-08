module.exports = ({ env }) => ({
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    //url: env('STRAPI_BASE_URL', 'http://192.168.3.10:31865'),
    app: {
        keys: env.array('APP_KEYS'),
    },
});