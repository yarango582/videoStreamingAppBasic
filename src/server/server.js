const express = require('express');
const http = require('http');
const { server } = require('../locales/messages.local.json');

class Server {
    static app;
    static http;
    static isRunning;
    static async config(path) {
        try {
            this.app = express();
            this.app.use(express.static(path));
            this.http = http.createServer(this.app);
            this.app.set('port', process.env.PORT || 8000);
            this.isRunning = true;
        } catch (error) {
            return {
                message: server.serverError,
                details: error
            };
        }
    }
    static async getRoutes(routes) {
        this.isRunning
            ? this.app.use(routes)
            : false;
    }
    static async init() {
        this.isRunning
            ? this.http.listen(this.app.get('port'), () => console.log(`${server.serverUp}${this.app.get('port')}`))
            : false;
    }
    static async getInstance() {
        return this.http;
    }
}

module.exports = {
    Server
}