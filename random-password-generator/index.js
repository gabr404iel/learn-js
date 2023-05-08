const nosymbols = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
const output = document.getElementsByClassName("output");

const noSymbolsToggle = document.getElementById("nosymbols-toggle");
let symbolsToggle = true;
let activeArray = characters;

noSymbolsToggle.onchange = () => {
    if(symbolsToggle == true){
        activeArray = nosymbols;
        symbolsToggle = false;
    }else if(symbolsToggle == false){
        activeArray = characters;
        symbolsToggle = true;
    }
    
};

function generatePassword(){
    output[0].textContent = "";
    output[1].textContent = "";
    output[0].setAttribute('title','Copy to clipboard');
    output[1].setAttribute('title','Copy to clipboard');
    for(i =0; i< length; i++){
        output[0].textContent += getRandomChar();
        output[1].textContent += getRandomChar();
    }
}

function getRandomChar(){
    if(symbolsToggle.value = false){
        return activeArray[Math.floor(Math.random() * activeArray.length)];
    }else if(symbolsToggle.value = true){
        return activeArray[Math.floor(Math.random() * activeArray.length)];
    }
    
}

function copyToClipboard(i){
    if(output[i].textContent != ""){
        const previousTextContent = output[i].textContent;
        navigator.clipboard.writeText(previousTextContent);
        output[i].textContent = "Copied to clipboard";
        output[i].addEventListener("mouseleave", function() {
            output[i].textContent = previousTextContent;
        }, {once: true});
    }
}

const settings = document.querySelector(".settings");
const gearBtn = document.getElementById("settings-btn");
let opened = false;
function toggleSettings(){
    if (opened == false){
        settings.style.display = 'block';
        opened = true;
    }else if(opened == true){
        settings.style.display = 'none';
        opened = false;
    }
}

const lengthInput = document.getElementById("length-input");
let length = lengthInput.value;

lengthInput.onchange = () => {
  length = parseInt(lengthInput.value);
};



const body = document.querySelector('body');
const toggleBtn = document.querySelector('#toggle-btn');

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('light-mode');
});