module.exports = {
    routes: [{
        // Path defined with a regular expression
        method: 'GET',
        path: '/targets2', // Only match when the URL parameter is composed of lowercase letters
        handler: 'target.find',
    }, ],
};