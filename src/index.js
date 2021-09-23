const { Server, Sockets } = require('./server');
const path = require('path');
const config = require('./config/config.json');
const { error } = require('./locales/messages.local.json');
const { routes } = require('./config/routes/routes');
const { EventManager } = require('./events/eventManager');

const routeStaticFiles = path.join(__dirname, config.staticFiles);
let io;

(async () => {
    try {
        await Server.config(routeStaticFiles);
        await Server.getRoutes(routes);
        await Server.init();
        io = await Sockets.init(await Server.getInstance());
        await EventManager.init(io);
    } catch (detailError) {
        console.log(`${error}: ${detailError}`);
    }
})();