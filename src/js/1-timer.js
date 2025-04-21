import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { stackTraceLimit } from "postcss/lib/css-syntax-error";

let userSelectedDate = null;
const startBtn = document.querySelector('button');
startBtn.disabled = true;
const datePicker = document.querySelector('#datetime-picker');

flatpickr(datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
     if (selectedDates[0] > new Date()) {
      userSelectedDate = selectedDates[0]; 
      startBtn.disabled = false; 
    } else {
      iziToast.show({
        title: 'Error',
        message: "Please choose a date in the future",
        position: "topRight",
        backgroundColor: "#ef4040",
        messageColor: "#fff",
        timeout: 5000,
        progressBar: false,
        close: true,
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutUp',
      });
      startBtn.disabled = true;
    }
  }
});

startBtn.addEventListener("click", onStartClick);

function onStartClick() {
  startBtn.disabled = true; 
  datePicker.disabled = true;

  const timerId = setInterval(() => {
    const now = new Date();
    const timeLeft = userSelectedDate - now;

    if (timeLeft <= 0) {
      clearInterval(timerId); 
      updateTimerDisplay(0);  
      datePicker.disabled = false;
      startBtn.disabled = true;
      return;
    }

    updateTimerDisplay(timeLeft);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerDisplay(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}