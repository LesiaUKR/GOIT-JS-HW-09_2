import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds');

let timerId = null;
startBtn.disabled = true;

const fp = flatpickr(input);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      console.log(Notiflix.Notify.failure('Please choose a date in the future', { position: 'center-top', clickToClose: true }));
    } else {
      startBtn.disabled = false;
      console.log(selectedDates[0]);
    }
  },
};

flatpickr(input, options);

startBtn.addEventListener('click', onStart);

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
  
function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function onStart() {
  startBtn.disabled = true;
  input.disabled = true;

    timerId = setInterval(() => {
    let countDown = new Date(input.value) - new Date();
        if (countDown >= 0) {
            let time = convertMs(countDown)
            dataDays.textContent = addLeadingZero(time.days);
            dataHours.textContent = addLeadingZero(time.hours);
            dataMinutes.textContent = addLeadingZero(time.minutes);
            dataSeconds.textContent = addLeadingZero(time.seconds);
        } else {
      console.log(Notiflix.Notify.success('CountDown finished',{ position: 'center-top', clickToClose: true }));
      clearInterval(timerId);
     }
       
  }, 1000)
}
