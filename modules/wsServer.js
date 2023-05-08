const { WebSocketServer } = require('ws');
const wsConnection = require('./wsConnection');


class wsServer {

    lastUserId = 1;// last user (id)
    wsConnections = { connections: [] };
    constructor(httpserver) {
        this.wss = new WebSocketServer({ server: httpserver }); //websocket server does most of the heavy lifting
        this.wsConnections = { connections: [] };

        this.wss.on("connection", (ws) => { // new websocket connection
            let conn = new wsConnection(ws, this, this.lastUserId++); // object to handle connection
            this.wsConnections.connections.push(conn);
            conn.sendMessage("hello from server");
        });
    }

    clientDisconnected = function (sender) {
        const posConn = this.wsConnections.connections.indexOf(sender);
        this.wsConnections.connections.splice(posConn, 1);
        this.broadcastMessage(sender, 'disconnected')
    };

    broadcastMessage = function (sender, msg) {
        for (const wsc of this.wsConnections.connections) {
            if (wsc != sender) {
                wsc.sendMessage(`[${sender.userId}] ${msg}`);
            }
        }
    }
}

module.exports = wsServer;