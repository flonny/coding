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
          this.length *= 16;
          this.length += parseInt(c,16);
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
  module.exports = TrunkedBodyParser