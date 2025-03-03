import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('.snackbar-input');
const form = document.querySelector('.form');
const radio = document.querySelectorAll('.radio');

form.addEventListener('submit', createPromise);

function createPromise(event) {
  event.preventDefault();
  const delay = input.value;
  const state = event.currentTarget.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'rejected') {
        reject(`❌ Rejected promise in ${delay}ms`);
        form.reset();
      } else {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
        form.reset();
      }
    }, delay);
  });

  return promise
    .then(data =>
      iziToast.success({
        icon: 'none',
        close: false,
        message: data,
      })
    )
    .catch(error =>
      iziToast.error({
        icon: 'none',
        close: false,
        message: error,
      })
    );
}
