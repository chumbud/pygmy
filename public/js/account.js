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
    })

    .catch(handleError)
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
      window.location.href = 'index.html'
    })

    .catch(handleError)
})