import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btn = document.querySelector('button[type="button"]');
const input = document.querySelector('input#datetime-picker');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log('t:', userSelectedDate);
    if (userSelectedDate <= new Date()) {
      btn.disabled = true;
      iziToast.error({
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
      return;
    } else {
      btn.disabled = false;
    }
  },
};

btn.addEventListener('click', () => {
  if (!userSelectedDate) return;

  btn.disabled = true;
  input.disabled = true;

  const timeId = setInterval(() => {
    const now = new Date();
    const diff = userSelectedDate - now;

    if (diff <= 0) {
      clearInterval(timeId);
      updateTimerDisplay(0);
      iziToast.success({
        position: 'topRight',
        title: 'Done!',
        message: 'The countdown is finished.',
      });
      return;
    }

    updateTimerDisplay(diff);
  }, 1000);
});

flatpickr(input, options);

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
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
