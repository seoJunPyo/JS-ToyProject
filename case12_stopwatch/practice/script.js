(function () {
  'use strict';

  const get = (target) => {
    return document.querySelector(target);
  };

  class $stopwatch {
    constructor(elemnet) {
      this.timer = elemnet;
      this.interval = null;
      this.defaultTime = '00:00.00';
      this.startTime = 0;
      this.elapsedTime = 0;
      this.timer.innerHTML = this.defaultTime;
    }

    addZero(number) {
      if (number < 10) {
        return `0${number}`;
      }
      if (number > 99) {
        return number.toString().slice(0, -1);
      }

      return number;
    }

    timeToStrimg(time) {
      const date = new Date(time);
      const minutes = date.getUTCMinutes();
      const second = date.getUTCSeconds();
      const millisecond = date.getUTCMilliseconds();

      return `${this.addZero(minutes)}:${this.addZero(second)}.${this.addZero(
        millisecond
      )}`;
    }

    print(text) {
      this.timer.innerHTML = text;
    }

    startTimer() {
      this.elapsedTime = Date.now() - this.startTime;
      const time = this.timeToStrimg(this.elapsedTime);
      this.print(time);
    }

    start() {
      clearInterval(this.interval);
      this.startTime = Date.now() - this.elapsedTime;
      this.interval = setInterval(this.startTimer.bind(this), 10);
    }

    stop() {
      clearInterval(this.interval);
      this.interval = null;
      this.startTime = 0;
      this.elapsedTime = 0;
    }
    reset() {
      clearInterval(this.interval);
      this.timer.innerHTML = this.defaultTime;
    }
  }

  const $startButton = get('.timer_button.start');
  const $stopButton = get('.timer_button.stop');
  const $resetButton = get('.timer_button.reset');

  const $timer = get('.timer');
  const stopWatch = new $stopwatch($timer);

  $startButton.onclick = () => {
    stopWatch.start();
  };

  $stopButton.onclick = () => {
    stopWatch.stop();
  };

  $resetButton.onclick = () => {
    stopWatch.reset();
  };
})();
