
var buttonColors = ["red", "blue", "green", "yellow"]

var gamePattern = [];

var userClickedPattern =[];

var started = false;

var level = 0;

var isPressed=false;

$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1)
})

function nextSequence(){
  userClickedPattern = [];

  level++;

  $("#level-title").text("Level "+ level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  animatePress(randomChosenColor);
}


function playSound(name){

  var audio = new Audio("sounds/" + name +".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColor).removeClass("pressed");
  }, 100);

}

$(document).keydown(function(){
  if(!started){

    $("#level-title").text("Level "+ level);
    nextSequence();
    started = true;
  }
})

$(".start-button").click(function(){
  if(!isPressed){

    $("#level-title").text("Level "+ level);
    nextSequence();
    isPressed = true;
  }
})

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  }else{
    console.log("Wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }, 200);
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
  isPressed = false;
}
