;[].forEach.call(document.querySelectorAll('[data-show]'), function (el) {
	el.addEventListener('click', function (event) {
		var action = event.target.dataset.action
		var $formsContainer = event.currentTarget

		if (!action) {
			return
		}

		event.preventDefault()
		var showTarget = action.substr('show-'.length)
		$formsContainer.setAttribute('data-show', showTarget)
	})
})

document.querySelector('form.signup').addEventListener('submit', function (event) {
	event.preventDefault()

	var email = this.querySelector('[name=email]').value
	var password = this.querySelector('[name=password]').value

	hoodie.account.signUp({
		username: email,
		password: password
	})

	.then(function () {
		return hoodie.account.signIn({
			username: email,
			password: password
		})
	})

	.then(function () {
	// window.location.href = 'index.html'
}).catch(handleError)
})

document.querySelector('form.signin').addEventListener('submit', function (event) {
	event.preventDefault()

	var email = this.querySelector('[name=email]').value
	var password = this.querySelector('[name=password]').value

	hoodie.account.signIn({
		username: email,
		password: password
	})

	.then(function () {
	//window.location.href = '/search.html'
}).catch(handleError)
})

function showOptions () {
	document.querySelector('.options').closest('[data-show]').setAttribute('data-show', 'options')
}

/**
 * Handle change email form submit
 */
 document.querySelector('form.change-email').addEventListener('submit', function (event) {
 	event.preventDefault()

 	var email = this.querySelector('[name=email]').value

 	hoodie.account.update({
 		username: email
 	})

 	.then(function () {
 		alert('email updated')
 		showOptions()
 	}).catch(handleError)
 })

/**
 * Handle password reset form submit
 */
 document.querySelector('form.password-reset').addEventListener('submit', function (event) {
 	event.preventDefault()

 	var email = this.querySelector('[name=email]').value

 	hoodie.account.request({
 		type: 'passwordreset',
 		username: email
 	})

 	.then(function () {
 		alert('Email sent to ' + email)
 		document.querySelector('[data-show="password-reset"]').setAttribute('data-show', 'signin')
 	}).catch(handleError)
 })

/**
 * Handle change password form submit
 */
 document.querySelector('form.change-password').addEventListener('submit', function (event) {
 	event.preventDefault()

 	var $passwordInput = this.querySelector('[name=password]')
 	var password = $passwordInput.value

 	hoodie.account.update({
 		password: password
 	})

 	.then(function () {
 		$passwordInput.value = ''
 		alert('password updated')
 		showOptions()
 	})
 })

/**
 * When clicking on "change username" button, set the input to current username
 */
 document.querySelector('[data-action="show-change-email"]').addEventListener('click', function (event) {
 	event.preventDefault()
 	hoodie.account.get('username').then(function (username) {
 		document.querySelector('#input-change-email').value = username
 	})
 })

/**
 * When clicking on "forgot password?" link, preset the email input with what is
 * entered in the sign in username input.
 */
 document.querySelector('[data-action="show-password-reset"]').addEventListener('click', function (event) {
 	event.preventDefault()
 	document.querySelector('#input-email-reset').value = document.querySelector('#input-signin-email').value
 })

/**
 * handle signout click. This will trigger a "signout" event which is handled
 * in common.js
 */
 document.querySelector('[data-action=signout]').addEventListener('click', function (event) {
 	event.preventDefault()
 	hoodie.account.signOut()
 })

//turns on dark mode
document.querySelector('[mode=dark-mode]').addEventListener('click', function (event) {
	event.preventDefault()
	setCookie("display-mode", "dark-mode")
	document.querySelector("html").id = "dark-mode-enabled"

	document.querySelectorAll('[mode]').forEach(item => {
		item.classList.remove('selected')
	})
	this.classList.toggle("selected")
})

//turns on light mode
document.querySelector('[mode=light-mode]').addEventListener('click', function (event) {
	event.preventDefault()
	setCookie("display-mode", "light-mode")
	document.querySelector("html").id = ""

	document.querySelectorAll('[mode]').forEach(item => {
		item.classList.remove('selected')
	})
	this.classList.toggle("selected")
})

//turns on 100% mode
document.querySelector('[text-size="10"]').addEventListener('click', function (event) {
	event.preventDefault()
	setCookie("text-size", "10px")
	document.querySelector(":root").style.fontSize = "10px"

	document.querySelectorAll('[text-size]').forEach(item => {
		item.classList.remove('selected')
	})
	this.classList.toggle("selected")
})
//turns on 125% mode
document.querySelector('[text-size="12.5"]').addEventListener('click', function (event) {
	event.preventDefault()
	setCookie("text-size", "12.5px")
	document.querySelector(":root").style.fontSize = "12.5px"

	document.querySelectorAll('[text-size]').forEach(item => {
		item.classList.remove('selected')
	})

	this.classList.toggle("selected")
})
//turns on 150% mode
document.querySelector('[text-size="15"]').addEventListener('click', function (event) {
	event.preventDefault()
	setCookie("text-size", "15px")
	document.querySelector(":root").style.fontSize = "15px"

	document.querySelectorAll('[text-size]').forEach(item => {
		item.classList.remove('selected')
	})

	this.classList.toggle("selected")
})

document.querySelector("#background-select").addEventListener("click", function(event) {
  event.preventDefault()
  var selectedBackground = event.target.getAttribute("mode")
  if(selectedBackground) {
    setCookie("background", selectedBackground)
    console.log(selectedBackground)
    document.querySelector('html').className = ''
    document.querySelector('html').classList.add(selectedBackground)
    document.querySelectorAll('#background-select a').forEach(i => {
      i.classList.remove("selected")
    })
    
    event.target.classList.toggle("selected");
  }
});

/**
 * handle account destroy click. This will also trigger a "signout" event which
 * is handled in common.js
 */
 document.querySelector('form.delete-account').addEventListener('submit', function (event) {
 	event.preventDefault()

 	var $deleteInput = this.querySelector('[name=rusure]')
 	var rusure = $deleteInput.value

 	if(rusure === "delete") {
 		hoodie.account.destroy()
 	}
 })