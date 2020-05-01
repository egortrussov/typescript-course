const video = document.querySelector('video')
const btnPause = document.querySelector('#pause')
const btnSkip = document.querySelectorAll('#skip')
const btnMute = document.querySelectorAll('#mute')

let isPaused = true;
let isMuted = false;
const duration = video.duration;

btnPause.addEventListener('click', (e) => {
    if (isPaused) 
        video.play();
    else    
        video.pause();
    isPaused = !isPaused
})

btnSkip.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.getAttribute('data-backwards')) 
            video.currentTime -= 10;
        else 
            video.currentTime += 10;
    })
})

btnMute.addEventListener('click', (e) => {
    video.muted = !isMuted;
    isMuted = !isMuted;
})