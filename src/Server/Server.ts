import { createServer, IncomingMessage, ServerResponse } from 'http';
import { LoginHandler } from './LoginHandler';
import { Utils } from './Utils';

export class Server {

    private somePrivateLogic() {
        console.log('doing private logic');
    }

    public createServer() {
        createServer(
            async (req: IncomingMessage, res: ServerResponse) => {
                console.log('got request from:' + req.url);
                const basePath = Utils.getUrlBasePath(req.url);
                res.end();
                switch (basePath) {
                    case 'login':
                       await new LoginHandler(req, res).handleRequest();
                        break;

                    default:
                        break;
                }
            }
        ).listen(8080);
        console.log('server started');
    }

} 1