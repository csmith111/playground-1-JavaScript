function display(aString) {
    var element = document.createElement("p")
	var textNode = document.createTextNode(aString)
	element.appendChild(textNode)
	element.style.color = "blue"
    element.style.fontFamily="Comic Sans MS"
    element.innerHTML = aString
	document.body.appendChild(element)
}

function sum(x, y){
    return x+y
}

module.exports = {display, sum}

