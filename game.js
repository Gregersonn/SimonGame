//Global variables
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

//event listeners
$("body").keydown(function(){
  if (level === 0)
  {
    nextSequence();
  }
})

$(".btn").click(function(e){
  var userChosenColor = this.id;
  playSound(userChosenColor);
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAwnser(userClickedPattern.length - 1);


  });

//helper funtions
function playSound(name){

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColor){

    $("." +currentColor).addClass("pressed");
    setTimeout(function(){$("." +currentColor).removeClass("pressed")}, 100);

}

function nextSequence(){

  var randNum = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randNum];

  playSound(randomChosenColor);
  $("." + randomChosenColor).fadeOut(100).fadeIn(100);
  gamePattern.push(randomChosenColor);

  level++;
  $("h1").text("Level " + level);

}

function checkAwnser(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    console.log("Sucssess");
    if (gamePattern.length === userClickedPattern.length){

      userClickedPattern = [];
      setTimeout(nextSequence, 1000);

    }
  }else{

    console.log("Failure");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");}, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();

  }
}

function startOver(){

  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}
