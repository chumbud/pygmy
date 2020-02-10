//populate mood board
let emojiList = []
let emojiRoster = []
const mood_board = document.querySelector('.mood-board')
fetch('json/emoji.json')
.then(emojiListResponse => emojiListResponse.json())
.then(jsonData => {
	emojiRoster = jsonData
    emojiRoster.forEach(emoji => {
      //creates emoji in list element and adds it to the ul
      const option = document.createElement("li")
      option.innerHTML = "<input name=\"emoji\" type=\"radio\" value=\"" + emoji.value + "\"/><img src=\"assets/img/" + emoji.value + ".png\">"
      mood_board.querySelector("ul").appendChild(option)
    })
  })
  .then(function() {
    mood_board.addEventListener("click", function(event) {    
      if(event.target.closest("li")) {
      let inputEmoji = event.target.closest("li").firstChild

      mood_board_switch.innerHTML = "<img src='assets/img/"+ inputEmoji.value +".png'>"
      mood_board_switch.classList.add('selected')
      //checks the emoji for submission and unchecks all others if changed
      document.querySelectorAll('.mood-board ul li').forEach(emoji => {
        emoji.querySelector('input').checked = false
      })
      inputEmoji.checked = true

      //triggers input event for search
      var e = document.createEvent("HTMLEvents")
      e.initEvent("input", true, true)
      e.eventName = "input"
      inputEmoji.dispatchEvent(e)
      }
    })  
	})
  .then(function() {
    if(sessionStorage.getItem('_id') != null) {
      hoodie.store.find(sessionStorage.getItem('_id')).then(response => {
        document.querySelector('input[value="' + response.selectedEmoji + '"]').checked = true
        console.log('input[value="' + response.selectedEmoji + '"]')
      })
    }
    //this should be the last call made since the board loads last, i know this is really unintuitive but uh it fixes things
    //im a designer, not a DeVelOpeR
    sessionStorage.removeItem("_id")
  })
	


//mood board toggle
const mood_board_switch = document.querySelector('.mood-select')
mood_board_switch.addEventListener('click', function() {
	mood_board.classList.toggle("open")
})

//mood board toggle via click off
document.addEventListener("click", function(event) {
	if(event.target.closest(".mood-board") || event.target.closest(".mood-select")) return
		mood_board.classList.remove("open")
})
