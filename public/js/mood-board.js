//populate mood board
let emojiRoster = []
const mood_board = document.getElementsByClassName('mood-board')[0]
const moodBoardPopulate = function() {
  fetch('json/emoji.json')
  .then(emojiListResponse => emojiListResponse.json())
  .then(jsonData => {
    emojiRoster = jsonData
    emojiRoster.forEach(emoji => {
      const option = document.createElement("li")
      option.innerHTML = "<input name=\"emoji\" type=\"radio\" value=\"" + emoji.value + "\"/><img src=\"assets/img/" + emoji.value + ".png\">"
      mood_board.querySelector("ul").appendChild(option) 
    })  
  })
}
moodBoardPopulate()

//mood board toggle
const mood_board_switch = document.getElementsByClassName('mood-select')[0]
const openEmojiPanel = function() {
  mood_board.classList.toggle("open")
}

mood_board_switch.addEventListener('click', function() {
  openEmojiPanel()
})

//mood board toggle via click off
document.addEventListener("click", function(event) {
  if(event.target.closest(".mood-board") || event.target.closest(".mood-select")) return
    mood_board.classList.remove("open")
})

//mood board emoji selection
const emojiList = document.querySelectorAll('.mood-board ul li')
emojiList.forEach(emoji => {
  emoji.addEventListener("click", function() {    
    mood_board_switch.innerHTML = "<img src='assets/img/"+ this.querySelector("input").value +".png'>"
    emojiList.forEach(emoji => {
      emoji.querySelector('input').checked = false 
    })
    this.querySelector('input').checked = true
  })
})