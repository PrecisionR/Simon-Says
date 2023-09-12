var bttnColors=["green","red","blue","yellow"];
var gamePattern=[];
var userChosenColor=[];
var level=0;
function nextSequence(){
    level=level+1;
    $("h1").text("Level "+level);
    var randomNumber=Math.floor(4*Math.random());
    var randomColor=bttnColors[randomNumber];
    var p="#"+randomColor;
    playSound(randomColor)
    $(p).fadeToggle();
    $(p).fadeToggle();
    gamePattern.push(randomColor);
   
}
$(document).one("keypress",function(){
    $("h1").text("Level "+level);
    nextSequence(); 

});

$(".btn").click(function(){
    userChosenColor.push($(this).attr("id"));
    animatePress("#"+$(this).attr("id"))
    playSound($(this).attr("id"));
    checkAnswer(userChosenColor.length-1);
})

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
 $(currentColor).addClass("pressed");
 setTimeout(function(){
    $(currentColor).removeClass("pressed");
 },100)
}

function checkAnswer(currentLevel){
    if(userChosenColor[currentLevel]===gamePattern[currentLevel]){
        if(currentLevel===gamePattern.length-1)
        {
          userChosenColor=[];
          setTimeout(nextSequence,1000);
        }
    }
    else{
        gamePattern=[];
        userChosenColor=[];
        playSound("wrong");
        level=0;
        $("h1").text("Game Over! press any key to restart");
        $(document).one("keypress",function(){
            $("h1").text("Level "+level);
            nextSequence(); });
    }
}