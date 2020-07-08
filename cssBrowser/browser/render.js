// const images = require('images');

function render(viewport, element){
	if(element.style){
	console.log(element.style)
		if(element.style["background-color"]){
			console.log(element.style["background-color"])
		}
	}
	if(element.children){
		for(var child of element.children){
			render(viewport, child);
		}
	}
}

module.exports = render;