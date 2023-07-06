const buttonColour = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let keyPressNum = 1;

/* Restart the game after every key press. If gamePattern is empty call nextSequence
if gamePattern is not empty reset it to empty, reset userClickedPattern to empty, 
reset level to 0, before calling nextSequence */
$(document).keypress(function () {
   if (gamePattern.length === 0) {
      nextSequence();
   } else {
      gamePattern = [];
      userClickedPattern = [];
      level = 0;
      nextSequence();
   }
});

/*check content of gameClickPattern & userClickPattern if same.
returns true if they are and false if they are not*/
function checkAnswer(a, b) {
   for (let i = 0; i < b.length; ++i) {
      if (a[i] !== b[i]) return false;
   }
   return true;
}

//creates new audio based on the color clicked and plays the sound
function playSound(name) {
   let makeSound = new Audio(`sounds/${name}.mp3`);
   makeSound.play();
}

//animate by adding and removing a class on the btn pressed
function animatePress(currentColour) {
   $(`#${currentColour}`).addClass('pressed');
   setTimeout(() => {
      $(`#${currentColour}`).removeClass('pressed');
   }, 100);
}

/*sets game over text and plays game over sound 
and end the game by not calling nextSequence()*/
function gameOVER() {
   let str = 'GAME OVER, \n t';
   $('h1').html(
      '<span>Game Over<br><span class="sub-title">Press any key to restart</span></span>'
   );
   let makeSound = new Audio(`sounds/wrong.mp3`);
   makeSound.play();
}

/* Starts the game and ensures contunuity of the game by setting a new random color
to a btn and animating the btn while waiting for user to click btn */
function nextSequence() {
   let randomNumber = Math.floor(Math.random() * 4);
   const randomChosenColour = buttonColour[randomNumber];
   gamePattern.push(randomChosenColour);
   $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
   $('h1').text(`Level ${level}`);
   level++;
}

//listens to user click on any btn
$('.btn').on('click', function () {
   let userChosenColour = $(this).attr('id');
   /*if the number of times that the user has clicked button is less than the number of colors in gamePattern array,
   do not call nextSequence(), push the clicked color to userClickedPattern until keyPressNum is 1 less than the number of 
   colors in gamePattern array1 and increase the keyPressNum by . Also, keeps checking the answer and if at any point
   userClickedPattern does not match gameClickedPattern, end game*/
   if (keyPressNum < gamePattern.length) {
      playSound(userChosenColour);
      userClickedPattern.push(userChosenColour);
      animatePress(userChosenColour);
      if (!checkAnswer(gamePattern, userClickedPattern)) {
         gameOVER();
      }
      keyPressNum++;
   } else {
      /* As soon as KeyPressNum equals the number of colors in gamePattern, match userClickedPattern and gamePattern
      if match, clear userClickedPattern, reset keyPressNum and call nextSequence */
      playSound(userChosenColour);
      userClickedPattern.push(userChosenColour);
      animatePress(userChosenColour);
      if (checkAnswer(gamePattern, userClickedPattern)) {
         setTimeout(() => {
            nextSequence();
            userClickedPattern = [];
            keyPressNum = 1;
         }, 1000);
      } else {
         //end game for any unknown
         gameOVER();
      }
   }
});
