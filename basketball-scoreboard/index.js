
const HomeScore = document.getElementById("score-home");
const GuestScore = document.getElementById("score-guest");
const HomeScoreBox = document.querySelector(".box.home");
const GuestScoreBox = document.querySelector(".box.guest");

let homeInitScore = 0;
let awayInitScore = 0

function add(num, char){
    if(char == 'h'){
        let scoreChanged = HomeScore;
        homeInitScore += num;
        scoreChanged.textContent = homeInitScore;
        checkLead();
    }else if(char == 'g'){
        let scoreChanged = GuestScore;
        awayInitScore += num;
        scoreChanged.textContent = awayInitScore;
        checkLead();
    }
    
}

function checkLead(){
    if(homeInitScore > awayInitScore){
        HomeScoreBox.style.border = "2px solid green";
        GuestScoreBox.style.border = "2px solid #080001 ";
    }else if(homeInitScore < awayInitScore){
        GuestScoreBox.style.border = "2px solid green";
        HomeScoreBox.style.border = "2px solid #080001 ";
    }else{
        GuestScoreBox.style.border = "2px solid #080001 ";
        HomeScoreBox.style.border = "2px solid #080001 ";
    }
}