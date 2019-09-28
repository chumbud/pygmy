const results = document.querySelector('#results ul')
renderItems()
function renderItems () {
	hoodie.store.findAll().then(list => {
		list.forEach(entry => {
			const item = document.createElement("li")
			//item.setAttribute('data-id', entry._id)
			item.innerHTML = '<img src=\"./assets/img/' + entry.selectedEmoji + '.png\"> ' + '<div class=\'search-entry-info\'>' + "<h3>" + entry.date + '</h3>' + "<p class=\"entry\">" + entry.entry +"</p></div>"
			item.classList.add("listEntry")
			item.addEventListener("click", function() {
				sessionStorage.setItem('_id', entry._id)
				window.location.replace("/")
			})
			results.appendChild(item)
		})
	})
}