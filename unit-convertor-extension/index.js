const inputEl = document.getElementById("input-el");
const convertBtn = document.getElementById("convert-btn");
const desc = document.getElementsByClassName("desc");   //the array of the descs objs
let descArr = [];
let value = 1;

inputEl.addEventListener("keyup", () => {
    value = inputEl.value;
});


convertBtn.addEventListener("click" , () => {
    convertAll(value);
})

const convertUnits = (type, value) => {
    let valueInFeet, valueInMeters, valueInGallons, valueInLitres, valueInPounds, valueInKilograms;
    
    switch (type) {
        case "length":
            valueInFeet = (value * 3.281).toFixed(4);
            valueInMeters = (value * 0.3048).toFixed(4);
            return value + " meters = " + valueInFeet + " feet | " + value + " feet = " + valueInMeters + " meters";
        case "volume":
            valueInGallons = (value * 0.264).toFixed(4);
            valueInLitres = (value * 3.785).toFixed(4);
            return value + " litres = " + valueInGallons + " gallons | " + value + " gallons = " + valueInLitres + " litres";
        case "mass":
            valueInPounds = (value * 2.205).toFixed(4);
            valueInKilograms = (value * 0.4536).toFixed(4);
            return value + " kilograms = " + valueInPounds + " pounds | " + value + " pounds = " + valueInKilograms + " kilograms";
        default:
            return "Invalid conversion type.";
    }
};

const convertAll = (value) =>{
    desc[0].textContent = convertUnits("length",value);
    desc[1].textContent = convertUnits("volume",value);
    desc[2].textContent = convertUnits("mass",value);
}
