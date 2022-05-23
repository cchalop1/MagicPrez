const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const firstBtn = document.getElementById("first");
const lastBtn = document.getElementById("last");
const playBtn = document.getElementById("play");
let currentVideo = document.getElementById('video');

let currentIdx = 0;

const pauseVideo = () => {
  if (currentVideo) {
    if (currentVideo.paused) {
      currentVideo.play();
    } else {
      currentVideo.pause();
    }
  }
}

const prevVideo = () => {
  if (currentIdx <= 0)
    return;
  currentIdx--;
  render();
  currentVideo?.play();
}

const nextVideo = () => {
  if (currentIdx >= json.steps.length - 1)
    return;
  currentIdx++;
  render();
  currentVideo?.play();
}

playBtn.addEventListener('click', pauseVideo);

prevBtn.addEventListener('click', prevVideo);

nextBtn.addEventListener('click', nextVideo);

firstBtn.addEventListener('click', () => {
  currentIdx = 0;
  render();
})

lastBtn.addEventListener('click', () => {
  currentIdx = json.steps.length - 1;
  render();
})

window.addEventListener("keydown", (ev) => {
  if (ev.key === " ") {
    pauseVideo();
  } else if (ev.key === "ArrowRight") {
    nextVideo();
  } else if (ev.key === "ArrowLeft") {
    prevVideo();
  }
});

const render = () => {
  document.getElementById("content").innerHTML = renderStep(json.steps[currentIdx]);
  currentVideo = document.getElementById('video');
}

const renderStep = (step) => {
  const type = step.file.split('.')[1]
  if (type === "jpg") {
    return `<div><h1>${step.name}</h1><img src="./assets/${step.file}"/></div>`
  } else if (type === "mp4") {
    return `<div><h1>${step.name}</h1><video id="video"><source src="./assets/${step.file}" type="video/mp4"></video></div>`
  }
}


document.getElementById("content").innerHTML = renderStep(json.steps[0]);