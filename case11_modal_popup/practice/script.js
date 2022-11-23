(function () {
  'use strict';
  const get = (target) => {
    return document.querySelector(target);
  };

  const $button = get('.modal_open_button');
  const $modal = get('.modal');
  const $body = get('body');
  const $modalCancle = get('.modal_button.cancel');
  const $modalConfirm = get('.modal_button.confirm');

  const toggleModal = () => {
    $modal.classList.toggle('show');
    $body.classList.toggle('scroll-lock');
  };

  $button.onclick = () => {
    toggleModal();
  };

  $modalCancle.onclick = () => {
    toggleModal();
  };

  $modalConfirm.onclick = () => {
    toggleModal();
  };

  window.onclick = (e) => {
    if (e.target === $modal) {
      toggleModal();
    }
  };
})();
