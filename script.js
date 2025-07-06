// NOTE: these are set to default state

// NOTE: Varibles
let mouseX;
let mouseY;
let isButtonVisible = false;
// NOTE: This changes the submitted text to the mainText upon clicking submitTextButton
const submitButton = document.getElementById('submitTextButton');
const mainText = document.getElementById('mainText');
const textInput = document.getElementById('submittedText');
// NOTE: Scroll animation
  // observers and starts if any changes related to 'div' are detected
  // Set up observer
window.addEventListener('DOMContentLoaded', () => {
    if (window.electronAPI?.isLinux) {
    document.body.classList.add('isLinux');
  }
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.6,
  root: document.querySelector('#mainText'),
  rootMargin: '0px 0px -5% 0px'
});

submitButton.addEventListener('click', () => {
  const newText = textInput.value.trim();
  
  if (newText !== '') {
    textInput.value = '';
    const splitLines = newText
      .replace(/\.\s*/g, '.\n')
      .split('\n');
    splitLines.forEach(lines => {
    const div = document.createElement('div')
    div.className = 'line';
    div.textContent = lines.trim();
    mainText.appendChild(div);
//NOTE: Observes the new div for any changes
    observer.observe(div);
  });
  textInput.value = '';
  }
});
// NOTE: This toggles the dev mode and changes the background to a wallpaper
let devMode = false;
const background = document.getElementById('background');
if (devMode) {
  background.classList.add('show');
  console.log("devMode is now enabled");
} else {
  background.classList.remove('show');
}
// NOTE: This tracks the mouse position and shows the submission button
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    const isVisible = button.classList.contains('show');
    const isOpened = popupBox.classList.contains('show');
    if (mouseY < 100 && !isOpened && !isButtonVisible) {
    button.classList.remove('click', 'hide');
    resetAnimation(button, 'show');
    isButtonVisible = true;
    console.log("button is now visible");
}
    else if (mouseY >= 100 && !isOpened && isButtonVisible) {
    button.classList.remove('click', 'show');
    resetAnimation(button, 'hide');
    isButtonVisible = false;
    console.log("button is now hidden");
}
});
// NOTE: Functions to reset animation
function resetAnimation(el, className) {
 el.classList.remove(className);

  // Force reflow
  void el.offsetWidth;

  // Remove animation-related inline styles (optional but helpful)
  el.style.animation = 'none';
  el.offsetHeight; // Trigger reflow again
  el.style.animation = '';

  el.classList.add(className);
  console.log("resetAnimation triggered :O", className);
}
// NOTE: Shows and hides the text sumbission popup
const button = document.getElementById('openTextPopup');
const popupBox = document.getElementById('textPopupBox');
button.addEventListener('click', () => {
  button.classList.remove('clicked');
  void button.offsetWidth;
  button.classList.add('clicked');
  if (popupBox.classList.contains('show')) {
  popupBox.classList.remove('show');
  popupBox.classList.add('hide');
  } else {
  popupBox.classList.remove('hide');
  popupBox.classList.add('show');
  }
});
document.addEventListener('click', (event) => {
  if (popupBox.classList.contains('show')
  && !popupBox.contains(event.target)
  && event.target !== button) {
    popupBox.classList.remove('show');
    popupBox.classList.add('hide');
  }
});
//  NOTE: Window control buttons functionality
const { ipcRenderer } = require('electron');

  document.getElementById('close').addEventListener('click', () => {
    ipcRenderer.send('window-control', 'close');
  });

  document.getElementById('minimize').addEventListener('click', () => {
    ipcRenderer.send('window-control', 'minimize');
  });

  let maximized = false;
  const maximizeBtn = document.getElementById('maximize');
  maximizeBtn.addEventListener('click', () => {
    if (!maximized) {
      ipcRenderer.send('window-control', 'maximize');
      maximized = true;
    } else {
      ipcRenderer.send('window-control', 'restore');
      maximized = false;
    }
  });
