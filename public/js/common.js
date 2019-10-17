//sets calendar icon position and day
let i = new Date()
document.querySelector(".icon-date").innerHTML = i.getDate()
if(i.getDate() >= 10)
document.querySelector(".icon-date").setAttribute("transform", "translate(5.25 19.5)")
else
document.querySelector(".icon-date").setAttribute("transform", "translate(8.5 19.5)")


const handleError = function(error) {
	console.log(error)
}

function showSignedIn (username) {
	username = username.split('@')[0]
	document.body.setAttribute('data-account-state', 'signed-in')
	document.querySelector('[data-value=username]').textContent = username
}

function hideSignedIn () {
	document.body.setAttribute('data-account-state', 'signed-out')
}

hoodie.account.on('signin', function (account) {
	showSignedIn(account.username)
})

hoodie.account.on('signout', hideSignedIn)
hoodie.account.get(['session', 'username'], {local: true})
.then(function (properties) {
	if (properties.session) {
		showSignedIn(properties.username)
	} else {
		hideSignedIn()
	}
}).catch(handleError)