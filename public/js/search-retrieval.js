//results DOM object
const DOMresults = document.querySelector('#results ul')
let months = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
];
//original object array returned by hoodie
let resultsArray = []

renderItems()
//search & sort

document.querySelector(".filter-dropdown").addEventListener("click", function () {
	document.querySelector(".search-container").classList.toggle("show")
})

document.addEventListener('input', function () {narrowSelection()})

function narrowSelection() {
	let filteredResults = []
	resultsArray.forEach(entry => {
		let year = document.getElementById("year-select").options[document.getElementById("year-select").selectedIndex].value
		let month = document.getElementById("month-select").options[document.getElementById("month-select").selectedIndex].value
		let day = document.getElementById("day-select").options[document.getElementById("day-select").selectedIndex].value
		let emojis = document.querySelectorAll('.mood-board ul li input')
		let tag = document.getElementById("tag-select").options[document.getElementById("tag-select").selectedIndex].value
		let selectedEmoji = ''
		emojis.forEach(emoji => {
			if (emoji.checked)
				selectedEmoji = emoji.value
		})
		if ((entry.year == year || year == '')
			&& (entry.month == month || month == '')
			&& (entry.day == day || day == '')
			&& (entry.selectedEmoji == selectedEmoji || selectedEmoji == '')
			&& ((entry.tags && entry.tags.includes(tag)) || tag == ''))
			filteredResults.push(entry)
	})
	document.querySelector(".clear").style.display = 'block'
	renderResults(filteredResults)
}

function clearResults() {
	mood_board_switch.innerHTML = "mood"
	mood_board_switch.classList.remove('selected')
	document.querySelectorAll('.mood-board ul li input').forEach(emoji => {
		emoji.checked = false
	})
	document.querySelectorAll('select').forEach(select => {
		select.options[0].selected = true
	})
	renderResults(resultsArray)
}
function renderItems() {
	hoodie.store.findAll().then(list => {
		resultsArray = [...list]
		renderResults(resultsArray)
		sessionStorage.setItem('avg', getAvgEntryLength(resultsArray))
		generateSearchConstraints(resultsArray)
	})
	document.querySelector(".clear").addEventListener("click", function() {
		clearResults()
		this.style.display = 'none'
	})
}
function sortEntries(el) {
	let fragment = document.createDocumentFragment();

	let sorted = el.sort(function (a, b) {
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
	let tags = []
	document.querySelector("#year-select").innerHTML = '<option value="">year</option>'


	entries.forEach(entry => {
		if (!years.includes(entry.year)) {
			years.push(entry.year)
			const year_option = document.createElement("option")

			year_option.setAttribute('value', entry.year)
			year_option.innerHTML = entry.year

			document.querySelector("#year-select").appendChild(year_option)
		}
		if (entry.tags) {
			entry.tags.forEach(tag => {
				if (!tags.includes(tag)) {
					tags.push(tag)
					const tag_option = document.createElement("option")

					tag_option.setAttribute('value', tag)
					if (tag.length > 10)
						tag_option.innerHTML = tag.substr(0, 23) + '...'
					else
						tag_option.innerHTML = tag

					document.querySelector("#tag-select").appendChild(tag_option)
				}
			})
		}
	})
}
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

		let tagListFragment = ''
		if (entry.tags) {
			entry.tags.forEach(tag => {
				tagListFragment +=
					"<li class='tag'><span class='tag-text' tabindex='-1'>#" +
					tag +
					"</span><input class='tag-value' type='hidden' value='" +
					tag +
					"'></li>"
			})
		}

		const item = document.createElement("li")
		item.setAttribute('data-id', entry._id)
		item.setAttribute('data-date', entry.year + "-" + entry.month + "-" + entry.day)
		item.innerHTML = '<img src=\"./assets/img/' + entry.selectedEmoji + '.png\"> ' + '<div class=\'search-entry-info\'>' + "<h3>" + months[entry.month - 1] + ' ' + entry.day + ', ' + entry.year + '<a class="edit">edit</a><a class="delete">delete</a></h3>' + "<p class=\"entry\">" + entry.entry + "</p>" + tagListFragment + "</div>"
		item.classList.add("listEntry")

		let tagList = item.querySelectorAll('.tag')
		for(var i = 0; i < tagList.length; i++) {
			tagList[i].addEventListener('click', function (e) {
				e.preventDefault()
				narrowSelection()
			})
		}
		//for sorting after
		resultNodes.push(item)
	})
	resultNodes = sortEntries(resultNodes)
	//adding event listeners for entry retrieval
	for (var i = resultNodes.length - 1; i >= 0; i--) {
		resultNodes[i].addEventListener("click", function (event) {
			if (event.target.classList.contains('tag-text')) {
				clearResults()
				let tag_select = document.querySelector('#tag-select')
				tag_select.querySelector("option[value='" + event.target.nextElementSibling.value + "']").selected = true
				narrowSelection()
				return
			}
			sessionStorage.setItem('_id', this.getAttribute("data-id"))
			if (event.target.innerHTML == 'delete') {
				event.target.innerHTML = 'confirm deletion'
			} else if (event.target.innerHTML == 'confirm deletion') {
				hoodie.store.remove(sessionStorage.getItem('_id')).then(function () {
					sessionStorage.removeItem("_id")
					renderItems()
				})
			} else if (event.target.innerHTML == 'edit') {
				sessionStorage.setItem('edit-mode', true)
				window.location.replace("/")
			} else {
				window.location.replace("/")
			}
		})
		DOMresults.appendChild(resultNodes[i])
	}
	if (DOMresults.innerHTML == '')
		DOMresults.innerHTML = '<div id="no-results"><img src="/assets/img/sad-scrap.png"><p>no results</p></div>'
}

