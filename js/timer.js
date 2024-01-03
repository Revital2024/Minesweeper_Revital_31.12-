'use strict'

var startTime
var stopwatchInterval
var elapsedPausedTime = 0

function startStopwatch() {
    if (!stopwatchInterval) {
        startTime = new Date().getTime() - elapsedPausedTime
        stopwatchInterval = setInterval(updateStopwatch, 1000)
    }
}


function stopStopwatch() {
    clearInterval(stopwatchInterval)
    elapsedPausedTime = new Date().getTime() - startTime
    stopwatchInterval = null
}

function resetStopwatch() {
    stopStopwatch()
    elapsedPausedTime = 0
    document.getElementById("stopwatch").innerHTML = "00:00:00"
}

function updateStopwatch() {
    var currentTime = new Date().getTime();
    var elapsed = currentTime - startTime;
    var seconds = Math.floor(elapsed / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);

    seconds %= 60;
    minutes %= 60;

    // Display the elapsed time in the format HH:MM:SS
    document.getElementById("stopwatch").innerHTML =
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds;
}