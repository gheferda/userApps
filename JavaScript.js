const inputSearch = document.getElementById("input-search")
const newUserBtn = document.getElementById("new-user")
const addBtn = document.getElementById("add-btn")
const updBtn = document.getElementById("update-btn")
const clrBtn = document.getElementById("clear-btn")
const userForm = document.getElementById("user-form")
const inputName = document.getElementById("input-name")
const inputGender = document.getElementById("input-gender")
const inputAge = document.getElementById("input-age")
const usersList = document.querySelector(".users-list")

let results = []
let users = JSON.parse(localStorage.getItem("users")) || []
let usersData = {
  name: "john",
  gender: "male",
  age: 23
}

showData()//display localStorage
renderSearch()//search record
addBtn.onclick = function() {
  if (inputName.value == "" || inputGender.value == "" || inputAge.value == "") {
    alert("input is empty")
  } else {
  let newUsers = new addUser(
  inputName.value.trim(), 
  inputGender.value.trim(), 
  inputAge.value.trim())
// const { inputName.value.trim(), inputGender.value.trim(), inputAge.value.trim()
// } = newUsers
  results.push(newUsers)
  createElement(newUsers)
  saveData(newUsers)
  //updateData(newUsers)
  inputName.value = ""
  inputGender.value = ""
  inputAge.value = ""
  
  console.log("results",results)
  }
}
newUserBtn.onclick = function() {
  updBtn.disabled = true
  addBtn.disabled = false
  inputName.value = ""
  inputGender.value = ""
  inputAge.value = ""
}
clrBtn.onclick = function() {
  localStorage.clear()
}
//process the user input
function addUser(name, gender, age){
    let userObj = {
      name: this.name,
      gender: this.gender,
      age: this.age
    }
  //return the params to destructure extract the Object
  return {name, gender, age}
}
function createElement(newUsers) {
  const {name, gender, age} = newUsers
  
  const usersDiv = document.createElement("div")
  const usersTr = document.createElement("tr")
  const userName = document.createElement("p")
  const userGender = document.createElement("p")
  const userAge = document.createElement("p")
  const delBtn = document.createElement("button")
  const updateBtn = document.createElement("button")
  
  usersTr.classList.add("usersTr")
  delBtn.classList.add("del-btn", "btn", "btn-danger", "bg-danger", "text-white", "my-1")
  updateBtn.classList.add("update-btn", "btn", "btn-success", "bg-success", "text-white", "my-1", "px-1")
  
  userName.textContent = name
  userGender.textContent = gender
  userAge.textContent = age
  delBtn.innerText = "Del.."
  updateBtn.innerText = "Upd.."
  updateBtn.type = "button"
  
  let html = ""
  usersTr.innerHTML += `
        <tr class="">
        <td><img class="rounded-circle"
        width="46" height="46"
        src="/avatar1.jpg"</td>
          <td>${userName.textContent}</td>
          <td>${userGender.textContent}</td>
          <td>${userAge.textContent}</td>
        </tr>
  `
  usersTr.append(delBtn, updateBtn)
  usersList.appendChild(usersTr)
  
  delData(userName, delBtn, usersList, usersTr)
  updateData(updateBtn, userName, userGender, userAge)
}
function saveData(userObj) {
  const {name, gender, age} = userObj
  
    users.push(userObj)
  
  localStorage.setItem("users", JSON.stringify(users))
  console.log("data save", results[0])
}
function delData(userName, delBtn, usersList, usersTr) {
  let items = []
  
  results[0].forEach((userObj, index) =>{
    items.push(userObj.name)
  })
  
    delBtn.addEventListener("click", function() {
    console.log(userName.textContent, "click")
    
    const index = items.indexOf(userName.textContent)
      if (index >= 0) {
        results[0].splice(index, 1)
      }
  localStorage.setItem("users",JSON.stringify(results[0]))
    usersList.removeChild(usersTr)
    })
}
function updateData(updateBtn, userName, userGender, userAge) {
updateBtn.addEventListener("click", function() {
  updBtn.disabled = false
  addBtn.disabled = true
  
  document.getElementById("input-name").value = userName.textContent
  document.getElementById("input-gender").value = userGender.textContent
  document.getElementById("input-age").value = userAge.textContent
  // manipulate and show modal
  const modalElement = document.getElementById("modal-form")
  const bootstrapModel = new bootstrap.Modal(modalElement)
    bootstrapModel.show()
  
updBtn.onclick = function() {
  let items = []
  //Get my current click index
  users.forEach((obj, index) =>{
      //items.push(obj.name)
      if (obj.name === userName.textContent) {
        obj.name = inputName.value
        obj.gender = inputGender.value
        obj.age = inputAge.value
      }
  })
  inputName.value = ""
  inputGender.value = ""
  inputAge.value = ""
localStorage.setItem("users", JSON.stringify(users))
location.reload()
}
  })// end of listener
}
function showData() {
  results.push(users)
  results[0].forEach(createElement)
  
console.log("LocalStorage", users)
console.log("Results", results[0])
}
function renderSearch(usersTr) {
  let searching = inputSearch.addEventListener("input", (event) => {
  let searchTerm = event.target.value
  
  let filteredSearch = results[0].filter(person => 
      person.name === searchTerm
    )
    if (filteredSearch.length === 0) {
      usersList.innerHTML = ""
      console.log("no record...")
    } 
    else {
    console.log("searchResult", filteredSearch)
    filteredSearch.forEach(createElement)
    }
  })//end of input listener
inputSearch.addEventListener("keydown", (event) => {
  
  if (event.key === "Backspace") {
    console.log("Backspace key pressed");
    showData()
  } else if (event.key === "Delete") {
    console.log("Delete key pressed");
    showData()
  }
});//end of backspace listener

}