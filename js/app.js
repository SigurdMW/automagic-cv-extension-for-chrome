if(document.body.classList.contains("cv-automagic")){
	turnOffAutoMagic();
} else {
	turnOnAutoMagic();
}

function isHidden(el) {
  var style = window.getComputedStyle(el);
	return (style.display === 'none')
}

function turnOnAutoMagic(){
	var inputs = document.querySelectorAll('input[type="text"], textarea');

	for (var i = 0; i < inputs.length; i++){
		var el = inputs[i];
		if(!isHidden(el)){
			prepareInput(el, i+1);
		}
	}

	function prepareInput(element, id){
		element.setAttribute('data-cv-element-id',id);
		elementPos = element.getBoundingClientRect();

		/*
		check if element is visible
		function isHidden(el) {
    	var style = window.getComputedStyle(el);
    	return (style.display === 'none')
		}
		*/

	  var right = elementPos.right,
	      top = elementPos.top + window.scrollY;
	  var ui = document.createElement("div");
	  ui.style.position = "absolute";
	  ui.style.top = top + "px";
	  ui.style.left = right + "px";
	  var imgURL = chrome.extension.getURL("img/magic-wand.svg");
	  var button = '<button class="cv-automagic-toggle" style="background-image:url('+imgURL+');"><span class="cv-automagic-sr-only">Fyll automagisk</span></button>';
	  ui.innerHTML = button;
	  var dropDownList = '<ul class="cv-automagic-drop-down"><li class="cv-automagic-drop-down__item"><a href="javascript:void(0);" data-cv-text="testing testing 1">Om meg</a></li><li class="cv-automagic-drop-down__item"><a href="javascript:void(0);" data-cv-text="testing testing 2">Erfaring</a></li><li class="cv-automagic-drop-down__item"><a href="javascript:void(0);" data-cv-text="testing testing 3">Utdanning</a></li></ul>';
	  ui.innerHTML += dropDownList;
	  ui.classList.add("cv-automagic-ui-selector");
	  ui.setAttribute('data-cv-element-id', id);
	  document.body.appendChild(ui);
	}
	document.body.classList.add("cv-automagic");
}

function turnOffAutoMagic(){
	var inputs = document.querySelectorAll('input, textarea');

	for (var i = 0; i < inputs.length; i++){
		unprepareInput(inputs[i], i+1);
	}

	function unprepareInput (element, i) {
		if(element.getAttribute('data-cv-element-id') === i){
			element.removeAttribute('data-cv-element-id');
			//document.querySelector(".cv-automagic-ui-selector");
		}
	}
	document.body.classList.remove("cv-automagic");
}

function findAncestor (el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el;
}

var buttons = document.querySelectorAll('.cv-automagic-toggle');

for (var i = 0; i < buttons.length; i++){
	buttons[i].addEventListener("click", function(){
		this.parentNode.classList.toggle("cv-automagic-toggle--open");
	});
}

var menuItems = document.querySelectorAll('.cv-automagic-drop-down__item a');

for (var i = 0; i < menuItems.length; i++){
	menuItems[i].addEventListener("click", findElementAndSetValue);
}

function findElementAndSetValue () {
	var parent = findAncestor(this, "cv-automagic-ui-selector"),
			parentEID = parent.getAttribute("data-cv-element-id");

	var inputs = document.querySelectorAll('input[type="text"], textarea');
	for (var e = 0; e < inputs.length; e++){
		var elVal = inputs[e].getAttribute("data-cv-element-id");

		if( elVal === parentEID ){
			inputs[e].value = this.getAttribute("data-cv-text");
			break; // stop the loop
		}
	}
}