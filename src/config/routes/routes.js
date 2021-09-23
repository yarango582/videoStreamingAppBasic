const { Router } = require('express');

const routes = Router();

routes.get('/', (request, response) => {
    response.redirect('index.html');
});

module.exports = {
    routes
}