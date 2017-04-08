function display(aString) {
    var element = document.createElement("p")
	var textNode = document.createTextNode(aString)
	element.appendChild(textNode)
	element.style.color = "blue"
    element.style.fontFamily="Comic Sans MS"
    element.innerHTML = aString
	document.body.appendChild(element)
}

module.exports = {display}

