const results = document.querySelector('#results ul')
const months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
const unsorted = []

renderItems()
function renderItems () {
	hoodie.store.findAll().then(list => {
		list.forEach(entry => {
			const item = document.createElement("li")
			item.setAttribute('data-id', entry._id)
			item.setAttribute('data-date', entry.hoodie.createdAt)
			item.innerHTML = '<img src=\"./assets/img/' + entry.selectedEmoji + '.png\"> ' + '<div class=\'search-entry-info\'>' + "<h3>" + months[entry.month-1] + ' ' + entry.day + ' ' + entry.year + '</h3>' + "<p class=\"entry\">" + entry.entry +"</p></div>"
			item.classList.add("listEntry")
			//for sorting after
			unsorted.push(item)
		})
		let sortedResults = sortEntries(unsorted)

		//adding event listeners for entry retrieval
		for (var i = sortedResults.length - 1; i >= 0; i--) {
			sortedResults[i].addEventListener("click", function () {
				sessionStorage.setItem('_id', this.getAttribute("data-id"))
				window.location.replace("/")
			})
			results.appendChild(sortedResults[i])
		}
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

