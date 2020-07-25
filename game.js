gamePattern = [];
level = 0;
lastIndex = 0;

buttonColors = ["red", "yellow", "green", "blue"];

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randIndex = Math.floor(4 * Math.random());
  var nextColor = buttonColors[randIndex];
  $("#" + nextColor)
    .fadeOut(100)
    .fadeIn(100);
  var audio = new Audio("sounds/" + nextColor + ".mp3");
  audio.play();
  gamePattern.push(nextColor);
}

function checkAnswer(userClick) {
  if (userClick === gamePattern[lastIndex]) {
    lastIndex++;

    if (lastIndex >= level) {
      lastIndex = 0;
      setTimeout(nextSequence, 1000);
    }
  } else {
    $("body").css("background-color", "red");
    setTimeout(function () {
      $("body").css("background-color", "#011F3F");
    }, 200);
    $("#level-title").html(
      "Game Over<br>Your Score is : " + level + "<br>Press any Key to Restart"
    );
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    level = 0;
    lastIndex = 0;
    gamePattern = [];
    return;
  }
}

$("div.btn").on("click", function () {
  buttonId = $(this).attr("id");
  $("#" + buttonId)
    .fadeOut(100)
    .fadeIn(100);
  var audio = new Audio("sounds/" + buttonId + ".mp3");
  audio.play();
  if (level != 0) {
    checkAnswer(buttonId);
  }
});

$(document).on("keydown", function () {
  if (level == 0) {
    nextSequence();
  }
});
