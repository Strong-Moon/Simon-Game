const buttonColours = ["red","blue","yellow","cyan"]; 

let game_Pattern = [];

let user_Clicked_Pattern =  [];

let started = false;

let level = 0;


function Sequence(){
    user_Clicked_Pattern = [];
    level++;
    $("#title").text("The level is " + level);

    var random_Number = Math.floor(Math.random() * 4);
    let random_Chosen_Colour = buttonColours[random_Number];
    game_Pattern.push(random_Chosen_Colour);

    $("#" + random_Chosen_Colour).fadeIn(125).fadeOut(125).fadeIn(125);
    playSound(random_Chosen_Colour);
}

$(".btn").click(function() {
    var user_Chosen_Colour = $(this).attr("id");
    user_Clicked_Pattern.push(user_Chosen_Colour);

    playSound(user_Chosen_Colour);
    animatePress(user_Chosen_Colour);
    check_Answer(user_Clicked_Pattern.length-1);
});

$(document).keypress(function() {
    if (!started) {
      $("#title").text(" The level is " + level);
      Sequence();
      started = true;
    }
});

function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColor) {

   $("#" + currentColor).addClass("pressed");
   
   setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 150);

  }


function check_Answer(currentLevel){

    if (game_Pattern[currentLevel] === user_Clicked_Pattern[currentLevel]) {
        console.log("success");
        
        if (user_Clicked_Pattern.length === game_Pattern.length){
            setTimeout(function () {
            Sequence();
            }, 1000);
        }
      } else {
            playSound("wrong");
            $("body").addClass("game-over");
            $("#title").text("Game Over, Press Any Key to Restart");

            setTimeout(function () {
            $("body").removeClass("game-over");
            }, 225);

            start_Over();
        }
}


function start_Over() {
    level = 0;
    game_Pattern = [];
    started = false;
  }
  