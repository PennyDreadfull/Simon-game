var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Detecting when a key is pressed
$(document).keypress(function(){
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  } 
});

// Detecting when a button is clicked
$(".btn").click(function()
{
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    
    console.log("success");

    if(userClickedPattern.length === gamePattern.length) {

    setTimeout(function() {
      nextSequence();
    }, 1000);
  } 

} else {
    console.log("wrong");

    playSound("wrong");
    
    $("body").addClass("game-over");
    setTimeout (function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
      }
  }

function nextSequence() {
  // Resetting the array for the next level
  userClickedPattern = [];

  // Inrementing levels each time
  level++;
  $("#level-title").text("Level " + level);
 
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  // Flashing animation
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Adding Sound
  playSound(randomChosenColour);
}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout (function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}  

