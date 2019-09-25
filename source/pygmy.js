//hi sorry this code is garbo, im in the process of making it better

const journal_input = document.querySelector('textarea')
const helper_prompt = document.getElementsByClassName('helper-prompt')[0]
const input_controls = document.getElementsByClassName('input-controls')[0]
const input_comment = document.getElementsByClassName('comment')[0]

//typing actions: textarea focus, character changing
const brown = '#D2C8AD'
const white = '#fff'
const greens = ['#D4FFE5', '#B6FFD3', '#88FFB8', '#4FFD95']
const sayings = ['short', 'medium', 'typical', 'above average']
const benchmarks = [100, 200, 350, 500] //to be replaced with actual averages from previous entry counts
const dots = document.getElementsByClassName('dot')
const comment = document.querySelector('.comment')
const keyActions = function() {
  journal_input.onkeyup = function(e) {
    if (journal_input.value.length != 0) {
      journal_input.classList.add('focused')
      helper_prompt.classList.add('sendToBottom')
      input_controls.classList.add('focused')
    } else {
      journal_input.classList.remove('focused')
    }
    //tracks character count and manages dots
    let currentBenchmark = -1;
    for (var i = dots.length - 1; i >= 0; i--) {
      if(journal_input.value.length >= benchmarks[i]) {
        dots[i].style.fill = greens[i]
        dots[i].style.stroke = greens[3]
        currentBenchmark++
      } else {
        dots[i].style.fill = white
        dots[i].style.stroke = brown
      }
    }
    if(currentBenchmark != -1) {
      comment.innerHTML = " " + sayings[currentBenchmark]
    } else {
      comment.innerHTML = " "
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

//checks the box
let allEmojis = document.querySelectorAll("input")
console.log(allEmojis)

allEmojis.forEach(emoji => {
    console.log(emoji)
    emoji.addEventListener("click", function() {
        console.log(emoji)
        allEmojis.forEach(emoji => {
            emoji.checked = false 
            console.log(emoji)
        })
        this.checked = true
        console.log(this.checked);
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

setDate()

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

