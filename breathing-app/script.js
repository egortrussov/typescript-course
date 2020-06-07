const container = document.querySelector('.container');
const text = document.querySelector('p#text');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

function breateAnimation() {
    text.innerHTML = 'Breate in!';
    container.className = 'container grow';

    setTimeout(() => {
        text.innerHTML = 'Hold';

        setTimeout(() => {
            text.innerHTML = 'Breathe Out!';
            container.className = 'container shrink';
        }, holdTime)
    }, breatheTime)
}

breateAnimation();

setInterval(breateAnimation, totalTime);