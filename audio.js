const playButton = document.getElementById("play-button");
const audioPlayer = document.getElementById("audio-player");

playButton.addEventListener("click", function() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
});
