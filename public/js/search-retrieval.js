//results DOM object
const results = document.querySelector('#results ul')
let months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
//original object array returned by hoodie
let resultsArray = []

renderItems()
function renderItems () {
	hoodie.store.findAll().then(list => {
		resultsArray = [...list]
		renderResults(resultsArray)
		sessionStorage.setItem('avg', getAvgEntryLength(resultsArray))
		generateSearchConstraints(resultsArray)
	})
	//TODO: Add way to show all entries
	document.querySelector(".clear").addEventListener("click", function() {
		mood_board_switch.innerHTML = "add icon"
		document.querySelectorAll('.mood-board ul li input').forEach(emoji => {
			emoji.checked = false
		})
		renderResults(resultsArray)
	})
}

function sortEntries(el) {
	let fragment = document.createDocumentFragment();

	let sorted = el.sort(function(a, b) {
		var dateA = new Date(a.getAttribute("data-date")), dateB = new Date(b.getAttribute("data-date"))
		return dateA - dateB
	})

	sorted.forEach(item => {
		fragment.appendChild(item.cloneNode(true))
	})
	return fragment.childNodes
}

function generateSearchConstraints(entries) {
	let years = []
	entries.forEach(entry => {
		if(!years.includes(entry.year)) {
			years.push(entry.year)
			const option = document.createElement("option")
			option.setAttribute('value', entry.year)
			option.innerHTML = entry.year
			document.querySelector("#year-select").appendChild(option)
		}
	})
}

//search & sort
document.addEventListener('input', function(event) {
	console.log(event.target.value)
	let filteredResults = []

	resultsArray.forEach(entry => {
		let year = document.getElementById("year-select").options[document.getElementById("year-select").selectedIndex].value
		let month = document.getElementById("month-select").options[document.getElementById("month-select").selectedIndex].value
		let day = document.getElementById("day-select").options[document.getElementById("day-select").selectedIndex].value
		let emojis = document.querySelectorAll('.mood-board ul li input')
		let selectedEmoji = ''
		emojis.forEach(emoji => {
			if(emoji.checked)
				selectedEmoji = emoji.value
		})
		console.log(selectedEmoji)
		if((entry.year == year || year == '') 
			&& (entry.month == month || month == '')
			&& (entry.day == day || day == '')
			&& (entry.selectedEmoji == selectedEmoji || selectedEmoji == ''))
			filteredResults.push(entry)
	})
	renderResults(filteredResults)
})

function getAvgEntryLength(ar) {
	let avg = 0
	let i
	for (i = 0; i <= ar.length - 1 || i == 15; i++) {
		avg += ar[i].length
	}
	avg = avg / (i + 1)
	return avg
}

function renderResults(a) {
	let resultNodes = []
	results.innerHTML = ''

	a.forEach(entry => {
		const item = document.createElement("li")
		item.setAttribute('data-id', entry._id)
		item.setAttribute('data-date', entry.hoodie.createdAt)
		item.innerHTML = '<img src=\"./assets/img/' + entry.selectedEmoji + '.png\"> ' + '<div class=\'search-entry-info\'>' + "<h3>" + months[entry.month-1] + ' ' + entry.day + ' ' + entry.year + '<a class="edit">edit</a><a class="delete">delete</a></h3>' + "<p class=\"entry\">" + entry.entry +"</p></div>"
		item.classList.add("listEntry")
			//for sorting after
			resultNodes.push(item)
		})
	resultNodes = sortEntries(resultNodes)
	//adding event listeners for entry retrieval
	for (var i = resultNodes.length - 1; i >= 0; i--) {
		resultNodes[i].addEventListener("click", function () {
			sessionStorage.setItem('_id', this.getAttribute("data-id"))
			window.location.replace("/")
		})
		resultNodes[i].querySelector(".edit").addEventListener("click", function() {
			sessionStorage.setItem('edit-mode', true)
		})
		results.appendChild(resultNodes[i])
	}
	if(results.innerHTML == '')
		results.innerHTML = 'no results :('
}
