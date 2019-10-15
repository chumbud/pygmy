const journal_input = document.querySelector('textarea')
const helper_prompt = document.querySelector('.helper-prompt')
const input_controls = document.querySelector('.input-controls')
const input_comment = document.querySelector('.comment')

//typing actions: textarea focus, character changing
const brown = '#D2C8AD'
const white = '#fff'
const greens = ['#D4FFE5', '#B6FFD3', '#88FFB8', '#4FFD95']
const sayings = ['short', 'medium', 'typical', 'above average']
const benchmarks = [100, 200, 350, 500] //to be replaced with actual averages from previous entry counts


const keyActions = function() {
  journal_input.onkeyup = function(e) {
    if (journal_input.value.length != 0) {
      journal_input.classList.add('focused')
      helper_prompt.classList.add('sendToBottom')
      input_controls.classList.add('focused')
    } else {
      journal_input.classList.remove('focused')
    }
    input_controls.querySelector('.length-tracker').innerHTML = journal_input.value.length
    document.querySelector('.length-tracker').setAttribute('data-length-status', getComment(journal_input.value.length, sessionStorage.getItem("avg")))
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
expand_switch.addEventListener('click', function() {
  if (!journal_input.classList.contains('expanded')) {
    journal_input.classList.toggle('expanded')
    expand_switch.innerHTML = 'minimize'
  } else {
    journal_input.classList.toggle('expanded')
    expand_switch.innerHTML = 'expand'
  }
})

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
//updates on-hover comment for entry length


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

//sets the time for the current entry
let form = document.querySelector('#entry-form')
const date = document.getElementById('date')
let months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
]
const realDate = new Date()
const textarea = document.querySelector('textarea')
let today = realDate.getFullYear() + "-" + (realDate.getMonth()+1) + "-" + realDate.getDate()
const setDate = function() {
  if(sessionStorage.getItem("date") == null) {
    date.setAttribute("data-date", today)
    today = months[(realDate.getMonth())] + " " + realDate.getDate() + " " + realDate.getFullYear()
    date.innerHTML = today
  } else {
    date.setAttribute("data-date", sessionStorage.getItem("date"))
    today = sessionStorage.getItem("date").split("-")
    date.innerHTML = months[(today[1]-1)] + " " + today[2] + " " + today[0]
    sessionStorage.removeItem("date")
  }
}

const comments = ['short', 'medium', 'typical', 'above average']
//if being redirected from search, checks for an entry id for editing and turns on expanded mode
const getAdjacentEntry = function() {
  let prev = document.querySelector(".prev")
  let next = document.querySelector(".next")

  let entryDate = document.querySelector("#date").getAttribute("data-date").split("-")
  entryDate = new Date([entryDate[0], entryDate[1], entryDate[2]])

  let prevId = null
  let nextId = null
  hoodie.store.findAll().then(list => {
    let s = list.sort(function(a, b) {
      //TODO FIX TO CURRENT DATE SYSTEM WITH YYYY MM DD
      var dateA = new Date(a.hoodie.createdAt), dateB = new Date(b.hoodie.createdAt)
      return dateA - dateB
    })
    if(prev != null) {
      for (var i = s.length - 1; i >= 0; i--) {
        let cur = new Date(s[i].hoodie.createdAt)
        if(cur < entryDate) {
          prevId = s[i]._id
          prev.addEventListener("click", function() {
            sessionStorage.setItem("_id", prevId)
            window.location.replace("/")
          })
          break
        }
      }
      if(prevId == null)
        prev.style.display = "none"
    }
    if(next != null) {
      for (var i = 0; i <= s.length - 1; i++) {
        let cur = new Date(s[i].hoodie.createdAt)
        if(cur > entryDate) {
          nextId = s[i]._id
          next.addEventListener("click", function() {
            sessionStorage.setItem("_id", nextId)
            window.location.replace("/")
          })
          break
        }
      }
      if(nextId == null)
        next.style.display = "none"
    }
  }).catch(handleError)
}

let currentSession = null
//retrieves entry but keeps in view-only
if(sessionStorage.getItem('_id') != null) {
  hoodie.store.find(sessionStorage.getItem('_id')).then(response => {
    getEntry(response)

    //checks if edit more is clicked first
    if (sessionStorage.getItem("edit-mode") == null) {
      openInViewOnly()
    }
    sessionStorage.removeItem("edit-mode")
    sessionStorage.removeItem("_id")
  }).catch(handleError)
  openEntry()
//if it's today's entry
} else if(document.cookie.split(';').filter((item) => item.trim().startsWith('todayId=')).length && today == sessionStorage.getItem("date")) {
  var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)todayId\s*\=\s*([^;]*).*$)|^.*$/, "$1")

  hoodie.store.find(cookieValue).then(response => {
    getEntry(response)
    openInViewOnly()
  }).catch(function () {
    //if the entry for today is deleted
    setDate()
    if(document.querySelector(".prev") != null || document.querySelector(".next") != null) {
      getAdjacentEntry()
    }
    document.querySelector('.next').style.display = "none"
  })
  openEntry()
  //new entry for the day
} else {
  setDate()
  if(document.querySelector(".prev") != null || document.querySelector(".next") != null) {
    getAdjacentEntry()
  }
  document.querySelector('.next').style.display = "none"
}

