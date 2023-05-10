//SERVERSIDE:

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-3606c-default-rtdb.asia-southeast1.firebasedatabase.app/"
};



const app = initializeApp(appSettings);
const database = getDatabase(app);
const usersRef = ref(database, "users");
const groupListInDB = ref(database, "groupChat");


const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
let currentUser = null;

const createGroupBtn = document.getElementById("create-group-btn");
const joinGroupBtn = document.getElementById("join-group-btn");
const groupNameInput = document.getElementById("group-name-input");
const groupIdInput = document.getElementById("group-id-input");
const logoutBtn = document.getElementById("logout-btn")


if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = registerForm.username.value.trim();
        const password = registerForm.password.value.trim();
        const confirmPassword = registerForm.confirmpassword.value.trim();

        if (username === "" || password === "" || confirmPassword === "") {
            showAlert("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            showAlert("Passwords do not match");
            return;
        }

        createUser(username, password);
    });
}
  
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = loginForm.username.value.trim();
        const password = loginForm.password.value.trim();

        if (username === "" || password === "") {
            showAlert("Please fill in all fields");
            return;
        }

        loginUser(username, password);
    });
}

const createUser = (username, password) => {
    const newColorKey = Math.floor(Math.random() * 16777215).toString(16); // generate a random hex color code
    const newUserRef = ref(database, `users/${newColorKey}`);
    set(newUserRef, {
        username,
        password
    });
    console.log(`User ${username} has been created with color key #${newColorKey}!`);
    changePage("./login.html");
}


const loginUser = (username, password) => {
    onValue(usersRef, (snapshot) => {
        const users = snapshot.val();
        for (const [key, user] of Object.entries(users)) {
            if (user.username === username && user.password === password) {
                currentUser = {
                    id: key,
                    username: user.username
                };
                console.log(`User ${currentUser.username} has been logged in!`);
                localStorage.setItem("currentUser", JSON.stringify(currentUser)); // store currentUser in local storage
                changePage("./groups.html");
                return;
            }
        }
        console.log("Invalid username or password!");
        showAlert("Invalid username or password!")
    });
}

function logoutUser() {
    const currentUserJSON = localStorage.getItem("currentUser");
    if (currentUserJSON) {
        currentUser = JSON.parse(currentUserJSON);
        console.log(`User ${currentUser.username} has been logged out!`);
    } else {
        console.log("No user was logged in!");
    }
    currentUser = null;
    localStorage.removeItem("currentUser"); // remove currentUser from local storage
    changePage("./login.html");
}




if(logoutBtn){
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        logoutUser();
    });
}

function showAlert(message) {
    const alertContainer = document.querySelector('.alert-container');
    const alertMessage = document.querySelector('.alert-message');
    
    alertMessage.innerText = message;
        alertContainer.classList.remove("js-is-hidden");
    
    setTimeout(() => {
        alertContainer.classList.add("js-is-hidden");
    }, 3000);
}


if(createGroupBtn){
    createGroupBtn.addEventListener("click", ()=>{
        let groupName = groupNameInput.value;

    });
}

if(joinGroupBtn){
    joinGroupBtn.addEventListener("click",()=>{
        let groupId = groupIdInput.value;

    });
}

function changePage(url) {
    if (localStorage.getItem('currentUser')) {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    window.location.href = url;
}
  


//UI && nav:

const backButtonEl = document.getElementById("back-btn");
const displayCreateGroupBtn = document.getElementById("display-create-group");
const createGroupEl = document.querySelector(".create-group-box");

const displayJoinGroupBtn = document.getElementById("display-join-group");
const joinGroupEl = document.querySelector(".join-group-box");


if(backButtonEl){
    backButtonEl.addEventListener("click", () => {
        changePage("./groups.html");
    });
}

if(createGroupEl){
    document.addEventListener("click", (event) =>{
        if(event.target.closest(".create-group-box") || event.target.closest("#display-create-group")) return
        createGroupEl.classList.add("js-is-hidden");
        createGroupEl.classList.remove("js-is-flex");
    })
}
if(joinGroupEl){
    document.addEventListener("click", (event) =>{
        if(event.target.closest(".join-group-box") || event.target.closest("#display-join-group")) return
        joinGroupEl.classList.add("js-is-hidden");
        createGroupEl.classList.remove("js-is-flex");
    })
}

if (displayCreateGroupBtn) {
    displayCreateGroupBtn.addEventListener("click", () => {
        createGroupEl.classList.remove("js-is-hidden");
        createGroupEl.classList.add("js-is-flex");
    });
}
if (displayJoinGroupBtn) {
    displayJoinGroupBtn.addEventListener("click", () => {
        joinGroupEl.classList.remove("js-is-hidden");
        joinGroupEl.classList.add("js-is-flex");
    });
}


