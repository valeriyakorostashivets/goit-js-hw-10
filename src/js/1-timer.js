import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
let userSelectedDate = null;
let timerId = null;

const startBtn = document.querySelector('[data-start]');
const inputEl = document.querySelector('#datetime-picker');

startBtn.disabled = true;
const options = {
    enableTime: true,           
    time_24hr: true,            
    defaultDate: new Date(),    
    minuteIncrement: 1,         
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const currentDate = new Date();
    
        if (selectedDate <= currentDate) {
            iziToast.warning({
                title: 'Invalid Date',
                message: 'Please choose a date in the future',
                position: 'topRight',
                timeout: 4000,
              });              
          startBtn.disabled = true;
        } else {
          userSelectedDate = selectedDate;
          startBtn.disabled = false;
        }
      },
    };
  
flatpickr("#datetime-picker", options);
  
  startBtn.addEventListener("click", () => {
    if (!userSelectedDate) return;
  
    startBtn.disabled = true;
    inputEl.disabled = true;
  
    timerId = setInterval(() => {
      const now = new Date();
      const diff = userSelectedDate - now;
  
      if (diff <= 0) {
        clearInterval(timerId);
        return;
      }
  
      const { days, hours, minutes, seconds } = convertMs(diff);
  
      document.querySelector('[data-days]').textContent = addLeadingZero(days);
      document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
      document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
      document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
    }, 1000);
  });
  
  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor((ms % hour) / minute);
    const seconds = Math.floor((ms % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
