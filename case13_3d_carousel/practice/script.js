(function () {
  'use strict';

  const get = (target) => {
    return document.querySelector(target);
  };

  const cellCount = 6;
  let selectIndex = 0;
  const nextButton = get('.next_button');
  const prevButton = get('.prev_button');
  const carousel = get('.carousel');

  const rotateCarousel = () => {
    const angle = (selectIndex / cellCount) * -360;
    carousel.style.transform = `translateZ(-346px) rotateY(${angle}deg)`;
  };

  nextButton.onclick = () => {
    selectIndex--;
    rotateCarousel();
  };
  prevButton.onclick = () => {
    selectIndex++;
    rotateCarousel();
  };
})();
