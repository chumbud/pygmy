var now              = new Date()
var currentMonth     = now.getMonth()+1
var month            = now.getMonth()
var currentYear      = now.getFullYear()
var daysInMonthCount = new Date(currentYear, currentMonth, 0).getDate()
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
]
var currentMonthName = (monthNames[month])
var firstDayOfMonth = new Date(currentYear + "-" + currentMonth + '-01').getDay()

for (var i = 1; i <= daysInMonthCount; i++) {
	var daysCalendarBlock ='<button class="number"><time datetime="' + currentYear + '-' + currentMonth + '-' + i + '">' + i + '</time></button>'
	var daysOfCalendar = document.getElementsByClassName('days-of-the-month')[0]
	daysOfCalendar.insertAdjacentHTML('beforeend', daysCalendarBlock)
}
