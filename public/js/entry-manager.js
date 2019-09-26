//sets the time for the current entry
const date = document.getElementById('date')
const months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
const realDate = new Date()
const setDate = function() {
  date.innerHTML = months[(realDate.getMonth())] + " " + realDate.getDate() + " " + realDate.getFullYear()
}
setDate();

const form = document.querySelector('form')
const textarea = form.querySelector('textarea')

form.addEventListener("submit", (event) => {
	event.preventDefault()
	let selectedEmoji
	let emojis = form.querySelectorAll('input')
	emojis.forEach(emoji => {
		if(emoji.checked) {
			selectedEmoji = emoji.value
		}
	})

	let entry = textarea.value
	let length = textarea.value.length
	let month = realDate.getMonth()+1
	let day = realDate.getDate()
	let year = realDate.getFullYear()

	if(!entry) return
	hoodie.store.add({selectedEmoji, entry, length, month, day, year})
	console.log(hoodie.store.findAll())
})