let addMessage = document.querySelector(".message"),
 addButton = document.querySelector(".add"),
 todo = document.querySelector(".todo")

let todoList = []

if(localStorage.getItem("todo")){
    todoList = JSON.parse(localStorage.getItem("todo"))
    displayMessages()
    }

 addButton.addEventListener("click", function(){
    if(!addMessage.value) return
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    }
    todoList.push(newTodo)
    displayMessages()
    localStorage.setItem("todo", JSON.stringify(todoList)) // ключ любой
    addMessage.value = ""
 })

 function displayMessages(){
    // var li = document.createElement("li")
    let displayMessage = ""
    if(todoList.length === 0) todo.innerHTML = ""
    todoList.forEach(function(item, i){ //item объект i индекс foreach - пребирает массив с объектами туду
        displayMessage += ` 
        <li class = "litd">
        <input class = "galka" type = "checkbox" id = "item_${i}" ${item.checked ? "checked" : ""}> 
        <label for = item_${i} class="${item.important ? "important" : ""}">${item.todo}</label>
        </li>`
        todo.innerHTML = displayMessage // ключевой оператор через ? условие, что выводить галку или нет 1 - true 2 - false
    })
 }

 todo.addEventListener("change", function(event){
    let idInput = event.target.getAttribute("id") // target находит где суета произошла
    let forLabel = todo.querySelector("[for = "+ idInput +"]") //ищем текст лэйбла через id объекта
    let valueLabel = forLabel.innerHTML
    //console.log(valueLabel)

    todoList.forEach(function(item){
        if(item.todo === valueLabel){
            item.checked = !item.checked
            localStorage.setItem("todo", JSON.stringify(todoList))
        }
    })

 })

 todo.addEventListener("contextmenu", function(event){ //контекстменю на правую кнопку мыши работает
    event.preventDefault() // отключает реакцию на правую кнопку мыши для места туду
    todoList.forEach(function(item, i){
        if(item.todo === event.target.innerHTML){
            if(event.ctrlKey){
                todoList.splice(i, 1)
            }else{
                item.important = !item.important
            }

            displayMessages()
            localStorage.setItem("todo", JSON.stringify(todoList))
            
        }
    })

 })