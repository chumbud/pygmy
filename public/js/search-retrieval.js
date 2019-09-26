const results = document.querySelector('#results ul')
renderItems()
function renderItems () {
	hoodie.store.findAll().then(list => {
		
		list.forEach(entry => {
			const item = document.createElement("li")
			item.innerHTML = '<img src=\"./assets/img/' + entry.selectedEmoji + '.png\"> ' + "<h3>" + entry.date + '</h3>' + "<p>" + entry.entry +"</p>"
			item.classList.add("listEntry")
			results.appendChild(item)
		})
	})
}