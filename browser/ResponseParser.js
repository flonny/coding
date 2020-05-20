
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
const TrunkedBodyParser = require('./TrunkedBodyParser')
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
  module.exports = ResponseParser