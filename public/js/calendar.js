
let calendar = document.querySelector(".calendar-container .days")
let header = document.querySelector(".calendar-container .month-year")
let months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
]

let y = new Date().getFullYear()
let m = new Date().getMonth()
let calResults = []
hoodie.store.findAll().then(list => {
	calResults = [...list]
}).then(function() {
	populateCalendar(y, m)
})

function populateCalendar(year, month) {
	let firstDay = new Date(year, month).getDay()
	let lastDay = 32 - new Date(year, month, 32).getDate()
	calendar.innerHTML = ''
	header.innerHTML = (months[month]) + ' ' +  year

  //places empty list elements to position the first day
  if (firstDay != 0) {
  	for (var j = 0; j < firstDay; j++) {
  		let emptyDay = document.createElement("li")
  		emptyDay.classList.add("empty")
  		calendar.appendChild(emptyDay)
  	}
  }

  //creates days and compares them to the array of existing entries to mark them as completed with accompanied id and date 
  for (var i = 1; i < lastDay; i++) {
  	let newDay = document.createElement("li")
  	newDay.innerHTML = "<a href=\"/\">" + i + "</a>"

  	let today = new Date()
  	today.setHours(0,0,0,0)
  	let currentDate = new Date(year + "/" + (month+1) + "/" + i)
  	currentDate.setHours(0,0,0,0)
  	
  	if(currentDate <= today) {
  		newDay.setAttribute("data-date", year + "/" + (month+1) + "/" + i)
  		newDay.addEventListener("click", function(event) {
  			event.preventDefault()
  			sessionStorage.setItem("date", this.getAttribute("data-date"))
  			if(this.getAttribute("_id") != null) {
  				sessionStorage.setItem("_id", this.getAttribute("_id"))
  			}
  			window.location.replace("/")
  		})
  		for (var j = calResults.length - 1; j >= 0; j--) {
  			if(calResults[j].year == currentDate.getFullYear() && (calResults[j].month-1) == currentDate.getMonth() && calResults[j].day == currentDate.getDate()) {
  				newDay.classList.add("completed")
  				newDay.setAttribute("_id", calResults[j]._id)
  				break
  			}
  		}
  		if(currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() === today.getMonth() && currentDate.getDate() == today.getDate()) {
  			newDay.classList.add("today")
  		}
	  //disables all future days
	} else {
		newDay.classList.add("disabled")
	}
	calendar.appendChild(newDay)
}
}

if(document.cookie.split(';').filter((item) => item.trim().startsWith('todayId=')).length) {
	document.querySelector(".message").innerHTML = "<p>good job!</p><p>you're all good for today</p><a class=\"button\" href=\"/\">edit today's entry</a>"
	
  //sets the sessionstorage date as today for reference to check to see if the clicked cal date is today to retieve actually today's entry. this is done so "edit today's entry" and "latest entry" work without much change needed
  let realDate = new Date()
  let today = realDate.getFullYear() + "/" + (realDate.getMonth()+1) + "/" + realDate.getDate()
  sessionStorage.setItem("date", today)
} else {
	document.querySelector(".message").innerHTML = "<img src=\"./assets/img/shining-star.png\"><p>today's a new day!</p><a class=\"button\" href=\"/\">write a new entry</a>"
}

document.querySelector(".prev-month").addEventListener("click", function(e) {
	e.preventDefault()
	m==1 ? (y--, m=11) : m--
	populateCalendar(y, m)  
})
document.querySelector(".next-month").addEventListener("click", function(e) {
	e.preventDefault()
	m==11 ? (y++, m=0) : m++
	populateCalendar(y, m)  
})
