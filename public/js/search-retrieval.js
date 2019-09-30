const results = document.querySelector('#results ul')
const months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
const unsorted = []
let sortedResults = []
let arrayList = []

renderItems()
function renderItems () {
	hoodie.store.findAll().then(list => {
		list.forEach(entry => {
			const item = document.createElement("li")
			item.setAttribute('data-id', entry._id)
			item.setAttribute('data-date', entry.hoodie.createdAt)
			item.innerHTML = '<img src=\"./assets/img/' + entry.selectedEmoji + '.png\"> ' + '<div class=\'search-entry-info\'>' + "<h3>" + months[entry.month-1] + ' ' + entry.day + ' ' + entry.year + '</h3>' + "<p class=\"entry\">" + entry.entry +"</p></div>"
			item.classList.add("listEntry")
			console.log(item)
			//for sorting after
			unsorted.push(item)
		})
		sortedResults = [...sortEntries(unsorted)]

		//adding event listeners for entry retrieval
		for (var i = sortedResults.length - 1; i >= 0; i--) {
			sortedResults[i].addEventListener("click", function () {
				sessionStorage.setItem('_id', this.getAttribute("data-id"))
				window.location.replace("/")
			})
			results.appendChild(sortedResults[i])
		}
		arrayList = [...list]

		console.log(list)
		generateSearchConstraints(list)
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

document.addEventListener('input', function(event) {
	console.log(event.target.value)
	let newResults = []
	let unsortedRefresh = []
	let finalResults = []

	results.innerHTML = ''
	arrayList.forEach(entry => {
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
		if((entry.year == year || year == '') &&
			(entry.month == month || month == '') &&
			(entry.day == day || day == '') &&
			(entry.selectedEmoji == selectedEmoji || selectedEmoji == ''))
			newResults.push(entry)
		})

			console.log(newResults)
		newResults.forEach(entry => {
			const item = document.createElement("li")
			item.setAttribute('data-id', entry._id)
			item.setAttribute('data-date', entry.hoodie.createdAt)
			item.innerHTML = '<img src=\"./assets/img/' + entry.selectedEmoji + '.png\"> ' + '<div class=\'search-entry-info\'>' + "<h3>" + months[entry.month-1] + ' ' + entry.day + ' ' + entry.year + '</h3>' + "<p class=\"entry\">" + entry.entry +"</p></div>"
			item.classList.add("listEntry")
			//for sorting after
			unsortedRefresh.push(item)
		})

		newResults = sortEntries(unsortedRefresh)
	//adding event listeners for entry retrieval
	for (var i = newResults.length - 1; i >= 0; i--) {
		newResults[i].addEventListener("click", function () {
			sessionStorage.setItem('_id', this.getAttribute("data-id"))
			window.location.replace("/")
		})
		results.appendChild(newResults[i])
	}
	if(results.innerHTML == '')
		results.innerHTML = 'no results :('
})
