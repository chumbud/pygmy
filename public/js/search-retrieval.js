//results DOM object
const DOMresults = document.querySelector('#results ul')
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
	document.querySelector(".clear").addEventListener("click", function() {
		mood_board_switch.innerHTML = "add icon"
    mood_board_switch.classList.remove('selected')
		document.querySelectorAll('.mood-board ul li input').forEach(emoji => {
			emoji.checked = false
		})
		document.querySelectorAll('select').forEach(select => {
			select.options[0].selected = true
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
  document.querySelector("#year-select").innerHTML = '<option value=""></option>'

  
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
	for (i = 0; i <= ar.length - 1 || i == 30; i++) {
		avg += ar[i].length
	}
	avg = avg / (i + 1)
	return avg
}

function renderResults(a) {
	let resultNodes = []
	DOMresults.innerHTML = ''

	a.forEach(entry => {
		const item = document.createElement("li")
		item.setAttribute('data-id', entry._id)
		item.setAttribute('data-date', entry.year + "-" + entry.month + "-" + entry.day)
		item.innerHTML = '<img src=\"./assets/img/' + entry.selectedEmoji + '.png\"> ' + '<div class=\'search-entry-info\'>' + "<h3>" + months[entry.month-1] + ' ' + entry.day + ' ' + entry.year + '<a class="edit">edit</a><a class="delete">delete</a></h3>' + "<p class=\"entry\">" + entry.entry +"</p></div>"
		item.classList.add("listEntry")
			//for sorting after
			resultNodes.push(item)
		})
	resultNodes = sortEntries(resultNodes)
	//adding event listeners for entry retrieval
	for (var i = resultNodes.length - 1; i >= 0; i--) {
		resultNodes[i].addEventListener("click", function (event) {
			sessionStorage.setItem('_id', this.getAttribute("data-id"))
			if(event.target.classList.contains('delete')) {
        
				hoodie.store.remove(sessionStorage.getItem('_id')).then(function() {
					sessionStorage.removeItem("_id")
					renderItems()
				})
			} else if(event.target.classList.contains('edit')) {
				sessionStorage.setItem('edit-mode', true)
				window.location.replace("/")
			} else {
				window.location.replace("/")
			}
		})
		DOMresults.appendChild(resultNodes[i])
	}
	if(DOMresults.innerHTML == '')
		DOMresults.innerHTML = 'no results :('
}
