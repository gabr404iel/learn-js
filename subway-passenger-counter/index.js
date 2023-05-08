let count = 0;
const countElement = document.getElementById("count-el");
const addBtn = document.getElementsByClassName("add");
const deleteBtn = document.getElementsByClassName("delete");
const saveEl = document.getElementById("save-el");
function increment(){
    count++;
    countElement.textContent = count;
}
function decrement(){
    if(count>0){
        count--;
        countElement.textContent = count;
    }
    
}

function reset(){
    count = 0;
    countElement.textContent = count;
}

function save(){
    console.log(count);
    let countStr = count + " - ";
    saveEl.textContent += countStr;
    reset();
}

