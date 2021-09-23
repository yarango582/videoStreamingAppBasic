const { Server } = require('socket.io');
const { sockets } = require('../locales/messages.local.json');
const { pathSockets } = require('../config/config.json');

class Sockets {
    static io;
    static async init(app) {
        try {
            this.io = new Server(app);
            this.io
                ? console.log(sockets.socketsUp)
                : console.log(sockets.socketsDown);
            return this.io;
        } catch (error) {
            return {
                message: sockets.socketsError,
                details: error
            }
        }
    }
}
module.exports = {
    Sockets
};