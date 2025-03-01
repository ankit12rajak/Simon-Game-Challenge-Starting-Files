var buttonColours =["red","blue","green","yellow"];
var gamePattern =[];
var userClickedPattern =[];

var level=0;
var started=false;
function nextSequence()
{

    userClickedPattern=[];    
    level++;
    $("#level-title").text("Level "+level);
   var n =Math.floor(Math.random()*4) ;
   console.log(n);

   var randomChosenColour = buttonColours[n];
gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

$(".btn").click(function()
{
    var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);

checkAnswer(userClickedPattern.length-1);
});
  
function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function()
    {
        $("#"+currentColor).removeClass("pressed");
    },100);
}

$(document).click(function()
{
    if(!started)
        {
           setTimeout(function()
        {
            $("#level-title").text("Level "+level);
            nextSequence();
            started=true;
        },1000); 
        }

});

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]=== userClickedPattern[currentLevel])
        {
            if(gamePattern.length===userClickedPattern.length)
                {
                    setTimeout(function()
                {
                    nextSequence();
                },1000);
                }
        }
    
    else
    {
        if(level>0)
            {
                playSound("wrong");
       $("body").addClass("game-over"); 
       $("h1").text("Game Over , Press Any Key to Restart");

       setTimeout(function()
    {
        $("body").removeClass("game-over");
    },200);

    startOver();
            }
        
    }
}

function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}