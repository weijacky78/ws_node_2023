class WebSocketService {

    connnection = null;
    onmessage = null;
    constructor() {
        this.connnection = new WebSocket('wss://' + window.location.host);

        this.connnection.onmessage = (ev) => {
            console.log(JSON.parse(ev.data));
            if (this.onmessage != null) {
                this.onmessage(JSON.parse(ev.data));
            }
        };

        this.connnection.onopen = () => {
            this.sendMessage("hello server, this is the client!");
        }

    }
    sendMessage(msg) {
        let dataMsg = { type: 'message', data: msg };
        this.connnection.send(JSON.stringify(dataMsg));
    }
}

export default WebSocketService;