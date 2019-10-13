
let calendar = document.querySelector(".calendar-container .days")
let header = document.querySelector(".calendar-container .month-year")
let months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
]

let y = new Date().getFullYear()
let m = new Date().getMonth()

function populateCalendar(year, month) {
  let firstDay = new Date(year, month).getDay()
  let lastDay = 32 - new Date(year, month, 32).getDate()
  calendar.innerHTML = ''
  header.innerHTML = (months[month]) + ' ' +  year

  if (firstDay != 0) {
    for (var j = 0; j < firstDay; j++) {
      let emptyDay = document.createElement("li")
      emptyDay.classList.add("empty")
      calendar.appendChild(emptyDay)
    }
  }

  for (var i = 1; i < lastDay; i++) {
    let newDay = document.createElement("li")
    newDay.innerHTML = "<a href=\"/\">" + i + "</a>"

    let today = new Date()
    today.setHours(0,0,0,0)
    let currentDate = new Date(year + "-" + (month+1) + "-" + (i+1))
    currentDate.setHours(0,0,0,0)

    if(currentDate <= today) {
      newDay.setAttribute("data-date", year + "-" + (month+1) + "-" + i)
      newDay.addEventListener("click", function(event) {
        event.preventDefault()
        sessionStorage.setItem("date", this.getAttribute("data-date"))
        window.location.replace("/")
      })
      if(currentDate.getFullYear() === today.getFullYear() 
        && currentDate.getMonth() === today.getMonth() 
        && currentDate.getDate() == today.getDate()) {
        newDay.classList.add("today")
      }
    } else {
      newDay.classList.add("disabled")
    }
    calendar.appendChild(newDay)
  }

  
}
populateCalendar(y, m)

if(sessionStorage.getItem('_id') == null) {
 document.querySelector(".message").innerHTML = "<img src=\"./assets/img/shining-star.png\"><p>today's a new day!</p><a class=\"button\" href=\"/\">write a new entry</a>"
} else {
  document.querySelector(".message").innerHTML = "<p>good job!</p><p>you're all good for today</p><a class=\"button\" href=\"/\">edit today's entry</a>"
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
