
const backButtonEl = document.getElementById("back-btn");
const addGroupButtonEl = document.getElementById("display-add-group");
const addGroupEl = document.querySelector(".add-group-box");

if(backButtonEl){
    backButtonEl.addEventListener("click", () => {
        changePage("./groups.html");
    });
}

document.addEventListener("click", (event) =>{
    if(event.target.closest(".add-group-box") || event.target.closest("#display-add-group")) return
    addGroupEl.classList.add("js-is-hidden")
})

if (addGroupButtonEl) {
    addGroupButtonEl.addEventListener("click", () => {
        addGroupEl.classList.remove("js-is-hidden");
    });
}

function changePage(url){
    window.location.href = url;
}

