//hi sorry this code is garbo, im in the process of making it better

const journal_input = document.querySelector('textarea')
const helper_prompt = document.getElementsByClassName('helper-prompt')[0]
const input_controls = document.getElementsByClassName('input-controls')[0]
const input_comment = document.getElementsByClassName('comment')[0]

let ch1 = 50
let ch2 = 100
let ch3 = 150
let ch4 = 200


//typing actions: textarea focus, character changing
const keyActions = function() {
  journal_input.onkeyup = function(e) {
    if (journal_input.value != 0) {
      journal_input.classList.add('focused')
      helper_prompt.classList.add('sendToBottom')
      input_controls.classList.add('focused')
    } else {
      journal_input.classList.remove('focused')
    }

    if (journal_input.value.length > ch1) {
      document.getElementsByClassName('st1')[0].style.fill = '#D4FFE5'
      document.getElementsByClassName('st1')[0].style.stroke = '#D4FFE5'
      document.getElementsByClassName('st2')[0].style.fill = '#FFF'
      //input_comment.innerHTML = 'nice'
      if (journal_input.value.length > ch2) {
        document.getElementsByClassName('st2')[0].style.fill = '#B6FFD3'
        document.getElementsByClassName('st2')[0].style.stroke = '#B6FFD3'
        document.getElementsByClassName('st3')[0].style.fill = '#FFF'
        //input_comment.innerHTML = 'keep it up!'
        if (journal_input.value.length > ch3) {
          document.getElementsByClassName('st3')[0].style.fill = '#88FFB8'
          document.getElementsByClassName('st3')[0].style.stroke = '#88FFB8'
          document.getElementsByClassName('st4')[0].style.fill = '#FFF'
          //input_comment.innerHTML = 'above average'
          if (journal_input.value.length > ch4) {
            document.getElementsByClassName('st4')[0].style.fill = '#4FFD95'
            document.getElementsByClassName('st4')[0].style.stroke = '#4FFD95'
            //input_comment.innerHTML = 'whoa!'
          }
        }
      }
    } else {
      document.getElementsByClassName('st1')[0].style.fill = '#FFF'
      document.getElementsByClassName('st2')[0].style.fill = '#FFF'
      document.getElementsByClassName('st3')[0].style.fill = '#FFF'
      document.getElementsByClassName('st4')[0].style.fill = '#FFF'

      document.getElementsByClassName('st1')[0].style.stroke = '#D2C8AD'
      document.getElementsByClassName('st2')[0].style.stroke = '#D2C8AD'
      document.getElementsByClassName('st3')[0].style.stroke = '#D2C8AD'
      document.getElementsByClassName('st4')[0].style.stroke = '#D2C8AD'
    }
  }
}
journal_input.addEventListener('click', keyActions())

//helper prompt box toggle
const helper_prompt_box = document.getElementsByClassName('helper-prompt-box')[0]
const showPrompt = function() {
  helper_prompt.onmousedown = function(e) {
   helper_prompt_box.classList.toggle('open')
 }
 document.getElementsByClassName('exit')[0].onmousedown = function(e) {
  helper_prompt_box.classList.toggle('open')
}
}

helper_prompt.addEventListener('click', showPrompt())
document.getElementsByClassName('exit')[0].addEventListener('click', showPrompt())

//switches view mode
const expand_switch = document.getElementsByClassName('expand')[0]
const areaExpand = function() {
  if (!journal_input.classList.contains('expanded')) {
    journal_input.classList.toggle('expanded')
    expand_switch.innerHTML = 'minimize'
  } else {
    journal_input.classList.toggle('expanded')
    expand_switch.innerHTML = 'expand'
  }
}
expand_switch.addEventListener('click', function() {
  areaExpand()
})

//mood board toggle
const mood_board_switch = document.getElementsByClassName('mood-select')[0]
const mood_board = document.getElementsByClassName('mood-board')[0]
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
    console.log(this.querySelector("input").value)
  })
})

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

//shuffles prompts
let prompts = []
const prompt = document.querySelector(".prompt")
const getPrompt = function() {
  if(prompts.length > 0) {
    const rNum = Math.floor(Math.random() * prompts.length)
    const rPrompt = prompts[rNum]
    
    prompt.innerHTML = rPrompt.prompt
  }
}
//gets prompts from json file
fetch('json/prompts.json')
.then(response => response.json())
.then(jsonData => {
  prompts = jsonData
  getPrompt()
})

document.querySelector(".new-prompt").addEventListener("click", function() {
  getPrompt()
})

