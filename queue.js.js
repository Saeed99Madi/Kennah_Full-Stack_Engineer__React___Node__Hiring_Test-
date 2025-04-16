// queue.js
const { EventEmitter } = require('events');

class AsyncQueue extends EventEmitter {
  constructor() {
    super();
    this.queue = [];
    this.interval = 250;
    this.timer = null;

    this.on('interval', (newInterval) => {
      this.interval = newInterval;
      if (this.timer) {
        this._restart();
      }
    });
  }

  enqueue(item) {
    if (
      typeof item === 'number' ||
      typeof item === 'string' ||
      (typeof item === 'object' && item !== null && !Array.isArray(item))
    ) {
      this.queue.push(item);
      this.emit('enqueued', item);
    }
  }

  peek() {
    return this.queue.length > 0 ? this.queue[0] : null;
  }

  print() {
    return [...this.queue];
  }

  getCurrentInterval() {
    return this.interval;
  }

  start() {
    if (this.timer) return;
    this.timer = setInterval(() => {
      if (this.queue.length > 0) {
        const item = this.queue.shift();
        this.emit('dequeued', item);
      }
    }, this.interval);
  }

  pause() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  _restart() {
    this.pause();
    this.start();
  }
}

// test

const queue = new AsyncQueue();

queue.enqueue(3);
console.log(queue.queue);
queue.enqueue(4);
console.log(queue.queue);

queue.enqueue(5); 
console.log(queue.queue);


queue.start();

queue.on('dequeued', function (item) {
  console.log('Dequeued: ', item);
  console.log('Next Item At Head:', queue.peek());
  console.log(queue.print());
});

setTimeout(() => {
  queue.emit('interval', 200); 
}, 1000);

setTimeout(() => {
  queue.pause();
}, 3000);