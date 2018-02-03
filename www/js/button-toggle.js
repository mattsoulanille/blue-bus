//General info on queryselector found here: https://www.w3schools.com/jsref/met_document_queryselector.asp
//syntax for jquery found here: https://www.w3schools.com/jquery/
//onclick using javascript found here: https://www.w3schools.com/jsref/event_onclick.asp

function toHaverfordView(){
	$("#haverford-clock").setAttribute('style', 'display:none;');
	$("#brynmawr-clock").setAttribute('style', 'display:block;');
}

function toHaverfordView(){
	$("#brynmawr-clock").setAttribute('style', 'display:none;');
	$("#haverford-clock").setAttribute('style', 'display:block;');
}

function changeText(){
	//chnanging text with jquery found here: http://api.jquery.com/html/
	$("#haverford-clock").text("Hello, world");
}

function changeText2(){
	document.getElementByID("haverford-clock").innerHTML = "Hello, world";
}

$(document).ready(function(){
//	$("#HaverfordButton").click(function(){changeText()});
	$("#HaverfordButton").click(function(){
		changeText();
	});

});