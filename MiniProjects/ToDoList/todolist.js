window.onload = function() {

    const savedToDoList = JSON.parse(localStorage.getItem('todolist'))

    if (savedToDoList) {
        for (let todo of savedToDoList) {
            createToDo(todo)
        }
        
    }
    const startBtn = document.querySelector("#addBtn");
    startBtn.addEventListener("click", createToDo);

    const inputBox = document.querySelector("#inputBox")
    inputBox.addEventListener("keydown", function(event) {
        if (event.key === 'Enter')
            createToDo();
    });

    // 추가 기능: 전체 삭제 버튼 이벤트
    document.querySelector("#clearBtn").addEventListener("click", function () {
        if (confirm("정말 모든 항목을 삭제하시겠습니까?")) {
            document.querySelector('ul').innerHTML = "";
            localStorage.removeItem("todolist");
        }
    });
}

function createToDo(todo) {
    
    if (todo == "" && inputBox.value == "") return;

    // new li 노드 생성
    const liNode = document.createElement('li');

    const checkBtn = document.createElement('button');
    checkBtn.classList.add("checkBtn");

    const todoText = document.createElement('span');
    if (todo) {
        todoText.innerText = todo.contents;
        if (todo.check) todoText.classList.add('check');
    } else {
        todoText.innerText = inputBox.value;
    }

    checkBtn.addEventListener("click", function() {
        todoText.classList.toggle('check');
        if (checkBtn.innerText == "")
            checkBtn.innerText = 'V';
        else {
            checkBtn.innerText = "";
        }
        console.log("save to list")
        saveToDoList();
    });


    const delBtn = document.createElement('button');
    delBtn.innerText = 'X';
    delBtn.classList.add("delBtn");
    delBtn.addEventListener("click", function() {
        liNode.remove();
        saveToDoList();
    });

     // 추가 기능: 편집 버튼
    const editBtn = document.createElement('button');
    editBtn.innerText = '수정';
    editBtn.classList.add("editBtn"); // 추가 기능
    editBtn.addEventListener("click", function () {
        const newText = prompt("수정할 내용을 입력하세요:", todoText.innerText);
        if (newText !== null && newText.trim() !== "") {
            todoText.innerText = newText.trim();
            saveToDoList();
        }
    });

    liNode.appendChild(checkBtn);
    liNode.appendChild(todoText);
    liNode.appendChild(editBtn);
    liNode.appendChild(delBtn);

    // ul에 new list append
    const ulNode = document.querySelector('ul');
    ulNode.appendChild(liNode);

    document.querySelector('#todolist').style.display = 'block'

    saveToDoList();
}

function saveToDoList() {
    const todoList = document.querySelectorAll('li');
    if (todoList.length == 0) {
        console.log("save to do list" + todoList.length )        
        return;
    }


    const saveItems = [];
    for (let node of todoList) {
        const todoObj = {
            contents : node.querySelector('span').innerText,
            check : node.classList.contains('check')
        };
        saveItems.push(todoObj);
    }

    const list = JSON.stringify(saveItems);
    console.log(list)
    localStorage.setItem('todolist', list);
}