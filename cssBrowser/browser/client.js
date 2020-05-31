
const Request = require('./Request')
const parse = require('./parse')
const images = require("images");
const render  = require('./render')
class Response {
}



void async function () {
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
    const response = await requset.send();
    let dom = parse.parseHTML(response.body);
    let viewport = images(800, 600);
	render(viewport, dom);
	viewport.save("viewport.jpg")
    // console.log(JSON.stringify(dom,null,"   "))
}()
