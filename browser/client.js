const net = require('net');


class Request {
    constructor({
        host,
        port,
        method,
        headers,
        path,
        body,
    }) {
        this.host = host || '127.0.0.1'
        this.port = port || 80
        this.method = method || 'GET'
        this.headers = headers || {}
        this.path = path || '/'
        this.body = body || {}
        this.bodyText = ""
        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencode'
        }
        if (this.headers['Content-Type'] === 'application/x-www-form-urlencode') {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${this.body[key]}`).join('&')
        }
        if (this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(body)
        }
        this.headers['Content-Length'] = this.bodyText.length
    }
    send(connection) {
        return new Promise((resolve, reject) => {
            if (!connection) {
                connection = net.createConnection({ host: this.host, port: this.port })
            }
            connection.write(this.toString());

            connection.on('data', (data) => {
                resolve(data.toString());
                connection.end();
            });
            connection.on('end', () => {
                console.log('disconnected from server');
            });
            connection.on('error', (e) => {
                reject(new Error(e))
                connection.end();
                throw new Error(e)
            });
        })



    }
    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r\nHost: ${this.host}:${this.port}\r\n${Object.keys(this.headers).map(key => {
            return `${key}: ${this.headers[key]}`
        }).join('\r\n')}\r\n\r\n${this.bodyText}`
    }
}

class Response {
    responseParse(response) {
        
        this.WAITSTATE = 1
    }
}
/**
 * 
HTTP/1.1 200 OK
Content-Type: text/plain
X-Foo: bar
Date: Tue, 19 May 2020 09:30:24 GMT
Connection: keep-alive
Transfer-Encoding: chunked

2
ok
0
 *
**/
class ResponseParser {
    constructor() {

    
    }
}
const requset = new Request({
    method: 'GET',
    host: '127.0.0.1',
    path: '/',
    body: { a: 'b' },
    headers: {
        'token': '123123'
    },
    port: 8088
})
void async function () {
 const data = await requset.send()
 console.log(data)
}()
