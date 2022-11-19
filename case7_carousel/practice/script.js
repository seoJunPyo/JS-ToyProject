(function () {
  'use strict';

  const get = (target) => {
    return document.querySelector(target);
  };

  class Carousel {
    constructor(carouselElemnet) {
      this.carouselElemnet = carouselElemnet;
      this.itemClassName = 'carousel_item';
      this.items = this.carouselElemnet.querySelectorAll('.carousel_item');

      this.totalItems = this.items.length;
      this.current = 0;
      this.isMoving = false;
    }

    initCarousel() {
      this.isMoving = false;
      this.items[this.totalItems - 1].classList.add('prev');
      this.items[0].classList.add('active');
      this.items[1].classList.add('next');
    }

    disableInteration() {
      this.isMoving = true;
      setTimeout(() => {
        this.isMoving = false;
      }, 500);
    }

    setEventListener() {
      this.prevButton = this.carouselElemnet.querySelector(
        '.carousel_button--prev'
      );
      this.nextButton = this.carouselElemnet.querySelector(
        '.carousel_button--next'
      );

      this.prevButton.addEventListener('click', () => {
        this.moveprev();
      });
      this.nextButton.addEventListener('click', () => {
        this.movenext();
      });
    }

    moveCarouselTo() {
      if (this.isMoving) return;
      this.disableInteration();
      let prev = this.current - 1;
      let next = this.current + 1;

      if (this.current === 0) {
        prev = this.totalItems - 1;
      } else if (this.current === this.totalItems - 1) {
        next = 0;
      }

      for (let i = 0; i < this.totalItems; i++) {
        if (i === this.current) {
          this.items[i].className = this.itemClassName + ' active';
        } else if (i === prev) {
          this.items[i].className = this.itemClassName + ' prev';
        } else if (i === next) {
          this.items[i].className = this.itemClassName + ' next';
        } else {
          this.items[i].className = this.itemClassName;
        }
      }
    }

    movenext() {
      if (this.isMoving) return;
      if (this.current === this.totalItems - 1) {
        this.current = 0;
      } else {
        this.current++;
      }
      this.moveCarouselTo();
    }

    moveprev() {
      if (this.isMoving) return;
      if (this.current === 0) {
        this.current = this.totalItems - 1;
      } else {
        this.current--;
      }
      this.moveCarouselTo();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const carouselElemnet = get('.carousel');
    const carousel = new Carousel(carouselElemnet);
    carousel.initCarousel();
    carousel.setEventListener();
  });
})();
