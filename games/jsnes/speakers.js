function RingBuffer(capacity, evictedCb) {
  this._elements = new Array(capacity || 50);
  this._first = 0;
  this._last = 0;
  this._size = 0;
  this._evictedCb = evictedCb;
}

RingBuffer.prototype.capacity = function() {
  return this._elements.length;
};

RingBuffer.prototype.isFull = function() {
  return this.size() === this.capacity();
};


RingBuffer.prototype.peek = function() {
  if (this.size() === 0) throw new Error('RingBuffer is empty');

  return this._elements[this._first];
};

RingBuffer.prototype.peekN = function(count) {
  if (count > this._size) throw new Error('Not enough elements in RingBuffer');

  var end = Math.min(this._first + count, this.capacity());
  var firstHalf = this._elements.slice(this._first, end);
  if (end < this.capacity()) {
    return firstHalf;
  }
  var secondHalf = this._elements.slice(0, count - firstHalf.length);
  return firstHalf.concat(secondHalf);
};

RingBuffer.prototype.deq = function() {
  var element = this.peek();

  this._size--;
  this._first = (this._first + 1) % this.capacity();

  return element;
};

RingBuffer.prototype.deqN = function(count) {
  var elements = this.peekN(count);

  this._size -= count;
  this._first = (this._first + count) % this.capacity();

  return elements;
};

RingBuffer.prototype.enq = function(element) {
  this._end = (this._first + this.size()) % this.capacity();
  var full = this.isFull()
  if (full && this._evictedCb) {
    this._evictedCb(this._elements[this._end]);
  }
  this._elements[this._end] = element;

  if (full) {
    this._first = (this._first + 1) % this.capacity();
  } else {
    this._size++;
  }

  return this.size();
};

RingBuffer.prototype.size = function() {
  return this._size;
};


class Speakers {
  constructor() {
    this.bufferSize = 8192;
    this.buffer = new RingBuffer(this.bufferSize * 2);
    this.start()
  }

  start() {
    // Audio is not supported
    if (!window.AudioContext) {
      return;
    }
    this.audioCtx = new window.AudioContext();
    this.scriptNode = this.audioCtx.createScriptProcessor(1024, 0, 2);
    this.scriptNode.onaudioprocess = this.onaudioprocess.bind(this);
    this.scriptNode.connect(this.audioCtx.destination);
  }

  stop() {
    if (this.scriptNode) {
      this.scriptNode.disconnect(this.audioCtx.destination);
      this.scriptNode.onaudioprocess = null;
      this.scriptNode = null;
    }
    if (this.audioCtx) {
      this.audioCtx.close().catch((e) => {});
      this.audioCtx = null;
    }
  }

  writeSample(left, right) {
    if (this.buffer.size() / 2 >= this.bufferSize) {
      // console.log(`Buffer overrun`);
    }
    this.buffer.enq(left);
    this.buffer.enq(right);
  };

  onaudioprocess(e) {
    var left = e.outputBuffer.getChannelData(0);
    var right = e.outputBuffer.getChannelData(1);
    var size = left.length;

    // We're going to buffer underrun. Attempt to fill the buffer.
    if (this.buffer.size() < size * 2 && this.onBufferUnderrun) {
      this.onBufferUnderrun(this.buffer.size(), size * 2);
    }

    if (size * 2 > this.buffer._size) {
      var bufferSize = this.buffer.size() / 2;
      if (bufferSize > 0) {
        // console.log(`Buffer underrun (needed ${size}, got ${bufferSize})`);
      }
      for (var j = 0; j < size; j++) {
        left[j] = 0;
        right[j] = 0;
      }
      return;
    }
    var samples = this.buffer.deqN(size * 2);
    for (var i = 0; i < size; i++) {
      left[i] = samples[i * 2];
      right[i] = samples[i * 2 + 1];
    }
  };
}