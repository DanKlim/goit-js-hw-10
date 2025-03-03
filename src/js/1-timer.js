import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btn = document.querySelector('button[type="button"]');
const input = document.querySelector('input#datetime-picker');

let userSelectedDate;
btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate.getTime() < options.defaultDate.getTime()) {
      btn.disabled = true;
      iziToast.info({
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
      return;
    } else {
      btn.disabled = false;
      input.disabled = true;
    }
  },
};

flatpickr(input, options);

btn.addEventListener('click', startTimer);

function startTimer(evt) {
  evt.preventDefault();
  btn.disabled = true;
  input.disabled = true;

  const intervalId = setInterval(() => {
    const time = userSelectedDate - Date.now();
    if (time <= 0) {
      clearInterval(intervalId);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      iziToast.success({
        position: 'topRight',
        title: 'Done!',
        message: 'The countdown is finished.',
      });
      btn.disabled = true;
      input.disabled = false;
    } else {
      const timeData = convertMs(time);
      updateTimerDisplay(timeData);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}
