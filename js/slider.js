// Global variables for player control and slider animation
let players = [];
let playerStates = {}; // true if a player is playing
let nextPlayerId = 0;
const slider = document.getElementById("videoSlider");
const sliderContainer = document.getElementById("sliderContainer");
let isSliderPaused = false;
let resumeTimeout = null;
let currentX = 0;
let speed = 0.04; // pixels per millisecond
let lastTimestamp = null;
let sliderWidth = 0; // width of original slides (before cloning)
let isDragging = false;
let startMouseX = 0;
let dragStartX = 0;

// Return true if any video is playing
function anyVideoPlaying() {
  return Object.values(playerStates).some((state) => state === true);
}

function pauseSlider() {
  isSliderPaused = true;
}

function resumeSlider() {
  isSliderPaused = false;
}

// Initialize Vimeo players for all slides
function initPlayers() {
  const slides = document.querySelectorAll(".slider .slide");
  slides.forEach((slide) => {
    const iframe = slide.querySelector("iframe");
    if (iframe) {
      let player = new Vimeo.Player(iframe);
      player.playerId = nextPlayerId;
      playerStates[nextPlayerId] = false;
      nextPlayerId++;

      player.on("play", function () {
        pauseSlider();
        playerStates[player.playerId] = true;
        if (resumeTimeout) {
          clearTimeout(resumeTimeout);
          resumeTimeout = null;
        }
      });

      player.on("pause", function () {
        playerStates[player.playerId] = false;
        if (resumeTimeout) clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
          if (!anyVideoPlaying() && !isDragging) {
            resumeSlider();
          }
          resumeTimeout = null;
        }, 3000);
      });

      player.on("ended", function () {
        playerStates[player.playerId] = false;
        if (resumeTimeout) clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
          if (!anyVideoPlaying() && !isDragging) {
            resumeSlider();
          }
          resumeTimeout = null;
        }, 3000);
      });

      players.push(player);
    }
  });
}

// Clone slides for infinite looping
function cloneSliderContent() {
  const originalSlides = Array.from(slider.children);
  originalSlides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    const iframe = clone.querySelector("iframe");
    if (iframe) {
      let player = new Vimeo.Player(iframe);
      player.playerId = nextPlayerId;
      playerStates[nextPlayerId] = false;
      nextPlayerId++;
      player.on("play", function () {
        pauseSlider();
        playerStates[player.playerId] = true;
        if (resumeTimeout) {
          clearTimeout(resumeTimeout);
          resumeTimeout = null;
        }
      });
      player.on("pause", function () {
        playerStates[player.playerId] = false;
        if (resumeTimeout) clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
          if (!anyVideoPlaying() && !isDragging) {
            resumeSlider();
          }
          resumeTimeout = null;
        }, 3000);
      });
      player.on("ended", function () {
        playerStates[player.playerId] = false;
        if (resumeTimeout) clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
          if (!anyVideoPlaying() && !isDragging) {
            resumeSlider();
          }
          resumeTimeout = null;
        }, 3000);
      });
      players.push(player);
    }
    slider.appendChild(clone);
  });
}

// Auto-sliding animation loop using requestAnimationFrame
function animateSlider(timestamp) {
  if (!lastTimestamp) lastTimestamp = timestamp;
  let delta = timestamp - lastTimestamp;
  lastTimestamp = timestamp;
  if (!isSliderPaused && !isDragging) {
    currentX -= speed * delta;
    if (Math.abs(currentX) >= sliderWidth) {
      currentX = 0;
    }
    slider.style.transform = "translateX(" + currentX + "px)";
  }
  requestAnimationFrame(animateSlider);
}

// Dragging functionality for manual control
sliderContainer.addEventListener("mousedown", function (e) {
  isDragging = true;
  // Add a class to disable pointer events on iframes during drag
  sliderContainer.classList.add("dragging");
  if (resumeTimeout) {
    clearTimeout(resumeTimeout);
    resumeTimeout = null;
  }
  startMouseX = e.pageX;
  dragStartX = currentX;
  sliderContainer.style.cursor = "grabbing";
});

// Use window-level mousemove and mouseup events for reliability
window.addEventListener("mousemove", function (e) {
  if (!isDragging) return;
  let diff = e.pageX - startMouseX;
  let newX = dragStartX + diff;
  while (newX > 0) newX -= sliderWidth;
  while (newX < -sliderWidth) newX += sliderWidth;
  currentX = newX;
  slider.style.transform = "translateX(" + currentX + "px)";
});

window.addEventListener("mouseup", function () {
  if (isDragging) {
    isDragging = false;
    sliderContainer.style.cursor = "grab";
    // Remove the class to re-enable pointer events on iframes
    sliderContainer.classList.remove("dragging");
    if (!anyVideoPlaying()) {
      resumeSlider();
    }
  }
});

window.addEventListener("mouseleave", function () {
  if (isDragging) {
    isDragging = false;
    sliderContainer.style.cursor = "grab";
    sliderContainer.classList.remove("dragging");
    if (!anyVideoPlaying()) {
      resumeSlider();
    }
  }
});

// Initialize players, clone content, and start the animation when the page loads
window.addEventListener("load", function () {
  initPlayers();
  cloneSliderContent();
  sliderWidth = slider.scrollWidth / 2;
  requestAnimationFrame(animateSlider);
});
