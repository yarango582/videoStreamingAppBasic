const { events } = require('../locales/messages.local.json');

class EventManager {
    static io;
    static async init(io) {
        try {
            io
                ? this.io = io
                : false
            io 
                ? await this.events()
                : false;
        } catch (error) {
            return {
                message: events.eventsError,
                details: error
            }
        }
    }
    static async events() {
        this.io.on('connection', (socket) => {
            socket.on('stream', (image) => {
                socket.broadcast.emit('stream', image);
            });
        })
    }
}

module.exports = {
    EventManager
}