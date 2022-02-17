let buttonColours = ["red", "blue", "green", "yellow"]

let gamepattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keypress(function(){
    if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
    }
});

function startOver(){
    level = 0;
    gamepattern = [];
    started = false;

}


$(".btn").click(function(){

    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});


function checkAnswer(currentLevel) {

    if (gamepattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
    

    
        if (userClickedPattern.length === gamepattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);

        }
        } else {

            let wrongAudio = new Audio("sounds/wrong.mp3");
            wrongAudio.play();
            $("body").addClass("game-over");

            setTimeout(function(){
                $("body").removeClass("game-over")
            }, 200);


            $("#level-title").text("Game Over, Press Any Key to Restart!");
            startOver();
        }
}



function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamepattern.push(randomChosenColour);


    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}



    function playSound(name){
        let audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
}


function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
    
}, 100);
    
}





