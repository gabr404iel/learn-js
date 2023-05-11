//SERVERSIDE:

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, set, get, orderByChild } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-3606c-default-rtdb.asia-southeast1.firebasedatabase.app/"
};



const app = initializeApp(appSettings);
const database = getDatabase(app);
const usersRef = ref(database, "users");
const groupsRef = ref(database, "groups");


const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
let currentUser = null;

const createGroupBtn = document.getElementById("create-group-btn");
const joinGroupBtn = document.getElementById("join-group-btn");
const groupNameInput = document.getElementById("group-name-input");
const groupIdInput = document.getElementById("group-id-input");
const logoutBtn = document.getElementById("logout-btn")
const usernameInput = document.getElementById('username');
const usernameRegex = /^[^.$#\[\]]+$/;
const passwordInput = document.getElementById('password');

if(usernameInput){
    usernameInput.addEventListener('input', () => {
        if (!usernameRegex.test(usernameInput.value)) {
          showAlert('Username can\'t contain ".", "#", "$", "[", or "]"');
          usernameInput.value = '';
        }
    });
}


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

        if (password.length < 8) {
            showAlert('Password must be at least 8 characters long');
            return
        }

         // Check if username already exists
         const queryRef = ref(database, `users/${username}`);
         get(queryRef).then((snapshot) => {
             if (snapshot.exists()) {
                 showAlert(`User ${username} already exists!`);
             } else {
                 createUser(username, password);
             }
         });
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
    const color = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'); // generate a random hex color code
    let key = username;
    let hexcolor = "#" + color;
    let groups = [];
    const newUserRef = ref(database, `users/${key}`);
    set(newUserRef, {
        username,
        password,
        hexcolor,
        groups
    });
    console.log(`User ${username} has been created with color ${hexcolor}!`);
    changePage("./login.html");
}


const loginUser = (username, password) => {
    onValue(usersRef, (snapshot) => {
        const users = snapshot.val();
        for (const [key, user] of Object.entries(users)) {
            if (user.username === username && user.password === password) {
                currentUser = {
                    id: key,
                    username: user.username,
                    hex: user.hexcolor,
                    groups : user.groups
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


const generateGroupId = (num) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < num; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

const createGroup = (groupName) => {
    const currentUserJSON = localStorage.getItem("currentUser");
    if (currentUserJSON) {
        currentUser = JSON.parse(currentUserJSON);
    }
    const newGroupId = generateGroupId(7);
    const newGroupRef = push(groupsRef); // push() method generates a new unique key for the new group
    const groupData = {
        name: groupName,
        id: newGroupId,
        users: [currentUser]
    }
    set(newGroupRef, groupData);
    createGroupEl.classList.remove("js-is-flex");
    createGroupEl.classList.add("js-is-hidden");
    console.log(`Group ${groupName} has been created with ID ${newGroupId}!`);
    showAlert(`You have created "${groupName}"!`)

    // Update user's groups
    const userRef = ref(database, `users/${currentUser.id}`);
    get(userRef).then((snapshot) => {
        const userData = snapshot.val();
        if (userData && userData.groups) { // Check if userData.groups exists
            const updatedGroups = [...userData.groups, groupData];
            set(userRef, { ...userData, groups: updatedGroups });
        } else {
            // If userData.groups doesn't exist, initialize it as an array containing groupData
            set(userRef, { ...userData, groups: [groupData] });
        }
    });
}


if(createGroupBtn){
    createGroupBtn.addEventListener("click", ()=>{
        let groupName = groupNameInput.value;
        createGroup(groupName);
    });
}


const joinGroup = (groupId, currentUser) => {
    const groupsRef = ref(database, "groups");
    get(groupsRef).then((snapshot) => {
        const groups = snapshot.val();
        const groupEntry = Object.entries(groups).find(([key, group]) => group.id === groupId);
        if (groupEntry) {
            const [groupKey, groupData] = groupEntry;
            const groupRef = ref(database, `groups/${groupKey}`);
            const updatedUsers = [...groupData.users, currentUser];
            set(groupRef, { ...groupData, users: updatedUsers });
            console.log(`User ${currentUser.username} has joined group ${groupData.name} (${groupKey})!`);
            showAlert(`You have joined ${groupData.name}!`);
            joinGroupEl.classList.remove("js-is-flex");
            joinGroupEl.classList.add("js-is-hidden");

            const userRef = ref(database, `users/${currentUser.id}`);
            get(userRef).then((snapshot) => {
                const userData = snapshot.val();
                if (userData && userData.groups) { // Check if userData.groups exists
                    const updatedGroups = [...userData.groups, groupData];
                    set(userRef, { ...userData, groups: updatedGroups });
                    console.log(`Updated user's groups: ${updatedGroups}`);
                } else {
                    // If userData.groups doesn't exist, initialize it as an empty array
                    set(userRef, { ...userData, groups: [groupData] });
                }
            });
        } else {
            console.log(`Group with id: "${groupId}" does not exist!`);
            showAlert(`Group with id: "${groupId}" does not exist!`);
        }
    });
};


if(joinGroupBtn){
    joinGroupBtn.addEventListener("click",()=>{
        let groupId = groupIdInput.value;
        const currentUserJSON = localStorage.getItem("currentUser");
        if (currentUserJSON) {
            currentUser = JSON.parse(currentUserJSON);
        }
        joinGroup(groupId, currentUser); // Pass currentUser as a parameter
    });
}

function changePage(url) {
    if (localStorage.getItem('currentUser')) {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    window.location.href = url;
}
  
function renderGroups(){

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


const groupsHeader = document.getElementById('groups-header');
const mainGroupSection = document.getElementById('group-section');
const updateAppPadding = () => {
    
    const headerHeight = groupsHeader.offsetHeight; // get height of header
    mainGroupSection.style.paddingTop = `${headerHeight}px`;
};

if(groupsHeader){
    updateAppPadding();
}

if(createGroupEl){
    document.addEventListener("click", (event) =>{
        if(event.target.closest(".create-group-box") || event.target.closest("#display-create-group")) return
        createGroupEl.classList.add("js-is-hidden");
        createGroupEl.classList.remove("js-is-flex");
        updateAppPadding();
    })
}
if(joinGroupEl){
    document.addEventListener("click", (event) =>{
        if(event.target.closest(".join-group-box") || event.target.closest("#display-join-group")) return
        joinGroupEl.classList.add("js-is-hidden");
        createGroupEl.classList.remove("js-is-flex");
        updateAppPadding();
    })
}

if (displayCreateGroupBtn) {
    displayCreateGroupBtn.addEventListener("click", () => {
        createGroupEl.classList.remove("js-is-hidden");
        createGroupEl.classList.add("js-is-flex");
        updateAppPadding();
    });
}
if (displayJoinGroupBtn) {
    displayJoinGroupBtn.addEventListener("click", () => {
        joinGroupEl.classList.remove("js-is-hidden");
        joinGroupEl.classList.add("js-is-flex");
        updateAppPadding();
    });
}