function getEntry(response) {
  currentSession = response
  document.querySelector('textarea').value = response.entry
  document.querySelector('.mood-select').innerHTML = "<img src='assets/img/" + response.selectedEmoji + ".png'>"
  document.querySelector('h2').innerHTML = months[response.month-1] + ' ' + response.day + ' ' + response.year
  document.querySelector('h2').setAttribute("data-date", response.year + "-" + response.month + "-" + response.day)
  document.querySelector('.length-tracker').innerHTML += response.length
  document.querySelector('.length-tracker').setAttribute('data-length-status', getComment(response.length, sessionStorage.getItem("avg")))

  if(document.querySelector(".prev") != null || document.querySelector(".next") != null) {
    getAdjacentEntry()
  }
}

function openEntry() {
  document.querySelector('.expand').click()
  textarea.classList.toggle('focused')
  document.querySelector('.input-controls').classList.toggle('focused')
  document.querySelector('button').innerHTML = "save changes"
}

function openInViewOnly () {
  form.classList.add("read-only")
  document.querySelector('textarea').setAttribute("readonly", true)
  document.querySelector('#date').innerHTML += '<a class="edit">edit</a>'
  document.querySelector('h2 a.edit').addEventListener("click", function() {
    form.classList.toggle("read-only")
    if(this.innerHTML == "edit")
      this.innerHTML = "cancel"
    else
      this.innerHTML = "edit"
    document.querySelector('textarea').removeAttribute("readonly")
    document.querySelector('textarea').focus()
  })
}

form.addEventListener("submit", (event) => {
  event.preventDefault()

  let entry = textarea.value
  let length = textarea.value.length

  let journalDate = document.querySelector("#date").getAttribute("data-date").split("-")
  let year = journalDate[0]
  let month = journalDate[1]
  let day = journalDate[2]

  let selectedEmoji = ''
  let emojis = form.querySelectorAll('input')
  emojis.forEach(emoji => {
    if(emoji.checked)
      selectedEmoji = emoji.value
  })
  //new session
  if(currentSession == null) {
    entry = textarea.value
    length = textarea.value.length
    if(selectedEmoji == '')
      selectedEmoji = "empty"

    let today = new Date()
    let submittedJournalDate = new Date(document.querySelector("#date").getAttribute("data-date"))
    if(!entry) return
      hoodie.store.add({selectedEmoji, entry, length, month, day, year}).then(function (properties) {
        if(submittedJournalDate.getFullYear() == today.getFullYear() && submittedJournalDate.getMonth() == today.getMonth() && (submittedJournalDate.getDate()+1) == today.getDate()) {

          var expire = new Date();
          expire.setFullYear(today.getFullYear());
          expire.setMonth(today.getMonth());
          expire.setDate(today.getDate()+1);
          expire.setHours(0);
          expire.setMinutes(0);

          document.cookie = "todayId=" + properties._id + "; expires=" + expire.toString()

        }
      })
  } else {
  //editing session
  entry = textarea.value
  length = textarea.value.length

  emojis.forEach(emoji => {
    if(emoji.checked)
      selectedEmoji = emoji.value
  })
  if(!entry) return
    hoodie.store.update(currentSession._id, {selectedEmoji, entry, length, month, day, year})   
}

window.location.replace("/search.html")
})

const getComment = function (entryLength, userLengthAvg) {

  if(entryLength <= (userLengthAvg*.25))
    return sayings[0]
  if(entryLength <= (userLengthAvg*.5))
    return sayings[1]
  if(entryLength <= (userLengthAvg*.75))
    return sayings[2]
  if(entryLength >= (userLengthAvg*.75))
    return sayings[3]
  return "whoa"
}

