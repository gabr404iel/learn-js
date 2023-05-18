const ColorApiForm = document.getElementById("color-api-form");
const pickColorBtn = document.getElementById("pick");

ColorApiForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const seedColor = document.getElementById('seed-color').value.replace('#','');
    const schemeMode = document.getElementById('scheme-mode').value;
    console.log(seedColor);
    console.log(schemeMode);
    const queryAPI = `https://www.thecolorapi.com/scheme?hex=${seedColor}&format=json&mode=${schemeMode}&count=5`;
    console.log("Getting data from: " + queryAPI);
    const options = {
       method: 'GET'
    };
    fetch(queryAPI, options)
        .then(res => res.json())
        .then(item => updateColorHTML(item))
});


const updateColorHTML = (item) => {
    const colorsArray = [];
    const hexColorsArray = [];
    
    const parentDiv = document.getElementById("info");
    parentDiv.innerHTML = "";
    
    item.colors.forEach(color => {
        const colorElem = document.createElement("div");
        colorElem.classList.add("color");
        colorElem.style.backgroundColor = color.hex.value;
        parentDiv.appendChild(colorElem);
        colorsArray.push(colorElem);
    });
    
    item.colors.forEach(color => {
        const hexElem = document.createElement("div");
        hexElem.classList.add("hex-color");
        hexElem.textContent = `${color.hex.value}`;
        parentDiv.appendChild(hexElem);
        hexColorsArray.push(hexElem);
    });
    
    colorsArray.forEach((color, index) => {
        color.addEventListener("mouseenter", () => {
            colorsArray[index].style.transform = "translate(4px, -5px)"
            hexColorsArray[index].style.transform = "translate(4px, -5px)";
        });
        color.addEventListener("mouseout", () => {
            hexColorsArray[index].style.transform = "none";
            colorsArray[index].style.transform = "none"
        });
        color.addEventListener("click",()=>{
            copyToClipboard(hexColorsArray[index].textContent);
        })
    });
    
    hexColorsArray.forEach((hexColor, index) => {
        hexColor.addEventListener("click", () => {
            copyToClipboard(hexColor.textContent);
        });
    });
};

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
        .then(() => {
            // Success message or any other action
            showModal(`"${text}" has been copied to the clipboard.`);
        })
        .catch((error) => {
            // Error handling
            console.error('Unable to copy text:', error);
        });
};


const showModal = (message) => {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.textContent = message;
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.remove();
    }, 1500);
};