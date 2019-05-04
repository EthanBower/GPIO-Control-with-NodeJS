const blueDivContainer = document.getElementsByClassName("GPIO_rect_blue"),
	redDivContainer = document.getElementsByClassName("GPIO_rect_red"),
	greenDivContainer = document.getElementsByClassName("GPIO_rect_green");

function largestDivLength() { //This function will find the largest div height of each GPIO element, and return it.
	var divContainerLength = 0;
	
	for (var i = 0; i < blueDivContainer.length; i++) { //Look at the length of each blue container. Get the largest value
		if (blueDivContainer[i].offsetHeight > divContainerLength) {
			divContainerLength = blueDivContainer[i].offsetHeight;
		}
	}
	
	for (var i = 0; i < redDivContainer.length; i++) { //Look at the length of each red container. Get the largest value
		if (redDivContainer[i].offsetHeight > divContainerLength) {
			divContainerLength = redDivContainer[i].offsetHeight;
		}
	}
	
	for (var i = 0; i < greenDivContainer.length; i++) { //Look at the length of each green container. Get the largest value
		if (greenDivContainer[i].offsetHeight > divContainerLength) {
			divContainerLength = greenDivContainer[i].offsetHeight;
		}
	}
	
	return divContainerLength;
}

function setDivLength(length) { //This will take in a length value and set every GPIO div to that length
	for (var i = 0; i < blueDivContainer.length; i++) { //Set the length of each blue class element
		blueDivContainer[i].style.height = length + "px";
	}
	
	for (var i = 0; i < redDivContainer.length; i++) { //Set the length of each red class element
		redDivContainer[i].style.height = length + "px";
	}
	
	for (var i = 0; i < greenDivContainer.length; i++) { //Set the length of each green class element
		greenDivContainer[i].style.height = length + "px";
	}
}

function scale() {
	var longestHeight;
	
	setDivLength(largestDivLength());

		
}
