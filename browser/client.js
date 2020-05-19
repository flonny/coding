const net = require("net");

class Request {
  constructor({ host, port, method, headers, path, body }) {
    this.host = host || "127.0.0.1";
    this.port = port || 80;
    this.method = method || "GET";
    this.headers = headers || {};
    this.path = path || "/";
    this.body = body || {};
    this.bodyText = "";
    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www-form-urlencode";
    }
    if (this.headers["Content-Type"] === "application/x-www-form-urlencode") {
      this.bodyText = Object.keys(this.body)
        .map((key) => `${key}=${this.body[key]}`)
        .join("&");
    }
    if (this.headers["Content-Type"] === "application/json") {
      this.bodyText = JSON.stringify(body);
    }
    this.headers["Content-Length"] = this.bodyText.length;
  }
  send(connection) {
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser();
      if (!connection) {
        connection = net.createConnection({ host: this.host, port: this.port });
      }
      connection.write(this.toString());

      connection.on("data", (data) => {
        parser.receive(data.toString());
        if (parser.isFinished) {
          resolve(parser.response);
        }
        // resolve(data.toString());
        connection.end();
      });
      connection.on("end", () => {
        console.log("disconnected from server");
      });
      connection.on("error", (e) => {
        reject(new Error(e));
        connection.end();
        throw new Error(e);
      });
    });
  }
  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r\nHost: ${this.host}:${
      this.port
    }\r\n${Object.keys(this.headers)
      .map((key) => {
        return `${key}: ${this.headers[key]}`;
      })
      .join("\r\n")}\r\n\r\n${this.bodyText}`;
  }
}

class Response {
  responseParse(response) {
    this.WAITSTATE = 1;
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
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_SPACE = 3;
    this.WAITING_HEADER_VALUE = 4;
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_BLOCK_END = 6;
    this.WAITING_BODY = 7;
    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = "";
    this.headers = {};
    this.headerName = "";
    this.headerValue = "";
    this.bodyParser = null;
  }
  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished;
  }
  get response() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      // statusLine: this.statusLine,
      headers: this.headers,
      body: this.bodyParser.content.join(''),
    };
  }
  receive(string) {
    for (const c of string) {
      this.receiveChar(c);
    }
  }
  receiveChar(c) {
    if (this.current === this.WAITING_STATUS_LINE) {
      if (c === "\r") {
        this.current = this.WAITING_STATUS_LINE_END;
      } else {
        this.statusLine += c;
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      if (c === "\n") {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_NAME) {
      if (c === "\r") {
        this.current = this.WAITING_HEADER_BLOCK_END;
      } else if (c === ":") {
        this.current = this.WAITING_HEADER_SPACE;
      } else {
        this.headerName += c;
      }
    } else if (this.current === this.WAITING_HEADER_SPACE) {
      if (c === " ") {
        this.current = this.WAITING_HEADER_VALUE;
      }
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      if (c === "\r") {
        this.current = this.WAITING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerValue;
        this.headerName = "";
        this.headerValue = "";
      } else {
        this.headerValue += c;
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (c === "\n") {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      if (c === "\n") {
        if (this.headers["Transfer-Encoding"] === "chunked") {
          this.bodyParser = new TrunkedBodyParser();
        }
        this.current = this.WAITING_BODY;
      }
    } else if (this.WAITING_BODY === this.current) {
      this.bodyParser.receiveChar(c);
    }
  }
}
class TrunkedBodyParser {
  constructor() {
    this.WAITING_LEAGTH = 0;
    this.WAITING_LENGTH_LINE_END = 1;
    this.READING_TRUNK = 2;
    this.READING_TRUNK_LINE_END = 3;
    this.isFinished = false;
    this.length = 0;
    this.content = [];
    this.current = this.WAITING_LEAGTH;
  }
  receiveChar(c) {
    if (this.current === this.WAITING_LEAGTH) {
      if (c === "\r") {
        if (this.length === 0) {
          this.isFinished = true;
        } else {
          this.current = this.WAITING_LENGTH_LINE_END;
        }
      } else {
        this.length *= 10;
        this.length += c.charCodeAt(0) - "0".charCodeAt(0);
      }
    } else if (this.current === this.WAITING_LENGTH_LINE_END) {
      if (c === "\n") {
        this.current = this.READING_TRUNK;
      }
    } else if (this.current === this.READING_TRUNK) {
      this.content.push(c);
      this.length--;
      if (this.length === 0) {
        this.current = this.READING_TRUNK_LINE_END;
      }
    } else if (this.current === this.READING_TRUNK_LINE_END) {
      if (c === "\n") {
        this.current = this.WAITING_LEAGTH;
      }
    }
  }
}
const requset = new Request({
  method: "GET",
  host: "127.0.0.1",
  path: "/",
  body: { a: "b" },
  headers: {
    token: "123123",
  },
  port: 8088,
});
void (async function () {
  const data = await requset.send();
  console.log(data);
})();
