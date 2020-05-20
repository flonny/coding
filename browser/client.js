
const Request = require('./Request')
const parse = require('./parse')

class Response {
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
    const response = await requset.send();
    let dom = parse.parseHTML(response.body)
})();
