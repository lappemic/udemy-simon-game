// Holds the sequence of colors to be followed by the user.
var gamePattern = [];
// Tracks the current level of the game.
var level = 0;
// Flag to track the game's start status.
var started = false;
// Stores the sequence of colors clicked by the user.
var userClickedPattern = [];
// Available color options for the game.
var buttonColours = ['red', 'blue', 'green', 'yellow'];

// +++ Utility Functions +++
// Plays a sound corresponding to a given color.
function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

// Animates button press effect.
function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');
    setTimeout(function () {
        $('#' + currentColour).removeClass('pressed');
    }, 100);
}

// +++ Game Logic Functions +++
// Generates the next color sequence, increases level, and updates UI.
function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
    playSound(randomChosenColour);

    level++;
    $('#level-title').text('Level ' + level);
}

// Checks if the user's sequence matches the game sequence.
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);
        $('#level-title').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

// Resets the game to its initial state.
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// +++ Event Handlers +++
// Event handler to start the game when a key is pressed.
$(document).keypress(function () {
    if (!started) {
        $('#level-title').text('Level ' + level);
        nextSequence();
        started = true;
    }
});

// Event handler for button clicks.
$('.btn').click(function () {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});
