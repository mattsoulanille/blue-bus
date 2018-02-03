//General info on queryselector found here: https://www.w3schools.com/jsref/met_document_queryselector.asp
//syntax for jquery found here: https://www.w3schools.com/jquery/
//onclick using javascript found here: https://www.w3schools.com/jsref/event_onclick.asp

function toHaverfordView(){
	document.getElementByID("haverford-clock").setAttribute('style', 'display:none;');
	document.getElementByID("brynmawr-clock").setAttribute('style', 'display:block;');
}

function toBrynMawrView(){
	document.getElementByID("brynmawr-clock").setAttribute('style', 'display:none;');
	document.getElementByID("haverford-clock").setAttribute('style', 'display:block;');
}

function changeText(){
	document.getElementByID("haverford-clock").innerHTML = "Hello, world";
}

function changeText2(){
	document.getElementByID("haverford-clock").innerHTML = "Hello, world";
}

document.getElementByID("HaverfordButton").addEventListener("click", changeText);
document.getElementByID("BrynMawrButton").addEventListener("click", changeText2);