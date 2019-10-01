//sets the time for the current entry
let form = document.querySelector('form')
const date = document.getElementById('date')
const months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
const realDate = new Date()
const textarea = document.querySelector('textarea')
const setDate = function() {
	date.innerHTML = months[(realDate.getMonth())] + " " + realDate.getDate() + " " + realDate.getFullYear()
}
setDate();
//if being redirected from search, checks for an entry id for editing and turns on expanded mode

let currentSession = null
if(sessionStorage.getItem('_id') != null) {
	hoodie.store.find(sessionStorage.getItem('_id')).then(response => {
		console.log(response)
		currentSession = response
		document.querySelector('textarea').value = response.entry
		document.querySelector('.mood-select').innerHTML = "<img src='assets/img/" + response.selectedEmoji + ".png'>"
		document.querySelector('h2').innerHTML = months[response.month-1] + ' ' + response.day + ' ' + response.year
		document.querySelector('.input-controls .length-tracker').innerHTML = response.length
		document.querySelector('input[value=' + response.selectedEmoji + ']').checked = true
	})
	document.querySelector('.expand').click()
	textarea.classList.toggle('focused')
	document.querySelector('.input-controls').classList.toggle('focused')
	document.querySelector('button').innerHTML = "save changes"


	if (sessionStorage.getItem("edit-mode") == null) {
		form.classList.add("read-only")
		document.querySelector('textarea').setAttribute("readonly", true)
		document.querySelector('#date').innerHTML += '<a class="edit">edit</a>'
		document.querySelector('h2 a.edit').addEventListener("click", function() {
			form.classList.toggle("read-only")
			if(this.innerHTML == "edit")
				this.innerHTML = "cancel"
			else
				this.innerHTML = "edit"
		})
	}

	sessionStorage.removeItem("edit-mode")
	sessionStorage.removeItem("_id")
}

form.addEventListener("submit", (event) => {
	event.preventDefault()

	let entry = textarea.value
	let length = textarea.value.length
	let month = realDate.getMonth()+1
	let day = realDate.getDate()
	let year = realDate.getFullYear()
	let selectedEmoji = ''
	let emojis = form.querySelectorAll('input')
	emojis.forEach(emoji => {
		if(emoji.checked)
			selectedEmoji = emoji.value
	})
	//new session
	if(currentSession == null) {
		entry = textarea.value
		length = textarea.value.length
		month = realDate.getMonth()+1
		day = realDate.getDate()
		year = realDate.getFullYear()

		if(selectedEmoji == '')
			selectedEmoji = "empty"
		if(!entry) return
			hoodie.store.add({selectedEmoji, entry, length, month, day, year})
	} else {
	//editing session
	entry = textarea.value
	length = textarea.value.length
	month = currentSession.month
	day = currentSession.day
	year = currentSession.year
	emojis.forEach(emoji => {
		if(emoji.checked)
			selectedEmoji = emoji.value
	})
	if(!entry) return
		hoodie.store.update(currentSession._id, {selectedEmoji, entry, length, month, day, year})		
}

window.location.replace("/search.html")
})


