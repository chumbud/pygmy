//turns on dark mode
document.querySelector('[mode=dark-mode]').addEventListener('click', function (event) {
	event.preventDefault();
	setCookie("display-mode", "dark-mode");
	document.querySelector("html").id = "dark-mode-enabled";
	document.querySelectorAll('[mode]').forEach(item => {
		item.classList.remove('selected');
	});
	this.classList.toggle("selected");
});
//turns on light mode
document.querySelector('[mode=light-mode]').addEventListener('click', function (event) {
	event.preventDefault();
	setCookie("display-mode", "light-mode");
	document.querySelector("html").id = "";
	document.querySelectorAll('[mode]').forEach(item => {
		item.classList.remove('selected');
	});
	this.classList.toggle("selected");
});
//turns on 100% mode
document.querySelector('[text-size="10"]').addEventListener('click', function (event) {
	event.preventDefault();
	setCookie("text-size", "10px");
	document.querySelector(":root").style.fontSize = "10px";
	document.querySelectorAll('[text-size]').forEach(item => {
		item.classList.remove('selected');
	});
	this.classList.toggle("selected");
});
//turns on 125% mode
document.querySelector('[text-size="12.5"]').addEventListener('click', function (event) {
	event.preventDefault();
	setCookie("text-size", "12.5px");
	document.querySelector(":root").style.fontSize = "12.5px";
	document.querySelectorAll('[text-size]').forEach(item => {
		item.classList.remove('selected');
	});
	this.classList.toggle("selected");
});
//turns on 150% mode
document.querySelector('[text-size="15"]').addEventListener('click', function (event) {
	event.preventDefault();
	setCookie("text-size", "15px");
	document.querySelector(":root").style.fontSize = "15px";
	document.querySelectorAll('[text-size]').forEach(item => {
		item.classList.remove('selected');
	});
	this.classList.toggle("selected");
});
document.querySelector("#background-select").addEventListener("click", function (event) {
	event.preventDefault();
	var selectedBackground = event.target.getAttribute("mode");
	if (selectedBackground) {
		setCookie("background", selectedBackground);
		console.log(selectedBackground);
		document.querySelector('html').className = '';
		document.querySelector('html').classList.add(selectedBackground);
		document.querySelectorAll('#background-select a').forEach(i => {
			i.classList.remove("selected");
		});
		event.target.classList.toggle("selected");
	}
});
