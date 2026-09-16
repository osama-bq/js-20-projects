const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullscreenBtn = document.querySelector('.fullscreen');


// Show Play Icon
function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

// Play & Pause ----------------------------------- //
function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    } else {
        video.pause();
        showPlayIcon();
    }
}

video.addEventListener('ended', showPlayIcon);


// Progress Bar ---------------------------------- //
function displayTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
}

function updateProgress() {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
}

function setProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}


// Volume Controls --------------------------- //
let lastVolume = 1;

function changeVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    // Rounding volume up or down
    if (volume < 0.1) {
        volume = 0;
    }
    if (volume > 0.9) {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;
    
    // Change icon depending on volume
    volumeIcon.className = '';
    if (volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    }  else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-mute');
    }
    lastVolume = volume;
}

function toggleMute() {
    volumeIcon.className = '';
    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
    } else {
        if (lastVolume === 0) lastVolume = 1;
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        // Change icon depending on volume
        volumeIcon.className = '';
        if (lastVolume > 0.7) {
            volumeIcon.classList.add('fas', 'fa-volume-up');
        } else if (lastVolume < 0.7 && lastVolume > 0) {
            volumeIcon.classList.add('fas', 'fa-volume-down');
        } // lastVolume === 0 is not possible because of the if statement above
        volumeIcon.setAttribute('title', 'Mute');
    }
}


// Change Playback Speed -------------------- //
function changeSpeed() {
    video.playbackRate = speed.value;
}


// Fullscreen ------------------------------- //
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    }
    video.classList.add('video-fullscreen');
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    }
    video.classList.remove('video-fullscreen');
}

let fullScreen = false;

function toggleFullscreen() {
    if (!fullScreen) {
        openFullscreen(player);
    } else {
        closeFullscreen();
    }
    fullScreen = !fullScreen;
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);