import { IncomingMessage, ServerResponse } from 'http';


export class LoginHandler {

    private req: IncomingMessage;
    private res: ServerResponse;


    public constructor(req: IncomingMessage, res: ServerResponse) {
        this.req = req;
        this.res = res;
    }

    public async handleRequest(): Promise<void> {
        console.log('before getting Body');
        const body = await this.getRequestBody();
        console.log('Username: ' + body.username);
        console.log('Password: ' + body.password);
    }

    private async getRequestBody(): Promise<any> {
        return new Promise((resolve, reject) => {
            let body = '';
            this.req.on('data', (data: string) => {
                body += data;
            });
            this.req.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (error) {
                    reject(error);
                }
            });
            this.req.on('erro', (error: any) => {
                reject(error);
            });
        });
    }
}