document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();

    const form = event.currentTarget;
    const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value;

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });

    promise
      .then((delay) => {
        iziToast.success({
            title: 'Success',
            message: 'This is a successful notification',
            position: 'topRight',
          });
      })
      .catch((delay) => {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong',
            position: 'topRight',
          });
      });
  });

import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";
  